'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PlayerTable } from '@/components/player-table';
import { DraftedPlayersTable } from '@/components/drafted-players-table';
import { DraftStats } from '@/components/draft-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Player, DraftPick, Draft, Position } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { usePollingFallback } from '@/hooks/usePollingFallback';

export default function DraftViewerPage() {
  const { draftId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('QB');
  const [activeView, setActiveView] = useState<'available' | 'drafted'>('available');
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);
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
  }, [draftId]);

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <h1 className="text-lg font-semibold">BBFL Draft Tracker</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{draft?.name || 'Fantasy Draft'}</h2>
          <p className="text-muted-foreground">Viewer Mode</p>
        </div>
      
      {isClient ? (
        <>
          <DraftStats 
            totalPicks={draftPicks.length}
            positionCounts={positionCounts}
          />
          
          <Tabs defaultValue="QB" className="mt-6">
            <TabsList className="w-full px-2 grid grid-cols-6">
              <TabsTrigger value="QB" onClick={() => setSelectedPosition('QB')}>QB</TabsTrigger>
              <TabsTrigger value="RB" onClick={() => setSelectedPosition('RB')}>RB</TabsTrigger>
              <TabsTrigger value="WR" onClick={() => setSelectedPosition('WR')}>WR</TabsTrigger>
              <TabsTrigger value="TE" onClick={() => setSelectedPosition('TE')}>TE</TabsTrigger>
              <TabsTrigger value="K" onClick={() => setSelectedPosition('K')}>K</TabsTrigger>
              <TabsTrigger value="DEF" onClick={() => setSelectedPosition('DEF')}>DEF</TabsTrigger>
            </TabsList>
            
            <div className="sticky top-14 z-40 bg-background border-b pb-2 mt-4">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger 
                  value="available" 
                  onClick={() => setActiveView('available')}
                >
                  Available
                </TabsTrigger>
                <TabsTrigger 
                  value="drafted" 
                  onClick={() => setActiveView('drafted')}
                >
                  Drafted
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mt-4">
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
            </div>
            
            <TabsContent value="QB" className="hidden" />
            <TabsContent value="RB" className="hidden" />
            <TabsContent value="WR" className="hidden" />
            <TabsContent value="TE" className="hidden" />
            <TabsContent value="K" className="hidden" />
            <TabsContent value="DEF" className="hidden" />
          </Tabs>
        </>
      ) : (
        <div className="text-center py-8">Loading...</div>
      )}
      </main>

      {/* Footer */}
      <footer className="border-t py-3 text-center text-sm text-muted-foreground">
        BBFL Draft Tracker 2025
      </footer>
    </div>
  );
}