'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { PlayerTable } from '@/components/player-table';
import { DraftedPlayersTable } from '@/components/drafted-players-table';
import { DraftStats } from '@/components/draft-stats';
import { ActionCard } from '@/components/action-card';
import { Link, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Player, DraftPick, Draft } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { usePollingFallback } from '@/hooks/usePollingFallback';
import { useDraftLayout } from '@/contexts/DraftLayoutContext';
import { copyToClipboard } from '@/lib/clipboard';

export default function DraftAdminPage() {
  const { draftId, adminToken } = useParams();
  const { selectedPosition, activeView, setDraft: setLayoutDraft, setIsAdmin } = useDraftLayout();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidAdmin, setIsValidAdmin] = useState(false);
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [draftingPlayers, setDraftingPlayers] = useState(new Set<number>());
  const [confirmPlayer, setConfirmPlayer] = useState<Player | null>(null);
  const router = useRouter();

  // Link sharing handlers
  const handleCopyViewerLink = async () => {
    const viewerUrl = `${window.location.origin}/draft/${draftId}`;
    const success = await copyToClipboard(viewerUrl);
    if (success) {
      toast.success('Viewer link copied to clipboard');
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleCopyAdminLink = async () => {
    const adminUrl = window.location.href;
    const success = await copyToClipboard(adminUrl);
    if (success) {
      toast.success('Admin link copied to clipboard');
    } else {
      toast.error('Failed to copy link');
    }
  };

  // Track recently created picks to prevent duplicates from real-time
  const recentlyCreatedPicks = useRef(new Set<string>());

  // Load initial data and validate admin token
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { draft, players: playersData, picks: draftPicksData } = await api.public.getDraftData(draftId as string);
        
        // Admin token validation is now handled by middleware
        // If we reach here, admin access is already validated
        setDraft({ ...draft, admin_token: adminToken as string } as Draft);
        setLayoutDraft({ ...draft, admin_token: adminToken as string } as Draft);
        setIsValidAdmin(true);
        setIsAdmin(true);
        setPlayers(playersData);
        setDraftPicks(draftPicksData);
      } catch (error) {
        console.error('Error fetching draft data:', error instanceof Error ? error.message : error);
        router.push(`/draft/${draftId}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [draftId, adminToken, router, setLayoutDraft, setIsAdmin]);

  // Memoize the real-time callback to prevent subscription cycling
  const handleRealtimeUpdate = useCallback((payload: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Draft picks update (admin):', payload.eventType, payload);
    }
    
    if (payload.eventType === 'INSERT' && payload.new) {
      const newPick = payload.new as unknown as DraftPick;
      
      // Skip if this is a pick we just created (prevent duplicates)
      if (recentlyCreatedPicks.current.has(newPick.id)) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Ignoring real-time update for recently created pick:', newPick.id);
        }
        return;
      }
      
      setDraftPicks((current) => [...current, newPick]);
    } else if (payload.eventType === 'DELETE' && payload.old) {
      const deletedPick = payload.old as unknown as DraftPick;
      
      // Always remove from recently created tracking when deleted
      recentlyCreatedPicks.current.delete(deletedPick.id);
      
      // Only update state if we don't already have this deletion locally
      setDraftPicks((current) => {
        const exists = current.some(pick => pick.id === deletedPick.id);
        if (exists) {
          return current.filter((pick) => pick.id !== deletedPick.id);
        }
        return current;
      });
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
      console.log('Using polling fallback (admin), updating draft picks');
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

  // Handle drafting a player
  const handleDraftPlayer = async (playerId: number) => {
    // Prevent double-clicks by checking if already drafting this player
    if (draftingPlayers.has(playerId)) {
      return;
    }
    
    // Mark player as being drafted
    setDraftingPlayers(current => new Set([...current, playerId]));
    
    try {
      const newPick = await api.admin.draftPlayer(draftId as string, playerId, adminToken as string);
      
      // Track this pick to prevent duplicate from real-time
      recentlyCreatedPicks.current.add(newPick.id);
      
      // Clean up tracking after 5 seconds (sufficient time for real-time propagation)
      setTimeout(() => {
        recentlyCreatedPicks.current.delete(newPick.id);
      }, 5000);
      
      // Immediately update local state for instant admin feedback
      setDraftPicks(current => [...current, newPick]);
      setConfirmPlayer(null); // Close dialog on success
      toast.success('Player drafted successfully');
    } catch (error) {
      console.error('Error drafting player:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to draft player');
    } finally {
      // Clear loading state
      setDraftingPlayers(current => {
        const newSet = new Set(current);
        newSet.delete(playerId);
        return newSet;
      });
    }
  };

  // Handle undrafting a player
  const handleUndraftPlayer = async (playerId: number) => {
    try {
      // Find the pick ID for this player
      const pick = draftPicks.find(pick => pick.player_id === playerId);
      if (!pick) {
        toast.error('Draft pick not found');
        return;
      }
      
      await api.admin.undraftPlayer(draftId as string, pick.id, adminToken as string);
      
      // Immediately update local state for instant feedback
      setDraftPicks(current => current.filter(p => p.id !== pick.id));
      
      // Clear from recently created tracking to allow re-drafting
      recentlyCreatedPicks.current.delete(pick.id);
      
      toast.success('Draft pick removed');
    } catch (error) {
      console.error('Error undrafting player:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to remove draft pick');
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
          draftingPlayers={draftingPlayers}
          confirmPlayer={confirmPlayer}
          setConfirmPlayer={setConfirmPlayer}
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
      
      {activeView === 'share' && (
        <div className="p-4 space-y-4">
          <ActionCard
            icon={<Link className="h-5 w-5" />}
            title="Copy Viewer Link"
            description="Share read-only access to this draft"
            buttonText="Copy Link"
            onButtonClick={handleCopyViewerLink}
          />

          <ActionCard
            icon={<Shield className="h-5 w-5" />}
            title="Copy Admin Link"
            description="Share admin access to this draft"
            buttonText="Copy Link"
            onButtonClick={handleCopyAdminLink}
          />
        </div>
      )}
    </>
  );
}