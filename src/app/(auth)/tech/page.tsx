'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { Code, Database, Cloud, Shield, Zap, Layers } from 'lucide-react';

export default function TechPage() {
  return (
    <AuthPageLayout title="Technology">
      <div className="space-y-6">

        {/* Frontend Stack */}
        <TextCard
          title="Frontend Stack"
          description="Modern web technologies powering the user interface"
          icon={<Code className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Framework</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Next.js 15.5.2</span>
                    <span className="text-xs text-muted-foreground">React Framework</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">React 19.1.0</span>
                    <span className="text-xs text-muted-foreground">UI Library</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">TypeScript 5</span>
                    <span className="text-xs text-muted-foreground">Type Safety</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Styling & UI</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Tailwind CSS 4</span>
                    <span className="text-xs text-muted-foreground">Utility-First CSS</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">shadcn/ui</span>
                    <span className="text-xs text-muted-foreground">Component Library</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Radix UI</span>
                    <span className="text-xs text-muted-foreground">Primitives</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Architecture Features</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• App Router with route groups for authentication</p>
                <p>• Server-side rendering with Turbopack integration</p>
                <p>• Mobile-first responsive design with touch interactions</p>
                <p>• CSS variables theming with dark/light mode support</p>
                <p>• Dynamic routes with [draftId] and [adminToken] parameters</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Backend & Database */}
        <TextCard
          title="Backend & Database"
          description="Robust data management and API infrastructure"
          icon={<Database className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Database</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Supabase</span>
                    <span className="text-xs text-muted-foreground">PostgreSQL Backend</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">PostgreSQL</span>
                    <span className="text-xs text-muted-foreground">Relational Database</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Real-time Features</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">WebSockets</span>
                    <span className="text-xs text-muted-foreground">Live Updates</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Polling Fallback</span>
                    <span className="text-xs text-muted-foreground">Reliability</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Real-time Architecture</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• <strong>Primary:</strong> Supabase real-time subscriptions on draft_picks table</p>
                <p>• <strong>Fallback:</strong> Polling mechanism when real-time fails</p>
                <p>• <strong>Hook Pattern:</strong> useSupabaseRealtime + usePollingFallback</p>
                <p>• <strong>Performance:</strong> Limited to 10 events/second to prevent overwhelming</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Authentication & Security */}
        <TextCard
          title="Authentication & Security"
          description="Secure user management and data protection"
          icon={<Shield className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Authentication</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Supabase Auth</span>
                    <span className="text-xs text-muted-foreground">JWT-based</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Row Level Security</span>
                    <span className="text-xs text-muted-foreground">Data Protection</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Security Features</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Admin Tokens</span>
                    <span className="text-xs text-muted-foreground">Draft Security</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">HTTPS Only</span>
                    <span className="text-xs text-muted-foreground">Encrypted Traffic</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Security Implementation</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• <strong>Server-side validation:</strong> Next.js middleware validates admin tokens</p>
                <p>• <strong>UUID-based tokens:</strong> Cryptographically secure admin access</p>
                <p>• <strong>Row Level Security:</strong> Database-level user isolation</p>
                <p>• <strong>Route protection:</strong> (auth) route groups with middleware</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Development Tools */}
        <TextCard
          title="Development Tools"
          description="Modern tooling for efficient development"
          icon={<Layers className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Language & Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">TypeScript</span>
                    <span className="text-xs text-muted-foreground">Type Safety</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">ESLint</span>
                    <span className="text-xs text-muted-foreground">Code Quality</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">UI Components</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Turbopack</span>
                    <span className="text-xs text-muted-foreground">Build Tool</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Lucide Icons</span>
                    <span className="text-xs text-muted-foreground">Icon Library</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Development Features</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• <strong>Turbopack:</strong> Fast refresh and instant builds</p>
                <p>• <strong>Path aliases:</strong> @/* for clean imports</p>
                <p>• <strong>TypeScript strict mode:</strong> Enhanced type checking</p>
                <p>• <strong>Component generation:</strong> Shadcn CLI for UI components</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Performance & Optimization */}
        <TextCard
          title="Performance & Optimization"
          description="Built for speed and scalability"
          icon={<Zap className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-muted/20">
                <h3 className="text-lg font-bold text-primary">&lt;100ms</h3>
                <p className="text-xs text-muted-foreground">API Response</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20">
                <h3 className="text-lg font-bold text-primary">95+</h3>
                <p className="text-xs text-muted-foreground">Lighthouse Score</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20">
                <h3 className="text-lg font-bold text-primary">&lt;2s</h3>
                <p className="text-xs text-muted-foreground">Page Load</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/20">
                <h3 className="text-lg font-bold text-primary">99.9%</h3>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Mobile-First Optimizations</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• <strong>Touch interactions:</strong> 500ms touch-and-hold with haptic feedback</p>
                <p>• <strong>Real-time reliability:</strong> Dual approach with polling fallback</p>
                <p>• <strong>Mobile UI:</strong> Touch-optimized PlayerTable with long-press</p>
                <p>• <strong>Performance:</strong> Connection pooling and built-in Supabase caching</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Deployment & Infrastructure */}
        <TextCard
          title="Deployment & Infrastructure"
          description="Reliable hosting and continuous deployment"
          icon={<Cloud className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Hosting</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Vercel</span>
                    <span className="text-xs text-muted-foreground">Frontend Hosting</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Global CDN</span>
                    <span className="text-xs text-muted-foreground">Edge Locations</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Backend Services</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Supabase Cloud</span>
                    <span className="text-xs text-muted-foreground">Managed Database</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Edge Functions</span>
                    <span className="text-xs text-muted-foreground">Serverless API</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Deployment Pipeline</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Automatic deployments from Git commits</p>
                <p>• Preview deployments for every pull request</p>
                <p>• Zero-downtime deployments with instant rollback</p>
                <p>• Environment-specific configurations (dev/staging/prod)</p>
              </div>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}