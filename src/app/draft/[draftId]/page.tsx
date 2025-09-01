'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PlayerTable } from '@/components/player-table';
import { DraftedPlayersTable } from '@/components/drafted-players-table';
import { DraftStats } from '@/components/draft-stats';
import { Player, DraftPick } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { usePollingFallback } from '@/hooks/usePollingFallback';
import { useDraftLayout } from '@/contexts/DraftLayoutContext';

export default function DraftViewerPage() {
  const { draftId } = useParams();
  const router = useRouter();
  const { selectedPosition, activeView, setDraft } = useDraftLayout();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [realtimeConnected, setRealtimeConnected] = useState(false);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get draft info
        const { data: draftData } = await supabase
          .from('drafts')
          .select('*')
          .eq('id', draftId)
          .single();
        
        setDraft(draftData);

        // Get players
        const { data: playersData } = await supabase
          .from('players')
          .select('*')
          .order('position')
          .order('default_rank');
        
        // Get draft picks
        const { data: draftPicksData } = await supabase
          .from('draft_picks')
          .select('*')
          .eq('draft_id', draftId);
        
        setPlayers(playersData || []);
        setDraftPicks(draftPicksData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup on route change (handles mobile back button)
    const handleRouteChange = () => {
      setRealtimeConnected(false);
    };

    router.events?.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [draftId, setDraft, router]);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'draft_picks',
    (payload) => {
      console.log('Draft picks update:', payload.eventType, payload);
      setRealtimeConnected(true);
      
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
    },
    { column: 'draft_id', value: draftId as string }
  );

  // Polling fallback when realtime isn't working
  usePollingFallback({
    table: 'draft_picks',
    interval: 5000,
    filter: { column: 'draft_id', value: draftId as string },
    onUpdate: (data) => {
      if (!realtimeConnected) {
        console.log('Using polling fallback, updating draft picks');
        setDraftPicks(data as unknown as DraftPick[]);
      }
    },
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