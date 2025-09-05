'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { Button } from '@/components/ui/button';
import { CreateDraft } from '@/components/create-draft';
import { Users, Trophy, Plus, Calendar, Settings, Link2, BarChart3, Crown } from 'lucide-react';

export default function MyLeaguesPage() {
  return (
    <AuthPageLayout title="My Leagues">
      <div className="space-y-6">

        {/* Create New Draft */}
        <CreateDraft 
          title="Create New Draft"
          description="Start a new fantasy football draft session"
        />





      </div>
    </AuthPageLayout>
  );
}