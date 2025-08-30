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