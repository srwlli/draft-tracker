'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, Crown, Target, Calendar, RefreshCw, Download } from 'lucide-react';

export default function MyRanksPage() {
  return (
    <AuthPageLayout title="My Ranks">
      <div className="space-y-6">

        {/* Top Players Rankings */}
        <TextCard
          title="Top Players Rankings"
          description="Current aggregate rankings across all positions"
          icon={<Crown className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Overall #1</h3>
                <p className="text-sm text-muted-foreground">Christian McCaffrey (RB)</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Top QB</h3>
                <p className="text-sm text-muted-foreground">Josh Allen</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Top WR</h3>
                <p className="text-sm text-muted-foreground">Tyreek Hill</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Top TE</h3>
                <p className="text-sm text-muted-foreground">Travis Kelce</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Position Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Top 50 Players</span>
                  <span>RB: 18 | WR: 20 | QB: 8 | TE: 4</span>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Weekly Trends */}
        <TextCard
          title="Weekly Trends"
          description="Player movement and trending updates"
          icon={<TrendingUp className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Trending Up</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">📈 Tua Tagovailoa (QB) +5 spots</p>
                <p className="text-sm text-muted-foreground">📈 Breece Hall (RB) +3 spots</p>
                <p className="text-sm text-muted-foreground">📈 DeVonta Smith (WR) +7 spots</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Trending Down</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">📉 Russell Wilson (QB) -4 spots</p>
                <p className="text-sm text-muted-foreground">📉 Dalvin Cook (RB) -6 spots</p>
                <p className="text-sm text-muted-foreground">📉 Mike Evans (WR) -2 spots</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">Last updated: September 1, 2025</p>
            </div>
          </div>
        </TextCard>

        {/* Position Rankings */}
        <TextCard
          title="Position Rankings"
          description="Detailed rankings by position"
          icon={<Target className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-muted/50">
                <h3 className="text-lg font-semibold">QB</h3>
                <p className="text-sm text-muted-foreground">32 Ranked</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <h3 className="text-lg font-semibold">RB</h3>
                <p className="text-sm text-muted-foreground">64 Ranked</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <h3 className="text-lg font-semibold">WR</h3>
                <p className="text-sm text-muted-foreground">80 Ranked</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <h3 className="text-lg font-semibold">TE</h3>
                <p className="text-sm text-muted-foreground">24 Ranked</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Quick Access</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">View QB Rankings</Button>
                <Button variant="outline" size="sm">View RB Rankings</Button>
                <Button variant="outline" size="sm">View WR Rankings</Button>
                <Button variant="outline" size="sm">View TE Rankings</Button>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Ranking Analytics */}
        <TextCard
          title="Ranking Analytics"
          description="Insights and performance metrics"
          icon={<BarChart3 className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-2xl font-bold text-primary">89%</h3>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">156</h3>
                <p className="text-sm text-muted-foreground">Players Tracked</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">12</h3>
                <p className="text-sm text-muted-foreground">Leagues Synced</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• Updated RB rankings based on training camp reports</p>
                <p className="text-sm text-muted-foreground">• Imported ESPN consensus rankings</p>
                <p className="text-sm text-muted-foreground">• Adjusted rookie WR projections</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Ranking Tools */}
        <TextCard
          title="Ranking Tools"
          description="Manage and customize your rankings"
          icon={<RefreshCw className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Import Rankings</h3>
                  <p className="text-sm text-muted-foreground">From ESPN, Yahoo, or FantasyPros</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Export Rankings</h3>
                  <p className="text-sm text-muted-foreground">Save as CSV or share with league</p>
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Auto-Update</h3>
                  <p className="text-sm text-muted-foreground">Sync with latest consensus</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Custom Scoring</h3>
                  <p className="text-sm text-muted-foreground">Adjust for league settings</p>
                </div>
                <Button variant="outline" size="sm">Setup</Button>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Update Schedule */}
        <TextCard
          title="Update Schedule"
          description="When rankings are refreshed"
          icon={<Calendar className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Next Update</h3>
                <p className="text-sm text-muted-foreground">Tuesday, September 3rd at 8:00 AM</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Update Frequency</h3>
                <p className="text-sm text-muted-foreground">Twice weekly (Tue/Fri)</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Update Sources</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• Injury reports and news</p>
                <p className="text-sm text-muted-foreground">• Expert consensus rankings</p>
                <p className="text-sm text-muted-foreground">• Performance metrics</p>
                <p className="text-sm text-muted-foreground">• Depth chart changes</p>
              </div>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}