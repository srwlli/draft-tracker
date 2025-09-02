'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthPageLayout } from '@/components/auth-page-layout';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <AuthPageLayout title="Profile">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email || 'Not available'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">User ID</h3>
                <p className="text-sm text-muted-foreground font-mono">
                  {user?.id || 'Not available'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Draft Statistics</CardTitle>
            <CardDescription>
              Your drafting activity and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>• Total drafts created: Coming soon</p>
                <p>• Favorite positions: Coming soon</p>
                <p>• Draft success rate: Coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your Draft Tracker experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>• Default draft settings: Coming soon</p>
                <p>• Notification preferences: Coming soon</p>
                <p>• League integrations: Coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthPageLayout>
  );
}