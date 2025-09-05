'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthPageLayout } from '@/components/auth-page-layout';

export default function ComingSoonPage() {

  return (
    <AuthPageLayout title="Coming Soon">
      <Card>
        <CardHeader>
          <CardTitle>New Features in Development</CardTitle>
          <CardDescription>
            Exciting updates are coming to Draft Tracker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We&apos;re working on new features to enhance your drafting experience. Check back soon for updates!
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthPageLayout>
  );
}