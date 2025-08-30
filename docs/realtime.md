If the real-time feature in the Supabase dashboard isn't available yet, you can still fix the real-time updates issue with a few code adjustments:

1. **Update your Supabase client setup** to ensure real-time is properly configured:

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
```

2. **Simplify your real-time subscription** to ensure it's working correctly:

```typescript
// In your component where you need real-time updates
useEffect(() => {
  // Create a channel for real-time updates
  const channel = supabase
    .channel('draft_picks_changes')
    .on('postgres_changes', {
      event: '*',  // Listen to all events (INSERT, UPDATE, DELETE)
      schema: 'public',
      table: 'draft_picks',
      filter: `draft_id=eq.${draftId}`
    }, (payload) => {
      console.log('Real-time update:', payload);
      
      // Handle different event types
      if (payload.eventType === 'INSERT') {
        setDraftPicks(prev => [...prev, payload.new]);
      } else if (payload.eventType === 'DELETE') {
        setDraftPicks(prev => prev.filter(pick => pick.id !== payload.old.id));
      }
    })
    .subscribe();

  // Clean up on unmount
  return () => {
    supabase.removeChannel(channel);
  };
}, [draftId]);
```

3. **Add a manual polling fallback** as a temporary solution:

```typescript
// Poll for updates every 5 seconds as a fallback
useEffect(() => {
  const interval = setInterval(async () => {
    const { data } = await supabase
      .from('draft_picks')
      .select('*')
      .eq('draft_id', draftId);
    
    if (data) {
      setDraftPicks(data);
    }
  }, 5000);

  return () => clearInterval(interval);
}, [draftId]);
```

4. **Add debug logging** to see what's happening with your subscriptions:

```typescript
useEffect(() => {
  console.log('Setting up real-time subscription for draft_id:', draftId);
  
  // Subscription code here...
  
  channel.subscribe((status) => {
    console.log('Subscription status:', status);
  });
}, [draftId]);
```

These changes should help fix the real-time update issue, even without being able to access the real-time settings in the Supabase dashboard.