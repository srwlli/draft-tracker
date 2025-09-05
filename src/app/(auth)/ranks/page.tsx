'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { AuthPageLayout } from '@/components/auth-page-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Wifi, WifiOff } from 'lucide-react';
import { PlayerWithStatus, Position, UserRanking } from '@/types';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { api } from '@/lib/api-client';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

interface SortableRowProps {
  player: PlayerWithStatus;
  rank: number;
}

function SortableRow({ player, rank }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow 
      ref={setNodeRef} 
      style={{
        ...style,
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      className={`${isDragging ? 'bg-muted/50' : 'hover:bg-muted/30'}`}
      {...attributes}
      {...listeners}
    >
      <TableCell className="font-medium">{rank}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <span className="select-none">{player.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="select-none">{player.teams?.abbreviation || 'N/A'}</span>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{player.position}</Badge>
      </TableCell>
    </TableRow>
  );
}

export default function MyRanksPage() {
  const [selectedPosition, setSelectedPosition] = useState<Position>('QB');
  const [players, setPlayers] = useState<PlayerWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [optimisticRankings, setOptimisticRankings] = useState<Map<number, number>>(new Map());

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getCurrentUser();
  }, []);

  // Use direct real-time pattern like live draft
  const [userRankings, setUserRankings] = useState<UserRanking[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch rankings when position or user changes
  useEffect(() => {
    const fetchRankings = async () => {
      if (!user?.id) return;
      try {
        const data = await api.rankings.get(selectedPosition);
        setUserRankings(data || []);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };
    
    fetchRankings();
  }, [user?.id, selectedPosition]);

  // Real-time subscription using same pattern as live draft
  const handleRealtimeUpdate = useCallback((payload: {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new?: Record<string, unknown>;
    old?: Record<string, unknown>;
  }) => {
    console.log('📡 Rankings real-time update:', payload.eventType, payload);
    
    if (payload.eventType === 'INSERT' && payload.new) {
      setUserRankings((current) => [...current, payload.new as unknown as UserRanking]);
    } else if (payload.eventType === 'DELETE' && payload.old) {
      setUserRankings((current) => 
        current.filter((ranking) => ranking.id !== (payload.old as unknown as UserRanking).id)
      );
    } else if (payload.eventType === 'UPDATE' && payload.new) {
      setUserRankings((current) => 
        current.map((ranking) => 
          ranking.id === (payload.new as unknown as UserRanking).id ? payload.new as unknown as UserRanking : ranking
        )
      );
    }
  }, []);

  const handleConnectionChange = useCallback((connected: boolean) => {
    console.log('🔌 Real-time connection:', connected);
    setIsConnected(connected);
  }, []);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'user_rankings',
    handleRealtimeUpdate,
    user?.id ? { column: 'user_id', value: user.id } : undefined,
    handleConnectionChange
  );

  const fetchPlayers = async () => {
    try {
      console.log('Fetching players...');
      
      // Fetch players with their default ranks
      const playersResponse = await supabase
        .from('players')
        .select(`
          *,
          teams!players_team_id_fkey (
            id,
            team_name,
            city,
            abbreviation
          )
        `)
        .order('position')
        .order('default_rank');

      console.log('Players response:', playersResponse);

      if (playersResponse.error) {
        console.error('Players fetch error:', playersResponse.error);
        throw playersResponse.error;
      }

      const playersWithStatus = playersResponse.data?.map(player => ({
        ...player,
        is_drafted: false,
      })) || [];

      setPlayers(playersWithStatus);
      console.log('Players loaded:', playersWithStatus.length);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  // Industry standard: userRankings now includes defaults, minimal logic needed
  const displayPlayers = useMemo(() => {
    return players.map(player => {
      const optimisticRank = optimisticRankings.get(player.id);
      const userRanking = userRankings.find(r => r.player_id === player.id);
      
      return {
        ...player,
        custom_rank: optimisticRank ?? userRanking?.custom_rank ?? player.default_rank,
      };
    });
  }, [players, userRankings, optimisticRankings]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Industry standard: Clear optimistic when real-time data confirms changes
  useEffect(() => {
    if (optimisticRankings.size === 0) return;
    
    // Check if real-time data matches our optimistic updates
    const hasMatchingData = Array.from(optimisticRankings.entries()).every(([playerId, optimisticRank]) => {
      const realTimeRanking = userRankings.find(r => 
        r.player_id === playerId && r.position === selectedPosition
      );
      return realTimeRanking && realTimeRanking.custom_rank === optimisticRank;
    });
    
    if (hasMatchingData) {
      console.log('✅ Real-time data confirmed optimistic updates, clearing optimistic state');
      setOptimisticRankings(new Map());
    }
  }, [userRankings, optimisticRankings, selectedPosition]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100, // 100ms hold before drag starts
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredPlayers = displayPlayers
    .filter(player => player.position === selectedPosition)
    .sort((a, b) => {
      const rankA = a.custom_rank || a.default_rank;
      const rankB = b.custom_rank || b.default_rank;
      return rankA - rankB;
    });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = filteredPlayers.findIndex(player => player.id === active.id);
    const newIndex = filteredPlayers.findIndex(player => player.id === over.id);

    const reorderedPlayers = arrayMove(filteredPlayers, oldIndex, newIndex);
    
    // Industry standard: Set optimistic rankings immediately
    const newOptimisticRankings = new Map(
      reorderedPlayers.map((player, index) => [player.id, index + 1])
    );
    setOptimisticRankings(newOptimisticRankings);

    // Save rankings to database
    try {
      setSaving(true);
      const rankingsToSave = reorderedPlayers.map((player, index) => ({
        player_id: player.id,
        custom_rank: index + 1,
        position: selectedPosition,
      }));

      await api.rankings.saveMultiple(rankingsToSave);
      // Don't clear optimistic here - let real-time sync handle it
    } catch (error) {
      console.error('Error saving rankings:', error);
      // Industry standard: Revert optimistic update on error
      setOptimisticRankings(new Map());
      // Refetch to get server state
      try {
        const data = await api.rankings.get(selectedPosition);
        setUserRankings(data || []);
      } catch (refetchError) {
        console.error('Error refetching rankings:', refetchError);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || (players.length > 0 && userRankings.length === 0)) {
    return (
      <AuthPageLayout title="My Ranks">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-muted-foreground">Loading rankings...</div>
        </div>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout title="My Ranks">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {(['QB', 'RB', 'WR', 'TE'] as Position[]).map((position) => (
              <Button
                key={position}
                variant={selectedPosition === position ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPosition(position)}
              >
                {position}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {saving && (
              <div className="text-sm text-muted-foreground">
                Saving...
              </div>
            )}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4" />
                  <span>Live</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4" />
                  <span>Offline</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext
                  items={filteredPlayers.map(p => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredPlayers.map((player, index) => (
                    <SortableRow 
                      key={player.id} 
                      player={player} 
                      rank={index + 1}
                    />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        </div>
      </div>
    </AuthPageLayout>
  );
}