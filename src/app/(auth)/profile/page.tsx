'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { useAuth } from '@/contexts/AuthContext';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <AuthPageLayout title="Profile">
      <div className="space-y-6">
        
        {/* Personal Information */}
        <TextCard
          title="Personal Information"
          description="Your basic account information"
          icon={<User className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Display Name</h3>
                <p className="text-sm text-muted-foreground">Draft Master</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email || 'Not available'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">San Francisco, CA</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Member Since</h3>
                <p className="text-sm text-muted-foreground">August 2024</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Bio</h3>
              <p className="text-sm text-muted-foreground">Fantasy football enthusiast with 10+ years of drafting experience. Always looking for sleeper picks and value players.</p>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}