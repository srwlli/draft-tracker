'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { Button } from '@/components/ui/button';
import { Crown, Trophy, Users, Target, Check, Star } from 'lucide-react';

export default function SubscriptionsPage() {
  return (
    <AuthPageLayout title="Subscriptions">
      <div className="space-y-6">

        {/* App Overview */}
        <TextCard
          title="Draft Tracker Features"
          description="Real-time fantasy football draft management system"
          icon={<Trophy className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-50/50">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium text-blue-800">My Leagues</h3>
                <p className="text-sm text-blue-600 mt-1">Manage your fantasy leagues and view recent drafts</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50/50">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium text-green-800">My Draft</h3>
                <p className="text-sm text-green-600 mt-1">Create and run real-time drafts with live sync</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50/50">
                <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium text-purple-800">My Picks</h3>
                <p className="text-sm text-purple-600 mt-1">Track draft picks and analyze performance</p>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Pricing Plans */}
        <TextCard
          title="Choose Your Plan"
          description="Unlock premium features for your fantasy football drafts"
          icon={<Crown className="h-5 w-5" />}
        >
          <div className="space-y-6">
            
            {/* Free Plan */}
            <div className="p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Free</h3>
                  <p className="text-muted-foreground">Basic draft management</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">$0</p>
                  <p className="text-sm text-muted-foreground">forever</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Ranks - Custom player rankings</span>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-5 w-5 rounded border-2 border-gray-300"></div>
                  <span className="text-muted-foreground">My Leagues - League management</span>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-5 w-5 rounded border-2 border-gray-300"></div>
                  <span className="text-muted-foreground">My Draft - Real-time drafting</span>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-5 w-5 rounded border-2 border-gray-300"></div>
                  <span className="text-muted-foreground">My Picks - Pick analysis</span>
                </div>
              </div>
              <Button className="w-full" variant="outline" disabled>Current Plan</Button>
            </div>

            {/* Monthly Plan */}
            <div className="p-6 rounded-lg border-2 border-blue-500 bg-blue-50/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-800">Monthly</h3>
                  <p className="text-blue-600">Full access to all features</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-800">$2.99</p>
                  <p className="text-sm text-blue-600">per month</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Ranks - Custom player rankings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Leagues - League management & history</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Draft - Real-time drafting with admin controls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Picks - Pick analysis & performance tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Mobile-optimized interface</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Real-time synchronization across devices</span>
                </div>
              </div>
              <Button className="w-full">Upgrade to Monthly</Button>
            </div>

            {/* Annual Plan */}
            <div className="p-6 rounded-lg border-2 border-green-500 bg-green-50/30 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  BEST VALUE
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-green-800">Annual</h3>
                  <p className="text-green-600">Save $15.88 per year</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-800">$20</p>
                  <p className="text-sm text-green-600">per year</p>
                  <p className="text-xs text-green-500">($1.67/month)</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Ranks - Custom player rankings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Leagues - League management & history</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Draft - Real-time drafting with admin controls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>My Picks - Pick analysis & performance tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Mobile-optimized interface</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Real-time synchronization across devices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Priority support</span>
                </div>
              </div>
              <Button className="w-full" variant="default">Upgrade to Annual</Button>
            </div>

          </div>
        </TextCard>

        {/* Benefits Summary */}
        <TextCard
          title="Why Upgrade?"
          description="Unlock the full potential of your fantasy drafts"
          icon={<Target className="h-5 w-5" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Draft Management</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Create and manage multiple leagues</p>
                <p>• Real-time draft synchronization</p>
                <p>• Admin controls for draft management</p>
                <p>• Mobile-optimized touch interface</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Analytics & Insights</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Track your draft picks and performance</p>
                <p>• Analyze draft trends and patterns</p>
                <p>• View league history and statistics</p>
                <p>• Custom player ranking system</p>
              </div>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}