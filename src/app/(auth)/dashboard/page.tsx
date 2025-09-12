'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api-client';
import { Plus, BarChart3, Users, User, Newspaper, Code, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { ActionCard } from '@/components/action-card';
import { DraftForm } from '@/components/draft-form';
import { EmptyState } from '@/components/empty-state';

export default function Dashboard() {
  const [draftName, setDraftName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();


  const createDraft = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating draft - User state:', { user: user?.email, id: user?.id });
    }
    
    if (!user) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No user found, returning');
      }
      return;
    }
    
    if (!draftName.trim()) {
      toast.error('Please enter a draft name');
      return;
    }
    
    setIsLoading(true);
    try {
      const draft = await api.drafts.create(draftName.trim());
      router.push(`/draft/${draft.id}/admin`);
    } catch (error) {
      console.error('Error creating draft:', error);
      toast.error('Failed to create draft');
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

            {/* My Rankings Card */}
            <ActionCard
              icon={<BarChart3 className="w-5 h-5 text-primary" />}
              title="My Rankings"
              description="Customize player rankings"
              content={<EmptyState message="Advanced ranking features in development" />}
              buttonText="View Rankings"
              onButtonClick={() => router.push('/ranks')}
            />

            {/* My Leagues Card */}
            <ActionCard
              icon={<Users className="w-5 h-5 text-primary" />}
              title="My Leagues"
              description="Connect with ESPN, Yahoo, NFL"
              content={<EmptyState message="Link with your favorite fantasy app" />}
              buttonText="View Leagues"
              onButtonClick={() => router.push('/leagues')}
            />

            {/* Profile Card */}
            <ActionCard
              icon={<User className="w-5 h-5 text-primary" />}
              title="Profile"
              description="Manage your account settings"
              content={<EmptyState message="Profile features coming soon" />}
              buttonText="View Profile"
              onButtonClick={() => router.push('/profile')}
            />

            {/* News Card */}
            <ActionCard
              icon={<Newspaper className="w-5 h-5 text-primary" />}
              title="News"
              description="Latest fantasy football news"
              content={<EmptyState message="Breaking news and expert analysis" />}
              buttonText="Read News"
              onButtonClick={() => router.push('/news')}
            />

            {/* Technology Card */}
            <ActionCard
              icon={<Code className="w-5 h-5 text-primary" />}
              title="Technology"
              description="Our tech stack and architecture"
              content={<EmptyState message="Modern web technologies powering Draft Tracker" />}
              buttonText="View Tech Stack"
              onButtonClick={() => router.push('/tech')}
            />

            {/* Subscriptions Card */}
            <ActionCard
              icon={<CreditCard className="w-5 h-5 text-primary" />}
              title="Subscriptions"
              description="Manage your premium features"
              content={<EmptyState message="Upgrade for advanced analytics and league sync" />}
              buttonText="View Plans"
              onButtonClick={() => router.push('/subscriptions')}
            />

        </div>
      </div>
    </div>
  );
}
