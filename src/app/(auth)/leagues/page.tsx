'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MyLeaguesPage() {
  const router = useRouter();

  return (
    <div className="bg-background p-4 pb-20 min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => router.back()}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">My Leagues</h1>
        </div>
        
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
      </div>
    </div>
  );
}