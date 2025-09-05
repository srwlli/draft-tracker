'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { Button } from '@/components/ui/button';
import { CreateDraft } from '@/components/create-draft';
import { Users, Trophy, Plus, Calendar, Settings, Link2, BarChart3, Crown } from 'lucide-react';

export default function MyLeaguesPage() {
  return (
    <AuthPageLayout title="My Leagues">
      <div className="space-y-6">

        {/* Create New Draft */}
        <CreateDraft 
          title="Create New Draft"
          description="Start a new fantasy football draft session"
        />

        {/* Create New League */}
        <TextCard
          title="Create New League"
          description="Start your own fantasy football league"
          icon={<Plus className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">League Type</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Standard Scoring
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    PPR (Points Per Reception)
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">League Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">8 Teams</Button>
                  <Button variant="outline" size="sm">10 Teams</Button>
                  <Button variant="outline" size="sm">12 Teams</Button>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button className="w-full">Create League</Button>
            </div>
          </div>
        </TextCard>

        {/* My Active Leagues */}
        <TextCard
          title="My Active Leagues"
          description="Your current fantasy leagues"
          icon={<Users className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <h3 className="text-sm font-medium">Championship League 2025</h3>
                  <p className="text-sm text-muted-foreground">12 teams • PPR • Draft: Sep 5th</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <h3 className="text-sm font-medium">Friends & Family League</h3>
                  <p className="text-sm text-muted-foreground">10 teams • Standard • Draft: Sep 3rd</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Commissioner</span>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <h3 className="text-sm font-medium">Office League 2025</h3>
                  <p className="text-sm text-muted-foreground">8 teams • PPR • Draft: Aug 30th</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Drafted</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* League Performance */}
        <TextCard
          title="League Performance"
          description="Your performance across all leagues"
          icon={<Trophy className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <h3 className="text-2xl font-bold text-primary">3</h3>
                <p className="text-sm text-muted-foreground">Active Leagues</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">2</h3>
                <p className="text-sm text-muted-foreground">Championships</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">8-4</h3>
                <p className="text-sm text-muted-foreground">Overall Record</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">1,847</h3>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Recent Achievements</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">🏆 Won Championship League 2024</p>
                <p className="text-sm text-muted-foreground">🥇 Highest scoring week in Office League</p>
                <p className="text-sm text-muted-foreground">⚡ 5-game winning streak in Friends League</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* League Settings & Tools */}
        <TextCard
          title="League Settings & Tools"
          description="Manage your league preferences"
          icon={<Settings className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Default Scoring</h3>
                  <p className="text-sm text-muted-foreground">PPR with bonus settings</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Draft Settings</h3>
                  <p className="text-sm text-muted-foreground">Snake draft, 90 sec timer</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Draft reminders enabled</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">League Templates</h3>
                  <p className="text-sm text-muted-foreground">Save common settings</p>
                </div>
                <Button variant="outline" size="sm">Create</Button>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Connected Platforms */}
        <TextCard
          title="Connected Platforms"
          description="Link with your favorite fantasy apps"
          icon={<Link2 className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-red-700">ESPN</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">ESPN Fantasy</h3>
                    <p className="text-sm text-muted-foreground">Import leagues and sync data</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-700">Y!</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Yahoo Fantasy</h3>
                    <p className="text-sm text-muted-foreground">Sync with Yahoo leagues</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">NFL</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">NFL.com Fantasy</h3>
                    <p className="text-sm text-muted-foreground">Connect NFL league data</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
          </div>
        </TextCard>

        {/* League Analytics */}
        <TextCard
          title="League Analytics"
          description="Insights and trends across your leagues"
          icon={<BarChart3 className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-2xl font-bold text-primary">73%</h3>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">124.8</h3>
                <p className="text-sm text-muted-foreground">Avg Points/Week</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">15</h3>
                <p className="text-sm text-muted-foreground">Years Playing</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Draft Analysis</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• Best draft position: 3rd overall (67% win rate)</p>
                <p className="text-sm text-muted-foreground">• Favorite first pick: Running backs (78% success)</p>
                <p className="text-sm text-muted-foreground">• Most successful strategy: RB-RB start</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Upcoming Events */}
        <TextCard
          title="Upcoming Events"
          description="Important dates and deadlines"
          icon={<Calendar className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <h3 className="text-sm font-medium">Friends & Family Draft</h3>
                  <p className="text-sm text-muted-foreground">Tuesday, September 3rd at 8:00 PM</p>
                </div>
                <Button variant="outline" size="sm">Join Draft</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <h3 className="text-sm font-medium">Championship League Draft</h3>
                  <p className="text-sm text-muted-foreground">Thursday, September 5th at 7:30 PM</p>
                </div>
                <Button variant="outline" size="sm">Set Reminder</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <h3 className="text-sm font-medium">Trade Deadline</h3>
                  <p className="text-sm text-muted-foreground">November 15th - All leagues</p>
                </div>
                <Button variant="outline" size="sm" disabled>Noted</Button>
              </div>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}