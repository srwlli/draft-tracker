# Create directories
mkdir -p src/lib
mkdir -p src/hooks

# Create Supabase client file
cat > src/lib/supabase.ts << 'EOF'
import { createClient } from '@supabase/supabase-js';

// These will be loaded from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Type assertion to ensure TypeScript knows these values exist
if (!supabaseUrl || !supabaseAnonKey) {
 throw new Error('Missing Supabase environment variables');
}

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
EOF

# Create custom hook for real-time subscriptions
cat > src/hooks/useSupabaseRealtime.ts << 'EOF'
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
EOF

# Create .env.local file (replace with your actual credentials)
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EOF

echo "Supabase client setup complete. Remember to update .env.local with your actual credentials."

---

In the initial setup, several things could have been done differently to avoid the real-time issues:

1. **Supabase Client Configuration**:
   - We should have included the real-time configuration options from the start:
   ```typescript
   export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
     realtime: {
       params: {
         eventsPerSecond: 10
       }
     }
   });
   ```

2. **Real-time Subscription Pattern**:
   - Instead of creating separate subscriptions for different events (INSERT, DELETE), we should have used a single subscription with `event: '*'` to handle all changes
   - The channel naming should have been simpler and more consistent

3. **Hook Implementation**:
   - The `useSupabaseRealtime` hook should have had a more carefully constructed dependency array
   - We should have included proper cleanup to remove channels when components unmount

4. **Debugging Approach**:
   - We should have incorporated logging from the start to track subscription status
   - Console logs for real-time events would have made troubleshooting easier

5. **Fallback Mechanisms**:
   - We could have implemented a polling fallback from the beginning as a safety net
   - This would have ensured functionality even if real-time had issues

These changes in the initial setup would have likely prevented the real-time update issues. It's a common oversight when working with Supabase real-time, as the documentation and best practices continue to evolve with the platform.