import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface PollingConfig {
  table: string;
  interval?: number; // milliseconds
  filter?: { column: string; value: string | number };
  onUpdate: (data: any[]) => void;
  enabled?: boolean;
}

export function usePollingFallback({
  table,
  interval = 5000,
  filter,
  onUpdate,
  enabled = true
}: PollingConfig) {
  useEffect(() => {
    if (!enabled) return;

    console.log(`Starting polling fallback for ${table} every ${interval}ms`);
    
    const pollData = async () => {
      try {
        let query = supabase.from(table).select('*');
        
        if (filter) {
          query = query.eq(filter.column, filter.value);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Polling error:', error);
          return;
        }
        
        if (data) {
          onUpdate(data);
        }
      } catch (error) {
        console.error('Polling fetch error:', error);
      }
    };

    // Poll immediately, then set interval
    pollData();
    const intervalId = setInterval(pollData, interval);

    return () => {
      console.log(`Stopping polling fallback for ${table}`);
      clearInterval(intervalId);
    };
  }, [table, interval, filter?.column, filter?.value, onUpdate, enabled]);
}