'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { Button } from '@/components/ui/button';
import { Newspaper, TrendingUp, Users, AlertCircle, Calendar, Star, Trophy, Zap } from 'lucide-react';

export default function NewsPage() {
  return (
    <AuthPageLayout title="News">
      <div className="space-y-6">

        {/* Breaking News */}
        <TextCard
          title="Breaking News"
          description="Latest updates and breaking stories"
          icon={<AlertCircle className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border-l-4 border-red-500 bg-red-50/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-red-800">INJURY UPDATE</h3>
                    <p className="text-sm text-red-700 mt-1">Christian McCaffrey listed as questionable for Week 1</p>
                    <p className="text-xs text-red-600 mt-1">2 hours ago</p>
                  </div>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </div>
              <div className="p-3 rounded-lg border-l-4 border-blue-500 bg-blue-50/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">TRADE NEWS</h3>
                    <p className="text-sm text-blue-700 mt-1">Major WR trade shakes up fantasy rankings</p>
                    <p className="text-xs text-blue-600 mt-1">4 hours ago</p>
                  </div>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Trending Stories */}
        <TextCard
          title="Trending Stories"
          description="Most popular fantasy football news"
          icon={<TrendingUp className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Sleeper Picks for 2025 Fantasy Season</h3>
                  <p className="text-sm text-muted-foreground">15 under-the-radar players who could win your league</p>
                  <p className="text-xs text-muted-foreground mt-1">Fantasy Guru • 1 day ago • 12k views</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Rookie Running Backs to Target</h3>
                  <p className="text-sm text-muted-foreground">Draft analysis of the top rookie RBs this season</p>
                  <p className="text-xs text-muted-foreground mt-1">Draft Expert • 2 days ago • 8.5k views</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Week 1 Start/Sit Recommendations</h3>
                  <p className="text-sm text-muted-foreground">Expert picks for your toughest lineup decisions</p>
                  <p className="text-xs text-muted-foreground mt-1">Start/Sit Pro • 3 hours ago • 6.2k views</p>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Expert Analysis */}
        <TextCard
          title="Expert Analysis"
          description="In-depth fantasy football analysis"
          icon={<Star className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h3 className="text-sm font-medium mb-2">Draft Strategy Guide</h3>
                <p className="text-sm text-muted-foreground mb-3">Complete guide to dominating your 2025 fantasy draft</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Strategy Expert</span>
                  <Button variant="outline" size="sm">Read</Button>
                </div>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="text-sm font-medium mb-2">Positional Rankings</h3>
                <p className="text-sm text-muted-foreground mb-3">Updated rankings for all positions heading into Week 1</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Rankings Team</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Team News */}
        <TextCard
          title="Team News"
          description="Updates from around the NFL"
          icon={<Users className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-muted/20 text-center">
                <h3 className="text-sm font-medium">49ers</h3>
                <p className="text-xs text-muted-foreground mt-1">3 injury updates</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20 text-center">
                <h3 className="text-sm font-medium">Cowboys</h3>
                <p className="text-xs text-muted-foreground mt-1">Depth chart changes</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20 text-center">
                <h3 className="text-sm font-medium">Chiefs</h3>
                <p className="text-xs text-muted-foreground mt-1">Training camp notes</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20 text-center">
                <h3 className="text-sm font-medium">Bills</h3>
                <p className="text-xs text-muted-foreground mt-1">Player updates</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20 text-center">
                <h3 className="text-sm font-medium">Bengals</h3>
                <p className="text-xs text-muted-foreground mt-1">Contract news</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20 text-center">
                <h3 className="text-sm font-medium">Eagles</h3>
                <p className="text-xs text-muted-foreground mt-1">2 roster moves</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">View All Team News</Button>
            </div>
          </div>
        </TextCard>

        {/* Weekly Insights */}
        <TextCard
          title="Weekly Insights"
          description="Key takeaways and trends"
          icon={<Zap className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-green-50/50 border border-green-200">
                <h3 className="text-sm font-medium text-green-800">💡 Insight of the Week</h3>
                <p className="text-sm text-green-700 mt-1">Target WRs on teams with improved offensive lines - they&apos;re being undervalued in drafts</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-sm font-medium mb-2">Rising Stock</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">📈 Breece Hall - Injury recovery ahead of schedule</p>
                    <p className="text-sm text-muted-foreground">📈 DeVonta Smith - Target share increasing</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Falling Stock</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">📉 Ezekiel Elliott - Limited role expected</p>
                    <p className="text-sm text-muted-foreground">📉 Mike Evans - Age concerns rising</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Championship Corner */}
        <TextCard
          title="Championship Corner"
          description="Tips from fantasy champions"
          icon={<Trophy className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">&quot;Draft for ceiling, not floor&quot;</h3>
                    <p className="text-sm text-yellow-700 mt-1">Championship teams are built on breakout players, not safe picks</p>
                    <p className="text-xs text-yellow-600 mt-2">- 2024 Champion, Mike Johnson</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-muted/20">
                  <h3 className="text-lg font-bold text-primary">67%</h3>
                  <p className="text-xs text-muted-foreground">Championship teams that drafted a rookie</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/20">
                  <h3 className="text-lg font-bold text-primary">3.2</h3>
                  <p className="text-xs text-muted-foreground">Avg waiver wire pickups by champions</p>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* News Categories */}
        <TextCard
          title="Browse by Category"
          description="Find news that matters to you"
          icon={<Newspaper className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto py-3 flex flex-col">
                <span className="text-sm font-medium">Injuries</span>
                <span className="text-xs text-muted-foreground">24 updates</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col">
                <span className="text-sm font-medium">Trades</span>
                <span className="text-xs text-muted-foreground">8 stories</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col">
                <span className="text-sm font-medium">Waivers</span>
                <span className="text-xs text-muted-foreground">15 pickups</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col">
                <span className="text-sm font-medium">Rankings</span>
                <span className="text-xs text-muted-foreground">Updated daily</span>
              </Button>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}