'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { Lock, Users, Target, Share, Zap, Trophy } from 'lucide-react';

export default function LocksPage() {
  return (
    <AuthPageLayout title="My Locks">
      <div className="space-y-6">

        {/* Feature Overview */}
        <TextCard
          title="My Locks"
          description="Pick players and props, share with friends or use as reference"
          icon={<Lock className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="text-center p-6 rounded-lg bg-muted/20">
              <Lock className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Lock In Your Picks</h3>
              <p className="text-sm text-muted-foreground">
                Create lock lists for player props and share with your group or use as personal reference for prop betting
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/20">
                <Target className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-medium">Pick Props</h4>
                <p className="text-xs text-muted-foreground mt-1">Select player props and lock in your picks</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/20">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-medium">Group Locks</h4>
                <p className="text-xs text-muted-foreground mt-1">Create rooms and invite friends to submit locks</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/20">
                <Share className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-medium">Share & Track</h4>
                <p className="text-xs text-muted-foreground mt-1">Share your locks or use as betting reference</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* How It Works */}
        <TextCard
          title="How It Works"
          description="Simple process to create and manage your lock picks"
          icon={<Zap className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Single User</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <p>Create your personal lock list</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <p>Select players and props you're confident in</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <p>Use as reference for prop betting</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Group Locks</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <p>Create a lock room and invite friends</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <p>Everyone submits their lock picks</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <p>Compare picks and track performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Use Cases */}
        <TextCard
          title="Perfect For"
          description="Various ways to use My Locks feature"
          icon={<Target className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Personal Reference</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Keep track of your confident picks and use them as reference for prop betting decisions
                </p>
                <div className="text-xs text-muted-foreground">
                  • Player performance props
                  • Game outcome predictions  
                  • Statistical milestones
                </div>
              </div>
              
              <div className="p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Group Competitions</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create friendly competitions with friends to see who has the best lock picks
                </p>
                <div className="text-xs text-muted-foreground">
                  • Weekly prop competitions
                  • Season-long tracking
                  • Performance leaderboards
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Coming Soon */}
        <TextCard
          title="Coming Soon"
          description="This feature is currently in development"
          icon={<Trophy className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="text-center p-6 rounded-lg bg-muted/20 border">
              <Trophy className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Feature In Development</h3>
              <p className="text-sm text-muted-foreground mb-4">
                My Locks is currently being developed and will be available soon. This feature will use the same 
                real-time technology as our draft system to provide seamless group collaboration.
              </p>
              <div className="inline-flex items-center text-xs bg-muted px-3 py-1 rounded-full">
                Expected Release: Coming Soon
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm">Real-time Sync</h4>
                <p className="text-xs text-muted-foreground mt-1">Live updates across all devices</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm">Mobile Optimized</h4>
                <p className="text-xs text-muted-foreground mt-1">Touch-friendly interface</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm">Easy Sharing</h4>
                <p className="text-xs text-muted-foreground mt-1">Simple link sharing system</p>
              </div>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}