'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PlayerTable } from '@/components/player-table';
import { DraftedPlayersTable } from '@/components/drafted-players-table';
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
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('QB');
  const [activeView, setActiveView] = useState<'available' | 'drafted' | 'stats'>('available');
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle tab change without scroll jumping
  const handleViewChange = (view: 'available' | 'drafted' | 'stats') => {
    setActiveView(view);
  };
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold truncate">{draft?.name || 'Fantasy Draft'}</h1>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={async () => {
                try {
                  const text = `${window.location.origin}/draft/${draftId}`;
                  if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                    toast.success('Viewer link copied to clipboard');
                  } else {
                    // Fallback for HTTP/localhost
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    toast.success('Viewer link copied to clipboard');
                  }
                } catch (error) {
                  toast.error('Failed to copy link');
                }
              }}
            >
              Viewer Link
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={async () => {
                try {
                  const text = window.location.href;
                  if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                    toast.success('Admin link copied to clipboard');
                  } else {
                    // Fallback for HTTP/localhost
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    toast.success('Admin link copied to clipboard');
                  }
                } catch (error) {
                  toast.error('Failed to copy link');
                }
              }}
            >
              Admin Link
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
      
      {isClient ? (
        <>
          {/* Position Tabs - Sticky */}
          <div className="sticky top-14 z-50 bg-background border-b pb-2">
            <div className="w-full px-2 grid grid-cols-6 bg-muted rounded-lg p-1">
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedPosition === 'QB' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => setSelectedPosition('QB')}
              >
                QB
              </button>
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedPosition === 'RB' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => setSelectedPosition('RB')}
              >
                RB
              </button>
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedPosition === 'WR' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => setSelectedPosition('WR')}
              >
                WR
              </button>
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedPosition === 'TE' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => setSelectedPosition('TE')}
              >
                TE
              </button>
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedPosition === 'K' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => setSelectedPosition('K')}
              >
                K
              </button>
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedPosition === 'DEF' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => setSelectedPosition('DEF')}
              >
                DEF
              </button>
            </div>
          </div>

          {/* View Tabs - Sticky below position tabs */}
          <div className="sticky top-28 z-40 bg-background border-b pb-2">
            <div className="w-full grid grid-cols-3 bg-muted rounded-lg p-1">
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'available' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => handleViewChange('available')}
              >
                Available
              </button>
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'drafted' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => handleViewChange('drafted')}
              >
                Drafted
              </button>
              <button 
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'stats' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                onClick={() => handleViewChange('stats')}
              >
                Stats
              </button>
            </div>
          </div>

          {/* Fixed height scroll container */}
          <div className="h-[calc(100vh-200px)] overflow-auto mt-4">
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
          </div>
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