'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, BarChart3, Users, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { ActionCard } from '@/components/action-card';
import { DraftForm } from '@/components/draft-form';
import { EmptyState } from '@/components/empty-state';

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
    if (!user) return;
    
    if (!draftName.trim()) {
      toast.error('Please enter a draft name');
      return;
    }
    
    setIsLoading(true);
    try {
      const adminToken = uuidv4();
      const { data, error } = await supabase
        .from('drafts')
        .insert([{ 
          name: draftName.trim(), 
          admin_token: adminToken,
          user_id: user.id
        }])
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* Create Draft Card */}
            <ActionCard
              size="md"
              icon={<Plus className="w-5 h-5 text-primary" />}
              title="Create New Draft"
              description="Start a new fantasy football draft"
              content={<DraftForm draftName={draftName} onDraftNameChange={setDraftName} />}
              buttonText="Create Draft"
              onButtonClick={createDraft}
              loading={isLoading}
            />

            {/* My Drafts Card */}
            <ActionCard
              icon={<Users className="w-5 h-5 text-primary" />}
              title="My Drafts"
              description="View and manage your drafts"
              content={<EmptyState message="No drafts yet" />}
              buttonText="View Drafts"
              disabled
            />

            {/* My Rankings Card */}
            <ActionCard
              icon={<BarChart3 className="w-5 h-5 text-primary" />}
              title="My Rankings"
              description="Customize player rankings"
              content={<EmptyState message="Advanced ranking features in development" />}
              buttonText="View Rankings"
              onButtonClick={() => router.push('/ranks')}
            />

            {/* Join Draft Card */}
            <ActionCard
              size="md"
              className="lg:col-span-1"
              icon={<UserPlus className="w-5 h-5 text-primary" />}
              title="Join Draft"
              description="Join an existing draft"
              content={<EmptyState message="Enter draft link" />}
              buttonText="Join Draft"
              disabled
            />

        </div>
      </div>
    </div>
  );
}
