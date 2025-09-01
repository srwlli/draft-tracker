'use client';

import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Zap, Users, Share2, BarChart3, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [isClient, setIsClient] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Fantasy Dashboard
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Real-time fantasy football draft tracker optimized for mobile and desktop
        </p>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-3">
              <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
              <CardTitle className="text-base">Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                Real-time draft insights and performance data
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <CardTitle className="text-base">League Management</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                Manage your league and draft settings easily
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-primary" />
              <CardTitle className="text-base">Player Research</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                In-depth player analytics and ranking insights
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <Smartphone className="w-6 h-6 mx-auto mb-2 text-primary" />
              <CardTitle className="text-base">Performance Tracking</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                Track your picks and analyze draft outcomes
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <Settings className="w-6 h-6 mx-auto mb-2 text-primary" />
              <CardTitle className="text-base">Schedule Optimization</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                Smart scheduling tools for your league events
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <Share2 className="w-6 h-6 mx-auto mb-2 text-primary" />
              <CardTitle className="text-base">Trade Analyzer</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                Analyze potential trades with advanced metrics
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Auth Section */}
      <div className="container mx-auto px-4 py-8 md:py-16 pb-24">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Sign up or log in</CardTitle>
              <CardDescription>
                Access your account to create drafts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isClient || loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : user ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">Welcome back!</p>
                  <Button onClick={handleGoToDashboard} size="lg" className="w-full">
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <Auth
                  supabaseClient={supabase}
                  appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: '#333333',
                          brandAccent: '#1a1a1a',
                          brandButtonText: 'white',
                          defaultButtonBackground: '#f3f4f6',
                          defaultButtonBackgroundHover: '#e5e7eb',
                          inputBackground: 'transparent',
                          inputBorder: '#d1d5db',
                          inputBorderHover: '#9ca3af',
                          inputBorderFocus: '#333333',
                        },
                      },
                    },
                    style: {
                      button: {
                        borderRadius: '6px',
                        fontSize: '14px',
                        padding: '10px 16px',
                        fontWeight: '500',
                      },
                      input: {
                        borderRadius: '6px',
                        fontSize: '14px',
                        padding: '10px 12px',
                      },
                    },
                    className: {
                      container: 'w-full',
                      button: 'w-full !bg-gray-900 !text-white hover:!bg-gray-800',
                      input: 'w-full',
                      anchor: 'text-gray-600 hover:text-gray-800 underline',
                      message: 'text-red-600 text-sm',
                      divider: 'text-gray-400',
                    },
                  }}
                  providers={[]}
                  redirectTo="/dashboard"
                  view="sign_in"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          Fantasy Dashboard © 2025
        </div>
      </footer>
    </div>
  );
}