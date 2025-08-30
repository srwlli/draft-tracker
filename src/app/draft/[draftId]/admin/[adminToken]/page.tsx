'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PlayerTable } from '@/components/player-table';
import { DraftStats } from '@/components/draft-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Player, DraftPick, Draft, Position } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { usePollingFallback } from '@/hooks/usePollingFallback';

export default function DraftAdminPage() {
  const { draftId, adminToken } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('ALL');
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
        setIsValidAdmin(true);

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
  }, [draftId, adminToken, router]);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'draft_picks',
    (payload) => {
      console.log('Draft picks update (admin):', payload.eventType, payload);
      setRealtimeConnected(true);
      
      if (payload.eventType === 'INSERT') {
        setDraftPicks((current) => [...current, payload.new]);
      } else if (payload.eventType === 'DELETE') {
        setDraftPicks((current) => 
          current.filter((pick) => pick.id !== payload.old.id)
        );
      } else if (payload.eventType === 'UPDATE') {
        setDraftPicks((current) => 
          current.map((pick) => 
            pick.id === payload.new.id ? payload.new : pick
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
        setDraftPicks(data);
      }
    },
    enabled: !realtimeConnected
  });

  // Handle drafting a player
  const handleDraftPlayer = async (playerId: number) => {
    try {
      const pickNumber = draftPicks.length + 1;
      
      const { data, error } = await supabase
        .from('draft_picks')
        .insert([{
          draft_id: draftId,
          player_id: playerId,
          pick_number: pickNumber
        }])
        .select();
      
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
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{draft?.name || 'Fantasy Draft'}</h1>
          <p className="text-muted-foreground">Admin Mode</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/draft/${draftId}`);
            toast.success('Viewer link copied to clipboard');
          }}>
            Copy Viewer Link
          </Button>
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Admin link copied to clipboard');
          }}>
            Copy Admin Link
          </Button>
        </div>
      </div>
      
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
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
        
        <TabsContent value="QB" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
        
        <TabsContent value="RB" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
        
        <TabsContent value="WR" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
        
        <TabsContent value="TE" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
        
        <TabsContent value="K" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
        
        <TabsContent value="DEF" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}