import { useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

type SubscriptionCallback = (payload: {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new?: Record<string, unknown>;
  old?: Record<string, unknown>;
}) => void;

export function useSupabaseRealtime(
  table: string,
  callback: SubscriptionCallback,
  filter?: { column: string; value: string | number },
  onConnectionChange?: (connected: boolean) => void
) {
  const stableCallback = useCallback((payload: {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new?: Record<string, unknown>;
    old?: Record<string, unknown>;
  }) => callback(payload), [callback]);

  // Stabilize the filter object to prevent unnecessary re-subscriptions
  const stableFilter = useMemo(() => filter, [filter?.column, filter?.value]);

  // Stabilize the connection change callback
  const stableOnConnectionChange = useCallback(
    (connected: boolean) => onConnectionChange?.(connected),
    [onConnectionChange]
  );

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Setting up real-time subscription for table: ${table}`, stableFilter);
    }
    
    // Create a single channel for all events
    const channelName = stableFilter 
      ? `${table}_${stableFilter.column}_${stableFilter.value}` 
      : `${table}_changes`;
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { 
          event: '*', // Listen to all events
          schema: 'public', 
          table: table,
          ...(stableFilter && { filter: `${stableFilter.column}=eq.${stableFilter.value}` })
        },
        (payload) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Real-time update received:', payload);
          }
          // Connection is confirmed working when we receive events
          stableOnConnectionChange(true);
          stableCallback(payload);
        }
      )
      .subscribe((status) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Subscription status:', status);
        }
        // Handle subscription status changes
        if (status === 'SUBSCRIBED') {
          // Don't set connected=true here, wait for actual data
          if (process.env.NODE_ENV === 'development') {
            console.log('Real-time subscription established');
          }
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          stableOnConnectionChange(false);
          if (process.env.NODE_ENV === 'development') {
            console.log('Real-time subscription closed or errored');
          }
        }
      });

    // Cleanup subscription when component unmounts
    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Cleaning up subscription for ${table}`);
      }
      stableOnConnectionChange(false); // Reset connection state on unmount
      supabase.removeChannel(channel);
    };
  }, [table, stableCallback, stableFilter, stableOnConnectionChange]);
}