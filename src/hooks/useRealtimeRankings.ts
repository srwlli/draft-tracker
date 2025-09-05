import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { UserRanking } from '@/types';
import { RealtimeChannel } from '@supabase/supabase-js';
import { api } from '@/lib/api-client';

interface UseRealtimeRankingsProps {
  userId?: string;
  position?: string;
  initialRankings?: UserRanking[];
}

export function useRealtimeRankings({ userId, position, initialRankings = [] }: UseRealtimeRankingsProps) {
  const [rankings, setRankings] = useState<UserRanking[]>(initialRankings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const lastUpdateRef = useRef<string>(''); // Track last update timestamp to prevent duplicates
  const throttleRef = useRef<NodeJS.Timeout | null>(null); // Throttle updates

  useEffect(() => {
    if (!userId) return;

    // Fetch initial rankings when userId or position changes
    fetchRankings();

    const channelName = `user-rankings:${userId}`;
    
    // Create realtime subscription
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'user_rankings',
          filter: `user_id=eq.${userId}`,
        },
        (payload: {
          commit_timestamp: string;
          eventType: 'INSERT' | 'UPDATE' | 'DELETE';
          new?: Record<string, unknown>;
          old?: Record<string, unknown>;
        }) => {
          // Create a unique key for deduplication
          const updateKey = `${payload.commit_timestamp}-${payload.eventType}-${payload.new?.player_id || payload.old?.player_id}`;
          
          // Skip if this is a duplicate update
          if (lastUpdateRef.current === updateKey) {
            console.log('Skipping duplicate update:', updateKey);
            return;
          }
          lastUpdateRef.current = updateKey;
          
          // Clear existing throttle
          if (throttleRef.current) {
            clearTimeout(throttleRef.current);
          }
          
          // Throttle updates to prevent excessive re-renders
          throttleRef.current = setTimeout(() => {
            console.log('Processing realtime ranking update:', payload);
            
            const { eventType, new: newRecord, old: oldRecord } = payload;
            
            // Apply position filter if specified
            const recordPosition = newRecord?.position || oldRecord?.position;
            if (position && position !== 'ALL' && recordPosition !== position) {
              return;
            }

            setRankings((currentRankings) => {
              switch (eventType) {
                case 'INSERT':
                  // Add new ranking if it doesn't exist
                  if (newRecord && !currentRankings.find(r => r.player_id === newRecord.player_id)) {
                    return [...currentRankings, newRecord as unknown as UserRanking].sort((a, b) => a.custom_rank - b.custom_rank);
                  }
                  return currentRankings;
                  
                case 'UPDATE':
                  // Update existing ranking
                  if (newRecord) {
                    const updated = currentRankings.map(ranking =>
                      ranking.player_id === newRecord.player_id
                        ? { ...ranking, ...newRecord } as unknown as UserRanking
                        : ranking
                    );
                    return updated.sort((a, b) => a.custom_rank - b.custom_rank);
                  }
                  return currentRankings;
                  
                case 'DELETE':
                  // Remove deleted ranking
                  if (oldRecord) {
                    return currentRankings.filter(ranking => ranking.player_id !== oldRecord.player_id);
                  }
                  return currentRankings;
                  
                default:
                  return currentRankings;
              }
            });
          }, 100); // 100ms throttle
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to realtime updates for user ${userId}`);
          setError(null); // Clear any previous errors
        } else if (status === 'CHANNEL_ERROR') {
          console.warn('Realtime connection error - will retry automatically');
          setError('Connection temporarily unavailable');
        } else if (status === 'TIMED_OUT') {
          console.warn('Realtime connection timed out - will retry');
          setError('Connection timed out');
        } else if (status === 'CLOSED') {
          console.log('Realtime connection closed');
        }
      });

    channelRef.current = channel;

    // Cleanup function
    return () => {
      // Clear throttle timeout
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
        throttleRef.current = null;
      }
      // Remove channel
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId, position]);

  // Function to fetch initial data
  const fetchRankings = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.rankings.get(position && position !== 'ALL' ? position : undefined);
      setRankings(data || []);
    } catch (err) {
      console.error('Error fetching rankings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch rankings');
    } finally {
      setLoading(false);
    }
  };

  // Function to trigger a manual refresh
  const refetch = () => {
    fetchRankings();
  };

  return {
    rankings,
    loading,
    error,
    refetch,
    isConnected: channelRef.current?.state === 'joined',
  };
}