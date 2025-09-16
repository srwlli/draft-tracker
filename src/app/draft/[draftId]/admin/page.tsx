'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';
import { PlayerTable } from '@/components/player-table';
import { DraftedPlayersTable } from '@/components/drafted-players-table';
import { DraftStats } from '@/components/draft-stats';
import { ActionCard } from '@/components/action-card';
import { Link, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Player, PlayerWithStatus, DraftPick, Draft } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { usePollingFallback } from '@/hooks/usePollingFallback';
import { useDraftLayout } from '@/contexts/DraftLayoutContext';
import { copyToClipboard } from '@/lib/clipboard';
// Admin validation now uses HttpOnly cookie; no client token access

export default function DraftAdminPage() {
  const { draftId } = useParams();
  const { selectedPosition, activeView, setDraft: setLayoutDraft, setIsAdmin, setActiveView } = useDraftLayout();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidAdmin, setIsValidAdmin] = useState(true); // assume valid; API will enforce
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [draftingPlayers, setDraftingPlayers] = useState(new Set<number>());
  const [confirmPlayer, setConfirmPlayer] = useState<PlayerWithStatus | null>(null);
  const router = useRouter();

  // Link sharing handlers
  const handleCopyViewerLink = async () => {
    const viewerUrl = `${window.location.origin}/draft/${draftId}`;
    const success = await copyToClipboard(viewerUrl);
    toast[success ? 'success' : 'error'](success ? 'Viewer link copied to clipboard' : 'Failed to copy link');
  };

  const handleCopyAdminLink = async () => {
    const adminUrl = `${window.location.origin}/draft/${draftId}/admin`;
    const success = await copyToClipboard(adminUrl);
    toast[success ? 'success' : 'error'](success ? 'Admin link copied to clipboard' : 'Failed to copy link');
  };

  // Track recently created picks to prevent duplicates from real-time
  const recentlyCreatedPicks = useRef(new Set<string>());

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { draft, players: playersData, picks: draftPicksData } = await api.public.getDraftData(draftId as string);
        setDraft(draft as Draft);
        setLayoutDraft(draft as Draft);
        setIsAdmin(true); // show admin UI; API endpoints enforce access
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
  }, [draftId, router, setLayoutDraft, setIsAdmin]);

  const handleRealtimeUpdate = useCallback((payload: {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new?: Record<string, unknown>;
    old?: Record<string, unknown>;
  }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Draft picks update (admin):', payload.eventType, payload);
    }
    if (payload.eventType === 'INSERT' && payload.new) {
      const newPick = payload.new as unknown as DraftPick;
      if (recentlyCreatedPicks.current.has(newPick.id)) return;
      setDraftPicks((current) => [...current, newPick]);
    } else if (payload.eventType === 'DELETE' && payload.old) {
      const deletedPick = payload.old as unknown as DraftPick;
      recentlyCreatedPicks.current.delete(deletedPick.id);
      setDraftPicks((current) => current.filter((p) => p.id !== deletedPick.id));
    } else if (payload.eventType === 'UPDATE' && payload.new) {
      const updatedPick = payload.new as unknown as DraftPick;
      setDraftPicks((current) => current.map((p) => (p.id === updatedPick.id ? updatedPick : p)));
    }
  }, []);

  const handleConnectionChange = useCallback((connected: boolean) => {
    if (process.env.NODE_ENV === 'development') console.log('Real-time connection state changed:', connected);
    setRealtimeConnected(connected);
  }, []);

  useSupabaseRealtime('draft_picks', handleRealtimeUpdate, { column: 'draft_id', value: draftId as string }, handleConnectionChange);

  const handlePollingUpdate = useCallback((data: Record<string, unknown>[]) => {
    if (process.env.NODE_ENV === 'development') console.log('Using polling fallback (admin), updating draft picks');
    setDraftPicks(data as unknown as DraftPick[]);
  }, []);

  usePollingFallback({ table: 'draft_picks', interval: 5000, filter: { column: 'draft_id', value: draftId as string }, onUpdate: handlePollingUpdate, enabled: !realtimeConnected });

  const handleDraftPlayer = async (playerId: number) => {
    if (draftingPlayers.has(playerId)) return;
    setDraftingPlayers((current) => new Set([...current, playerId]));
    try {
      const newPick = await api.admin.draftPlayer(draftId as string, playerId);
      recentlyCreatedPicks.current.add(newPick.id);
      setTimeout(() => {
        recentlyCreatedPicks.current.delete(newPick.id);
      }, 5000);
      setDraftPicks((current) => [...current, newPick]);
      setConfirmPlayer(null);
      toast.success('Player drafted successfully');
    } catch (error) {
      console.error('Error drafting player:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to draft player');
    } finally {
      setDraftingPlayers((current) => {
        const next = new Set(current);
        next.delete(playerId);
        return next;
      });
    }
  };

  const handleUndraftPlayer = async (playerId: number) => {
    try {
      const pick = draftPicks.find((p) => p.player_id === playerId);
      if (!pick) return toast.error('Draft pick not found');
      await api.admin.undraftPlayer(draftId as string, pick.id);
      setDraftPicks((current) => current.filter((p) => p.id !== pick.id));
      recentlyCreatedPicks.current.delete(pick.id);
      toast.success('Draft pick removed');
    } catch (error) {
      console.error('Error undrafting player:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to remove draft pick');
    }
  };

  const filteredPlayers = players.filter((p) => selectedPosition === 'ALL' || p.position === selectedPosition);
  const playersWithStatus = filteredPlayers.map((p) => ({ ...p, is_drafted: draftPicks.some((dp) => dp.player_id === p.id) }));
  const allPlayersWithStatus = players.map((p) => ({ ...p, is_drafted: draftPicks.some((dp) => dp.player_id === p.id) }));

  const positionCounts = {
    QB: draftPicks.filter((pick) => players.find((p) => p.id === pick.player_id)?.position === 'QB').length,
    RB: draftPicks.filter((pick) => players.find((p) => p.id === pick.player_id)?.position === 'RB').length,
    WR: draftPicks.filter((pick) => players.find((p) => p.id === pick.player_id)?.position === 'WR').length,
    TE: draftPicks.filter((pick) => players.find((p) => p.id === pick.player_id)?.position === 'TE').length,
    K: draftPicks.filter((pick) => players.find((p) => p.id === pick.player_id)?.position === 'K').length,
    DEF: draftPicks.filter((pick) => players.find((p) => p.id === pick.player_id)?.position === 'DEF').length,
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex space-x-2 p-4 border-b">
          {['ALL', 'QB', 'RB', 'WR', 'TE', 'K', 'DEF'].map((pos) => (
            <Skeleton key={pos} className="h-8 w-12" />
          ))}
        </div>
        <div className="flex space-x-2 px-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="px-4 pb-4">
          <PlayerTable players={[]} isAdmin onDraft={() => {}} onUndraft={() => {}} isLoading />
        </div>
      </div>
    );
  }

  if (!isValidAdmin) {
    return <div className="flex h-screen items-center justify-center">Unauthorized</div>;
  }

  return (
    <>
      {activeView === 'available' && (
        <PlayerTable players={playersWithStatus} isAdmin onDraft={handleDraftPlayer} onUndraft={handleUndraftPlayer} draftingPlayers={draftingPlayers} confirmPlayer={confirmPlayer} setConfirmPlayer={setConfirmPlayer} />
      )}
      {activeView === 'drafted' && (
        <DraftedPlayersTable players={allPlayersWithStatus} isAdmin onUndraft={handleUndraftPlayer} selectedPosition={selectedPosition} />
      )}
      {activeView === 'stats' && <DraftStats totalPicks={draftPicks.length} positionCounts={positionCounts} />}
      {activeView === 'admin' && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard size="sm" icon={<Link className="h-4 w-4" />} title="Copy Viewer Link" description="Share read-only access" buttonText="Copy Link" onButtonClick={handleCopyViewerLink} />
            <ActionCard size="sm" icon={<Shield className="h-4 w-4" />} title="Copy Admin Link" description="Share admin access" buttonText="Copy Link" onButtonClick={handleCopyAdminLink} />
            <ActionCard
              size="sm"
              icon={<Shield className="h-4 w-4" />}
              title="Open Draft Board"
              description="Go to drafting view"
              buttonText="Go to Draft"
              onButtonClick={() => {
                setIsAdmin(true);
                setActiveView('available');
                try { window.scrollTo?.(0, 0); } catch {}
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
