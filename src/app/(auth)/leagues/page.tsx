'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { CreateDraft } from '@/components/create-draft';

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