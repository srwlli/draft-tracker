'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface RankingErrorFallbackProps {
  onRetry?: () => void;
}

export function RankingErrorFallback({ onRetry }: RankingErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/50">
      <AlertCircle className="h-8 w-8 text-destructive mb-3" />
      <h3 className="font-semibold mb-2">Failed to load player rankings</h3>
      <p className="text-sm text-muted-foreground mb-4">
        There was an error loading the player rankings. This might be a temporary issue.
      </p>
      <Button onClick={onRetry} variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
}