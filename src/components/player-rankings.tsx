'use client';

import { useEffect, useMemo, useCallback, useReducer } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Circle } from 'lucide-react';
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

// State management interfaces and reducer
interface PlayerRankingsState {
  selectedPosition: Position;
  players: PlayerWithStatus[];
  loading: boolean;
  saving: boolean;
  user: User | null;
  optimisticRankings: Map<number, number>;
  userRankings: UserRanking[];
  isConnected: boolean;
}

type PlayerRankingsAction =
  | { type: 'SET_POSITION'; payload: Position }
  | { type: 'SET_PLAYERS'; payload: PlayerWithStatus[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SAVING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_OPTIMISTIC_RANKINGS'; payload: Map<number, number> }
  | { type: 'SET_USER_RANKINGS'; payload: UserRanking[] }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'RESET_OPTIMISTIC' }
  | { type: 'INSERT_RANKING'; payload: UserRanking }
  | { type: 'DELETE_RANKING'; payload: string }
  | { type: 'UPDATE_RANKING'; payload: UserRanking };

function playerRankingsReducer(
  state: PlayerRankingsState,
  action: PlayerRankingsAction
): PlayerRankingsState {
  switch (action.type) {
    case 'SET_POSITION':
      return { ...state, selectedPosition: action.payload };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SAVING':
      return { ...state, saving: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_OPTIMISTIC_RANKINGS':
      return { ...state, optimisticRankings: action.payload };
    case 'SET_USER_RANKINGS':
      return { ...state, userRankings: action.payload };
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };
    case 'RESET_OPTIMISTIC':
      return { ...state, optimisticRankings: new Map() };
    case 'INSERT_RANKING':
      return { 
        ...state, 
        userRankings: [...state.userRankings, action.payload]
      };
    case 'DELETE_RANKING':
      return { 
        ...state, 
        userRankings: state.userRankings.filter(ranking => ranking.id !== action.payload)
      };
    case 'UPDATE_RANKING':
      return { 
        ...state, 
        userRankings: state.userRankings.map(ranking => 
          ranking.id === action.payload.id ? action.payload : ranking
        )
      };
    default:
      return state;
  }
}

interface PlayerRankingsProps {
  /**
   * Which positions to show in the position selector
   * @default ['QB', 'RB', 'WR', 'TE']
   */
  positions?: Position[];
  /**
   * Initial position to display
   * @default 'QB'
   */
  initialPosition?: Position;
  /**
   * Whether to show the position selector
   * @default true
   */
  showPositionSelector?: boolean;
  /**
   * Callback when rankings change
   */
  onRankingChange?: (rankings: UserRanking[]) => void;
  /**
   * Compact mode for smaller displays
   * @default false
   */
  compact?: boolean;
  /**
   * Full width mode - removes internal padding and borders for dedicated pages
   * @default false
   */
  fullWidth?: boolean;
}

export function PlayerRankings({
  positions = ['QB', 'RB', 'WR', 'TE'],
  initialPosition = 'QB',
  showPositionSelector = true,
  onRankingChange,
  fullWidth = false
}: PlayerRankingsProps) {
  // Consolidated state management with useReducer
  const [state, dispatch] = useReducer(playerRankingsReducer, {
    selectedPosition: initialPosition,
    players: [],
    loading: true,
    saving: false,
    user: null,
    optimisticRankings: new Map(),
    userRankings: [],
    isConnected: false,
  });

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      dispatch({ type: 'SET_USER', payload: user });
    };
    getCurrentUser();
  }, []);

  // Fetch rankings when position or user changes
  useEffect(() => {
    const fetchRankings = async () => {
      if (!state.user?.id) return;
      try {
        const data = await api.rankings.get(state.selectedPosition);
        dispatch({ type: 'SET_USER_RANKINGS', payload: data || [] });
        onRankingChange?.(data || []);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };
    
    fetchRankings();
  }, [state.user?.id, state.selectedPosition, onRankingChange]);

  // Trigger onRankingChange when userRankings change from real-time updates
  useEffect(() => {
    onRankingChange?.(state.userRankings);
  }, [state.userRankings, onRankingChange]);

  // Real-time subscription using same pattern as live draft
  const handleRealtimeUpdate = useCallback((payload: {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new?: Record<string, unknown>;
    old?: Record<string, unknown>;
  }) => {
    console.log('📡 Rankings real-time update:', payload.eventType, payload);
    
    if (payload.eventType === 'INSERT' && payload.new) {
      // Use a ref to get current state to avoid stale closure
      dispatch({ 
        type: 'INSERT_RANKING', 
        payload: payload.new as unknown as UserRanking 
      });
    } else if (payload.eventType === 'DELETE' && payload.old) {
      dispatch({ 
        type: 'DELETE_RANKING', 
        payload: (payload.old as unknown as UserRanking).id 
      });
    } else if (payload.eventType === 'UPDATE' && payload.new) {
      dispatch({ 
        type: 'UPDATE_RANKING', 
        payload: payload.new as unknown as UserRanking 
      });
    }
  }, []);

  const handleConnectionChange = useCallback((connected: boolean) => {
    console.log('🔌 Real-time connection:', connected);
    dispatch({ type: 'SET_CONNECTED', payload: connected });
  }, []);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'user_rankings',
    handleRealtimeUpdate,
    state.user?.id ? { column: 'user_id', value: state.user.id } : undefined,
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

      dispatch({ type: 'SET_PLAYERS', payload: playersWithStatus });
      console.log('Players loaded:', playersWithStatus.length);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Memoized display players computation
  const displayPlayers = useMemo(() => {
    return state.players.map(player => {
      const optimisticRank = state.optimisticRankings.get(player.id);
      const userRanking = state.userRankings.find(r => r.player_id === player.id);
      
      return {
        ...player,
        custom_rank: optimisticRank ?? userRanking?.custom_rank ?? player.default_rank,
      };
    });
  }, [state.players, state.userRankings, state.optimisticRankings]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Industry standard: Clear optimistic when real-time data confirms changes
  useEffect(() => {
    if (state.optimisticRankings.size === 0) return;
    
    // Check if real-time data matches our optimistic updates
    const hasMatchingData = Array.from(state.optimisticRankings.entries()).every(([playerId, optimisticRank]) => {
      const realTimeRanking = state.userRankings.find(r => 
        r.player_id === playerId && r.position === state.selectedPosition
      );
      return realTimeRanking && realTimeRanking.custom_rank === optimisticRank;
    });
    
    if (hasMatchingData) {
      console.log('✅ Real-time data confirmed optimistic updates, clearing optimistic state');
      dispatch({ type: 'RESET_OPTIMISTIC' });
    }
  }, [state.userRankings, state.optimisticRankings, state.selectedPosition]);

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

  // Memoized filtered and sorted players
  const filteredPlayers = useMemo(() => {
    return displayPlayers
      .filter(player => player.position === state.selectedPosition)
      .sort((a, b) => {
        const rankA = a.custom_rank || a.default_rank;
        const rankB = b.custom_rank || b.default_rank;
        return rankA - rankB;
      });
  }, [displayPlayers, state.selectedPosition]);

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
    dispatch({ type: 'SET_OPTIMISTIC_RANKINGS', payload: newOptimisticRankings });

    // Save rankings to database
    try {
      dispatch({ type: 'SET_SAVING', payload: true });
      const rankingsToSave = reorderedPlayers.map((player, index) => ({
        player_id: player.id,
        custom_rank: index + 1,
        position: state.selectedPosition,
      }));

      await api.rankings.saveMultiple(rankingsToSave);
      // Don't clear optimistic here - let real-time sync handle it
    } catch (error) {
      console.error('Error saving rankings:', error);
      // Industry standard: Revert optimistic update on error
      dispatch({ type: 'RESET_OPTIMISTIC' });
      // Refetch to get server state
      try {
        const data = await api.rankings.get(state.selectedPosition);
        dispatch({ type: 'SET_USER_RANKINGS', payload: data || [] });
        onRankingChange?.(data || []);
      } catch (refetchError) {
        console.error('Error refetching rankings:', refetchError);
      }
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  };

  if (state.loading) {
    return (
      <div className="space-y-6">
        {/* Position selector skeleton */}
        {showPositionSelector && (
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {positions.map((position) => (
                <Skeleton key={position} className="h-8 w-12" />
              ))}
            </div>
          </div>
        )}
        
        {/* Table skeleton */}
        <div className={fullWidth ? '' : 'rounded-md border'}>
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
              {Array.from({ length: 8 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {showPositionSelector && (
          <div className="flex flex-wrap gap-2">
            {positions.map((position) => (
              <Button
                key={position}
                variant={state.selectedPosition === position ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'SET_POSITION', payload: position })}
              >
                {position}
              </Button>
            ))}
          </div>
        )}
        <div className="w-6 flex justify-end">
          {state.saving && (
            <Circle className="h-4 w-4 text-green-500 fill-current animate-pulse" />
          )}
        </div>
      </div>

      <div className={fullWidth ? '' : 'rounded-md border'}>
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
  );
}