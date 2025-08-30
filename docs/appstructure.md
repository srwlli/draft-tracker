# Basic Application Structure

Here's how the basic application structure should look:

## 1. Homepage (Route: `/`)

The homepage should be simple and focused on creating a new draft. It should include:

```tsx
// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [draftName, setDraftName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createDraft = async () => {
    setIsLoading(true);
    try {
      const adminToken = uuidv4();
      const { data, error } = await supabase
        .from('drafts')
        .insert([{ name: draftName || 'Fantasy Draft', admin_token: adminToken }])
        .select();

      if (error) throw error;
      
      const draftId = data[0].id;
      router.push(`/draft/${draftId}/admin/${adminToken}`);
    } catch (error) {
      console.error('Error creating draft:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Fantasy Football Draft Tracker</CardTitle>
          <CardDescription>Create a new draft to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="draftName" className="text-sm font-medium">Draft Name</label>
              <Input
                id="draftName"
                placeholder="My Fantasy Draft 2025"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={createDraft}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create New Draft'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
```

## 2. Viewer Page (Route: `/draft/[draftId]`)

The viewer page displays the draft board for regular users:

```tsx
// src/app/draft/[draftId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PlayerTable } from '@/components/player-table';
import { PositionFilter } from '@/components/position-filter';
import { DraftStats } from '@/components/draft-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Player, DraftPick, Draft, Position } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

export default function DraftViewerPage() {
  const { draftId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get draft info
        const { data: draftData } = await supabase
          .from('drafts')
          .select('*')
          .eq('id', draftId)
          .single();
        
        setDraft(draftData);

        // Get players
        const { data: playersData } = await supabase
          .from('players')
          .select('*')
          .order('position')
          .order('default_rank');
        
        // Get draft picks
        const { data: draftPicksData } = await supabase
          .from('draft_picks')
          .select('*')
          .eq('draft_id', draftId);
        
        setPlayers(playersData || []);
        setDraftPicks(draftPicksData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [draftId]);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'draft_picks',
    'INSERT',
    (payload) => {
      setDraftPicks((current) => [...current, payload.new]);
    },
    { column: 'draft_id', value: draftId as string }
  );

  useSupabaseRealtime(
    'draft_picks',
    'DELETE',
    (payload) => {
      setDraftPicks((current) => 
        current.filter((pick) => pick.id !== payload.old.id)
      );
    },
    { column: 'draft_id', value: draftId as string }
  );

  // Filter players by position
  const filteredPlayers = players.filter(player => 
    selectedPosition === 'ALL' || player.position === selectedPosition
  );

  // Mark drafted players
  const playersWithStatus = filteredPlayers.map(player => ({
    ...player,
    is_drafted: draftPicks.some(pick => pick.player_id === player.id)
  }));

  // Get position counts
  const positionCounts = {
    QB: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'QB'
    ).length,
    RB: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'RB'
    ).length,
    WR: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'WR'
    ).length,
    TE: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'TE'
    ).length,
    K: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'K'
    ).length,
    DEF: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'DEF'
    ).length,
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{draft?.name || 'Fantasy Draft'}</h1>
      <p className="text-muted-foreground mb-6">Viewer Mode</p>
      
      <DraftStats 
        totalPicks={draftPicks.length}
        positionCounts={positionCounts}
      />
      
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedPosition('ALL')}>All</TabsTrigger>
          <TabsTrigger value="QB" onClick={() => setSelectedPosition('QB')}>QB</TabsTrigger>
          <TabsTrigger value="RB" onClick={() => setSelectedPosition('RB')}>RB</TabsTrigger>
          <TabsTrigger value="WR" onClick={() => setSelectedPosition('WR')}>WR</TabsTrigger>
          <TabsTrigger value="TE" onClick={() => setSelectedPosition('TE')}>TE</TabsTrigger>
          <TabsTrigger value="K" onClick={() => setSelectedPosition('K')}>K</TabsTrigger>
          <TabsTrigger value="DEF" onClick={() => setSelectedPosition('DEF')}>DEF</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="QB" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={false}
            onDraft={() => {}}
            onUndraft={() => {}}
          />
        </TabsContent>
        
        {/* Similar TabsContent for other positions */}
      </Tabs>
    </div>
  );
}
```

## 3. Admin Page (Route: `/draft/[draftId]/admin/[adminToken]`)

The admin page is similar to the viewer page but with added controls:

