'use client';

import { Button } from '@/components/ui/button';
import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, MapPin, Calendar, Settings, Bell, Shield, Trophy, Users, Target } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <AuthPageLayout title="Profile">
      <div className="space-y-6">
        
        {/* Personal Information */}
        <TextCard
          title="Personal Information"
          description="Your basic account information"
          icon={<User className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Display Name</h3>
                <p className="text-sm text-muted-foreground">Draft Master</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email || 'Not available'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">San Francisco, CA</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Member Since</h3>
                <p className="text-sm text-muted-foreground">August 2024</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Bio</h3>
              <p className="text-sm text-muted-foreground">Fantasy football enthusiast with 10+ years of drafting experience. Always looking for sleeper picks and value players.</p>
            </div>
          </div>
        </TextCard>

        {/* Account Settings */}
        <TextCard
          title="Account Settings"
          description="Manage your security and preferences"
          icon={<Settings className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Privacy Settings</h3>
                <p className="text-sm text-muted-foreground">Control your data visibility</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </TextCard>

        {/* App Preferences */}
        <TextCard
          title="App Preferences"
          description="Customize your Draft Tracker experience"
          icon={<Bell className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Timezone</h3>
                <p className="text-sm text-muted-foreground">Pacific Time (UTC-8)</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Theme</h3>
                <p className="text-sm text-muted-foreground">Dark Mode</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Draft reminders enabled</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Auto-save</h3>
                <p className="text-sm text-muted-foreground">Every 30 seconds</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Fantasy Football Preferences */}
        <TextCard
          title="Fantasy Football Preferences"
          description="Your draft and league preferences"
          icon={<Target className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Favorite Team</h3>
                <p className="text-sm text-muted-foreground">San Francisco 49ers</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Preferred Draft Style</h3>
                <p className="text-sm text-muted-foreground">Snake Draft</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Position Priority</h3>
                <p className="text-sm text-muted-foreground">RB &gt; WR &gt; QB &gt; TE</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Risk Tolerance</h3>
                <p className="text-sm text-muted-foreground">Moderate</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Draft Statistics */}
        <TextCard
          title="Draft Statistics"
          description="Your drafting performance and history"
          icon={<Trophy className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <h3 className="text-2xl font-bold text-primary">12</h3>
                <p className="text-sm text-muted-foreground">Total Drafts</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">8</h3>
                <p className="text-sm text-muted-foreground">Leagues Won</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">67%</h3>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">1,247</h3>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• Completed BBFL 2025 draft - 3rd overall pick</p>
                <p className="text-sm text-muted-foreground">• Won Championship League 2024</p>
                <p className="text-sm text-muted-foreground">• Drafted Lamar Jackson in Round 2</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Connected Accounts */}
        <TextCard
          title="Connected Accounts"
          description="Link your fantasy apps and social accounts"
          icon={<Users className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">ESPN Fantasy</h3>
                <p className="text-sm text-muted-foreground">Connect your ESPN leagues</p>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Yahoo Fantasy</h3>
                <p className="text-sm text-muted-foreground">Sync with Yahoo leagues</p>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">NFL.com Fantasy</h3>
                <p className="text-sm text-muted-foreground">Import NFL league data</p>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}