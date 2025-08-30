import { useEffect, useCallback } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type SubscriptionCallback = (payload: any) => void;

export function useSupabaseRealtime(
  table: string,
  callback: SubscriptionCallback,
  filter?: { column: string; value: string | number }
) {
  const stableCallback = useCallback(callback, []);

  useEffect(() => {
    console.log(`Setting up real-time subscription for table: ${table}`, filter);
    
    // Create a single channel for all events
    const channelName = filter 
      ? `${table}_${filter.column}_${filter.value}` 
      : `${table}_changes`;
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { 
          event: '*', // Listen to all events
          schema: 'public', 
          table: table,
          ...(filter && { filter: `${filter.column}=eq.${filter.value}` })
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          stableCallback(payload);
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    // Cleanup subscription when component unmounts
    return () => {
      console.log(`Cleaning up subscription for ${table}`);
      supabase.removeChannel(channel);
    };
  }, [table, stableCallback, filter?.column, filter?.value]);
}