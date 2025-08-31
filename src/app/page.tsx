'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [draftName, setDraftName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
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
                suppressHydrationWarning
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
