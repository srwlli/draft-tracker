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
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">QB</Badge>
              <span className="text-xl font-semibold">{positionCounts.QB}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary">RB</Badge>
              <span className="text-xl font-semibold">{positionCounts.RB}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary">WR</Badge>
              <span className="text-xl font-semibold">{positionCounts.WR}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary">TE</Badge>
              <span className="text-xl font-semibold">{positionCounts.TE}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary">K</Badge>
              <span className="text-xl font-semibold">{positionCounts.K}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary">DEF</Badge>
              <span className="text-xl font-semibold">{positionCounts.DEF}</span>
            </div>
          </div>
          
          <div className="border-t pt-4 text-center">
            <div className="text-sm text-muted-foreground">Total Picks</div>
            <div className="text-2xl font-bold text-primary">{totalPicks}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}