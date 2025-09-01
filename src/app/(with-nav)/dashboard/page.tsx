'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, BarChart3, Users, UserPlus } from 'lucide-react';

export default function Dashboard() {
  const [draftName, setDraftName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    <div className="bg-gradient-to-br from-background to-muted p-4 pb-20 min-h-screen">
      <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Fantasy Dashboard</h1>
              <p className="text-muted-foreground">Welcome back{user?.email ? `, ${user.email}` : ''}</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Create Draft Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <CardTitle>Create New Draft</CardTitle>
                </div>
                <CardDescription>
                  Start a new fantasy football draft
                </CardDescription>
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
                  {isLoading ? 'Creating...' : 'Create Draft'}
                </Button>
              </CardFooter>
            </Card>

            {/* My Drafts Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle>My Drafts</CardTitle>
                </div>
                <CardDescription>
                  View and manage your drafts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No drafts yet</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  View Drafts
                </Button>
              </CardFooter>
            </Card>

            {/* My Rankings Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle>My Rankings</CardTitle>
                </div>
                <CardDescription>
                  Customize player rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">Coming soon</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Edit Rankings
                </Button>
              </CardFooter>
            </Card>

            {/* Join Draft Card */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <UserPlus className="w-5 h-5 text-primary" />
                  <CardTitle>Join Draft</CardTitle>
                </div>
                <CardDescription>
                  Join an existing draft
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">Enter draft link</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Join Draft
                </Button>
              </CardFooter>
            </Card>

        </div>
      </div>
    </div>
  );
}
