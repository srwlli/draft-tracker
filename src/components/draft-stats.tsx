'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PositionCounts } from '@/types';

interface DraftStatsProps {
  totalPicks: number;
  positionCounts: PositionCounts;
}

export function DraftStats({ totalPicks, positionCounts }: DraftStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Draft Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalPicks}</div>
            <div className="text-sm text-muted-foreground">Total Picks</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-semibold">{positionCounts.QB}</div>
            <Badge variant="secondary" className="text-xs">QB</Badge>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-semibold">{positionCounts.RB}</div>
            <Badge variant="secondary" className="text-xs">RB</Badge>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-semibold">{positionCounts.WR}</div>
            <Badge variant="secondary" className="text-xs">WR</Badge>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-semibold">{positionCounts.TE}</div>
            <Badge variant="secondary" className="text-xs">TE</Badge>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-semibold">{positionCounts.K}</div>
            <Badge variant="secondary" className="text-xs">K</Badge>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-semibold">{positionCounts.DEF}</div>
            <Badge variant="secondary" className="text-xs">DEF</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}