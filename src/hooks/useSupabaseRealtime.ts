import { useEffect } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type SubscriptionCallback = (payload: any) => void;

export function useSupabaseRealtime(
  table: string,
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*',
  callback: SubscriptionCallback,
  filter?: { column: string; value: string | number }
) {
  useEffect(() => {
    // Create a channel
    let channel: RealtimeChannel;
    
    if (filter) {
      channel = supabase
        .channel(`public:${table}:${filter.column}=eq.${filter.value}`)
        .on(
          'postgres_changes',
          { 
            event: event, 
            schema: 'public', 
            table: table,
            filter: `${filter.column}=eq.${filter.value}`
          },
          callback
        )
        .subscribe();
    } else {
      channel = supabase
        .channel(`public:${table}`)
        .on(
          'postgres_changes',
          { event: event, schema: 'public', table: table },
          callback
        )
        .subscribe();
    }

    // Cleanup subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, event, callback, filter]);
}