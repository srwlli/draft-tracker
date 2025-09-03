import { useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

interface PollingConfig {
  table: string;
  interval?: number; // milliseconds
  filter?: { column: string; value: string | number };
  onUpdate: (data: Record<string, unknown>[]) => void;
  enabled?: boolean;
}

export function usePollingFallback({
  table,
  interval = 5000,
  filter,
  onUpdate,
  enabled = true
}: PollingConfig) {
  // Stabilize the filter object to prevent unnecessary effect re-runs
  const stableFilter = useMemo(() => filter, [filter?.column, filter?.value]);

  useEffect(() => {
    if (!enabled) return;

    if (process.env.NODE_ENV === 'development') {
      console.log(`Starting polling fallback for ${table} every ${interval}ms`);
    }
    
    const pollData = async () => {
      try {
        let query = supabase.from(table).select('*');
        
        if (stableFilter) {
          query = query.eq(stableFilter.column, stableFilter.value);
        }
        
        const { data, error } = await query;
        
        if (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Polling error:', error);
          }
          return;
        }
        
        if (data) {
          onUpdate(data);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Polling fetch error:', error);
        }
      }
    };

    // Poll immediately, then set interval
    pollData();
    const intervalId = setInterval(pollData, interval);

    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Stopping polling fallback for ${table}`);
      }
      clearInterval(intervalId);
    };
  }, [table, interval, stableFilter, onUpdate, enabled]);
}