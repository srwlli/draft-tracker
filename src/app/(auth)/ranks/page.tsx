'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { PlayerRankings } from '@/components/player-rankings';
import { ErrorBoundary } from '@/components/error-boundary';
import { RankingErrorFallback } from '@/components/ranking-error-fallback';

export default function MyRanksPage() {
  return (
    <AuthPageLayout title="My Ranks">
      <ErrorBoundary 
        fallback={<RankingErrorFallback onRetry={() => window.location.reload()} />}
        onError={(error, errorInfo) => {
          // Optional: Send to error reporting service
          console.error('PlayerRankings error:', error, errorInfo);
        }}
      >
        <PlayerRankings 
          positions={['QB', 'RB', 'WR', 'TE', 'K', 'DEF']}
          initialPosition="QB"
          fullWidth={true}
        />
      </ErrorBoundary>
    </AuthPageLayout>
  );
}