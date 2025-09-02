'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MyRanksPage() {
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
          <h1 className="text-3xl font-bold">My Ranks</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              Advanced ranking features are in development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Planned Features:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <strong>Player ranking interface</strong> with drag-and-drop</li>
                  <li>• <strong>Import/export rankings</strong> functionality</li>
                  <li>• <strong>Sync with draft picks</strong> integration</li>
                  <li>• <strong>Position-based ranking</strong> views</li>
                  <li>• <strong>Custom ranking algorithms</strong> support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}