```tsx
// src/app/draft/[draftId]/admin/[adminToken]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PlayerTable } from '@/components/player-table';
import { PositionFilter } from '@/components/position-filter';
import { DraftStats } from '@/components/draft-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Player, DraftPick, Draft, Position } from '@/types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

export default function DraftAdminPage() {
  const { draftId, adminToken } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [isValidAdmin, setIsValidAdmin] = useState(false);
  const router = useRouter();

  // Load initial data and validate admin token
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get draft info and validate admin token
        const { data: draftData } = await supabase
          .from('drafts')
          .select('*')
          .eq('id', draftId)
          .single();
        
        if (draftData.admin_token !== adminToken) {
          router.push(`/draft/${draftId}`);
          return;
        }
        
        setDraft(draftData);
        setIsValidAdmin(true);

        // Get players
        const { data: playersData } = await supabase
          .from('players')
          .select('*')
          .order('position')
          .order('default_rank');
        
        // Get draft picks
        const { data: draftPicksData } = await supabase
          .from('draft_picks')
          .select('*')
          .eq('draft_id', draftId);
        
        setPlayers(playersData || []);
        setDraftPicks(draftPicksData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [draftId, adminToken, router]);

  // Subscribe to real-time updates
  useSupabaseRealtime(
    'draft_picks',
    'INSERT',
    (payload) => {
      setDraftPicks((current) => [...current, payload.new]);
    },
    { column: 'draft_id', value: draftId as string }
  );

  useSupabaseRealtime(
    'draft_picks',
    'DELETE',
    (payload) => {
      setDraftPicks((current) => 
        current.filter((pick) => pick.id !== payload.old.id)
      );
    },
    { column: 'draft_id', value: draftId as string }
  );

  // Handle drafting a player
  const handleDraftPlayer = async (playerId: number) => {
    try {
      const pickNumber = draftPicks.length + 1;
      
      const { data, error } = await supabase
        .from('draft_picks')
        .insert([{
          draft_id: draftId,
          player_id: playerId,
          pick_number: pickNumber
        }])
        .select();
      
      if (error) throw error;
      
      toast.success('Player drafted successfully');
    } catch (error) {
      console.error('Error drafting player:', error);
      toast.error('Failed to draft player');
    }
  };

  // Handle undrafting a player
  const handleUndraftPlayer = async (playerId: number) => {
    try {
      const { error } = await supabase
        .from('draft_picks')
        .delete()
        .eq('draft_id', draftId)
        .eq('player_id', playerId);
      
      if (error) throw error;
      
      toast.success('Draft pick removed');
    } catch (error) {
      console.error('Error undrafting player:', error);
      toast.error('Failed to remove draft pick');
    }
  };

  // Filter players by position
  const filteredPlayers = players.filter(player => 
    selectedPosition === 'ALL' || player.position === selectedPosition
  );

  // Mark drafted players
  const playersWithStatus = filteredPlayers.map(player => ({
    ...player,
    is_drafted: draftPicks.some(pick => pick.player_id === player.id)
  }));

  // Get position counts
  const positionCounts = {
    QB: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'QB'
    ).length,
    RB: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'RB'
    ).length,
    WR: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'WR'
    ).length,
    TE: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'TE'
    ).length,
    K: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'K'
    ).length,
    DEF: draftPicks.filter(pick => 
      players.find(p => p.id === pick.player_id)?.position === 'DEF'
    ).length,
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isValidAdmin) {
    return <div className="flex h-screen items-center justify-center">Unauthorized</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{draft?.name || 'Fantasy Draft'}</h1>
          <p className="text-muted-foreground">Admin Mode</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/draft/${draftId}`);
            toast.success('Viewer link copied to clipboard');
          }}>
            Copy Viewer Link
          </Button>
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Admin link copied to clipboard');
          }}>
            Copy Admin Link
          </Button>
        </div>
      </div>
      
      <DraftStats 
        totalPicks={draftPicks.length}
        positionCounts={positionCounts}
      />
      
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedPosition('ALL')}>All</TabsTrigger>
          <TabsTrigger value="QB" onClick={() => setSelectedPosition('QB')}>QB</TabsTrigger>
          <TabsTrigger value="RB" onClick={() => setSelectedPosition('RB')}>RB</TabsTrigger>
          <TabsTrigger value="WR" onClick={() => setSelectedPosition('WR')}>WR</TabsTrigger>
          <TabsTrigger value="TE" onClick={() => setSelectedPosition('TE')}>TE</TabsTrigger>
          <TabsTrigger value="K" onClick={() => setSelectedPosition('K')}>K</TabsTrigger>
          <TabsTrigger value="DEF" onClick={() => setSelectedPosition('DEF')}>DEF</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
        
        <TabsContent value="QB" className="mt-4">
          <PlayerTable 
            players={playersWithStatus}
            isAdmin={true}
            onDraft={handleDraftPlayer}
            onUndraft={handleUndraftPlayer}
          />
        </TabsContent>
        
        {/* Similar TabsContent for other positions */}
      </Tabs>
    </div>
  );
}
```

1. **Homepage** - Simple interface to create a new draft
2. **Viewer Page** - Read-only view of the draft board
3. **Admin Page** - Same as viewer but with draft controls

The key differences between admin and viewer are:
- Admin page validates the admin token against the database
- Admin page includes draft/undraft buttons
- Admin page has buttons to copy and share the links

