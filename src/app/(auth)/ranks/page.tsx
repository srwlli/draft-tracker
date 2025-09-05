'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { PlayerRankings } from '@/components/player-rankings';

export default function MyRanksPage() {
  return (
    <AuthPageLayout title="My Ranks">
      <PlayerRankings 
        positions={['QB', 'RB', 'WR', 'TE', 'K', 'DEF']}
        initialPosition="QB"
        fullWidth={true}
      />
    </AuthPageLayout>
  );
}