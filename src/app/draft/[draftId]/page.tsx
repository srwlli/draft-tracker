'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api-client';
import { PlayerTable } from '@/components/player-table';
import { DraftedPlayersTable } from '@/components/drafted-players-table';
import { DraftStats } from '@/components/draft-stats';
import { Player, DraftPick } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { usePollingFallback } from '@/hooks/usePollingFallback';
import { useDraftLayout } from '@/contexts/DraftLayoutContext';

export default function DraftViewerPage() {
  const { draftId } = useParams();
  const { selectedPosition, activeView, setDraft } = useDraftLayout();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realtimeConnected, setRealtimeConnected] = useState(false);

  // Validate draftId exists
  if (!draftId || draftId === 'undefined') {
    return <div className="flex h-screen items-center justify-center">Invalid draft ID</div>;
  }

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { draft, players: playersData, picks: draftPicksData } = await api.public.getDraftData(draftId as string);
        
        setDraft(draft);
        setPlayers(playersData);
        setDraftPicks(draftPicksData);
      } catch (error) {
        console.error('Error fetching draft data:', error);
        setError('Failed to load draft data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [draftId, setDraft]);

  // Memoize the real-time callback to prevent subscription cycling
  const handleRealtimeUpdate = useCallback((payload: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Draft picks update:', payload.eventType, payload);
    }
    
    if (payload.eventType === 'INSERT' && payload.new) {
      setDraftPicks((current) => [...current, payload.new as unknown as DraftPick]);
    } else if (payload.eventType === 'DELETE' && payload.old) {
      setDraftPicks((current) => 
        current.filter((pick) => pick.id !== (payload.old as unknown as DraftPick).id)
      );
    } else if (payload.eventType === 'UPDATE' && payload.new) {
      setDraftPicks((current) => 
        current.map((pick) => 
          pick.id === (payload.new as unknown as DraftPick).id ? payload.new as unknown as DraftPick : pick
        )
      );
    }
  }, []); // Empty dependency array since we only use state setters

  // Handle connection state changes
  const handleConnectionChange = useCallback((connected: boolean) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Real-time connection state changed:', connected);
    }
    setRealtimeConnected(connected);
  }, []);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'draft_picks',
    handleRealtimeUpdate,
    { column: 'draft_id', value: draftId as string },
    handleConnectionChange
  );

  // Memoize polling fallback callback to prevent cycling
  const handlePollingUpdate = useCallback((data: Record<string, unknown>[]) => {
    // Removed realtimeConnected check - the 'enabled' prop handles this
    if (process.env.NODE_ENV === 'development') {
      console.log('Using polling fallback, updating draft picks');
    }
    setDraftPicks(data as unknown as DraftPick[]);
  }, []); // Empty deps - stable callback, no restarts on state change

  // Polling fallback when realtime isn't working
  usePollingFallback({
    table: 'draft_picks',
    interval: 5000,
    filter: { column: 'draft_id', value: draftId as string },
    onUpdate: handlePollingUpdate,
    enabled: !realtimeConnected
  });

  // Filter players by position
  const filteredPlayers = players.filter(player => 
    selectedPosition === 'ALL' || player.position === selectedPosition
  );

  // Mark drafted players
  const playersWithStatus = filteredPlayers.map(player => ({
    ...player,
    is_drafted: draftPicks.some(pick => pick.player_id === player.id)
  }));

  // Get all players with draft status for drafted players table
  const allPlayersWithStatus = players.map(player => ({
    ...player,
    is_drafted: draftPicks.some(pick => pick.player_id === player.id)
  }));

  // Get position counts
  const positionCounts = {
    QB: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'QB'
    ).length,
    RB: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'RB'
    ).length,
    WR: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'WR'
    ).length,
    TE: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'TE'
    ).length,
    K: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'K'
    ).length,
    DEF: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'DEF'
    ).length,
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <>
      {activeView === 'available' && (
        <PlayerTable 
          players={playersWithStatus}
          isAdmin={false}
          onDraft={() => {}}
          onUndraft={() => {}}
        />
      )}
      
      {activeView === 'drafted' && (
        <DraftedPlayersTable
          players={allPlayersWithStatus}
          isAdmin={false}
          onUndraft={() => {}}
          selectedPosition={selectedPosition}
        />
      )}
      
      {activeView === 'stats' && (
        <DraftStats 
          totalPicks={draftPicks.length}
          positionCounts={positionCounts}
        />
      )}
    </>
  );
}