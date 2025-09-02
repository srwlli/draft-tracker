'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthPageLayout } from '@/components/auth-page-layout';

export default function MyLeaguesPage() {

  return (
    <AuthPageLayout title="My Leagues">
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            League integration features are in development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Link with your favorite app:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>ESPN Fantasy</strong> - Import your ESPN league data</li>
                <li>• <strong>Yahoo Fantasy</strong> - Sync with Yahoo league settings</li>
                <li>• <strong>NFL.com Fantasy</strong> - Connect your NFL league</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthPageLayout>
  );
}