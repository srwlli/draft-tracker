'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PlayerTable } from '@/components/player-table';
import { DraftStats } from '@/components/draft-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Player, DraftPick, Draft, Position } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

export default function DraftViewerPage() {
  const { draftId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

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
  }, [draftId]);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'draft_picks',
    'INSERT',
    (payload) => {
      setDraftPicks((current) => [...current, payload.new]);
    },
    { column: 'draft_id', value: draftId as string }
  );

  useSupabaseRealtime(
    'draft_picks',
    'DELETE',
    (payload) => {
      setDraftPicks((current) => 
        current.filter((pick) => pick.id !== payload.old.id)
      );
    },
    { column: 'draft_id', value: draftId as string }
  );

  // Filter players by position
  const filteredPlayers = players.filter(player => 
    selectedPosition === 'ALL' || player.position === selectedPosition
  );

  // Mark drafted players
  const playersWithStatus = filteredPlayers.map(player => ({
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{draft?.name || 'Fantasy Draft'}</h1>
      <p className="text-muted-foreground mb-6">Viewer Mode</p>
      
      <DraftStats 
        totalPicks={draftPicks.length}
        positionCounts={positionCounts}
      />
      
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedPosition('ALL')}>All</TabsTrigger>
          <TabsTrigger value="QB" onClick={() => setSelectedPosition('QB')}>QB</TabsTrigger>
          <TabsTrigger value="RB" onClick={() => setSelectedPosition('RB')}>RB</TabsTrigger>
          <TabsTrigger value="WR" onClick={() => setSelectedPosition('WR')}>WR</TabsTrigger>
          <TabsTrigger value="TE" onClick={() => setSelectedPosition('TE')}>TE</TabsTrigger>
          <TabsTrigger value="K" onClick={() => setSelectedPosition('K')}>K</TabsTrigger>
          <TabsTrigger value="DEF" onClick={() => setSelectedPosition('DEF')}>DEF</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="QB" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="RB" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="WR" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="TE" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="K" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="DEF" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}