'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PlayerTable } from '@/components/player-table';
import { DraftedPlayersTable } from '@/components/drafted-players-table';
import { DraftStats } from '@/components/draft-stats';
import { toast } from 'sonner';
import { Player, DraftPick, Draft } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { usePollingFallback } from '@/hooks/usePollingFallback';
import { useDraftLayout } from '@/contexts/DraftLayoutContext';

export default function DraftAdminPage() {
  const { draftId, adminToken } = useParams();
  const { selectedPosition, activeView, setDraft: setLayoutDraft, setIsAdmin } = useDraftLayout();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidAdmin, setIsValidAdmin] = useState(false);
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const router = useRouter();

  // Load initial data and validate admin token
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get draft info and validate admin token
        const { data: draftData } = await supabase
          .from('drafts')
          .select('*')
          .eq('id', draftId)
          .single();
        
        if (draftData?.admin_token !== adminToken) {
          router.push(`/draft/${draftId}`);
          return;
        }
        
        setDraft(draftData);
        setLayoutDraft(draftData);
        setIsValidAdmin(true);
        setIsAdmin(true);

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
  }, [draftId, adminToken, router, setDraft, setIsAdmin]);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'draft_picks',
    (payload) => {
      console.log('Draft picks update (admin):', payload.eventType, payload);
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
        console.log('Using polling fallback (admin), updating draft picks');
        setDraftPicks(data as unknown as DraftPick[]);
      }
    },
    enabled: !realtimeConnected
  });

  // Handle drafting a player
  const handleDraftPlayer = async (playerId: number) => {
    try {
      const pickNumber = draftPicks.length + 1;
      
      const { error } = await supabase
        .from('draft_picks')
        .insert([{
          draft_id: draftId,
          player_id: playerId,
          pick_number: pickNumber
        }]);
      
      if (error) throw error;
      
      toast.success('Player drafted successfully');
    } catch (error) {
      console.error('Error drafting player:', error);
      toast.error('Failed to draft player');
    }
  };

  // Handle undrafting a player
  const handleUndraftPlayer = async (playerId: number) => {
    try {
      const { error } = await supabase
        .from('draft_picks')
        .delete()
        .eq('draft_id', draftId)
        .eq('player_id', playerId);
      
      if (error) throw error;
      
      toast.success('Draft pick removed');
    } catch (error) {
      console.error('Error undrafting player:', error);
      toast.error('Failed to remove draft pick');
    }
  };

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

  if (!isValidAdmin) {
    return <div className="flex h-screen items-center justify-center">Unauthorized</div>;
  }

  return (
    <>
      {activeView === 'available' && (
        <PlayerTable 
          players={playersWithStatus}
          isAdmin={true}
          onDraft={handleDraftPlayer}
          onUndraft={handleUndraftPlayer}
        />
      )}
      
      {activeView === 'drafted' && (
        <DraftedPlayersTable
          players={allPlayersWithStatus}
          isAdmin={true}
          onUndraft={handleUndraftPlayer}
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