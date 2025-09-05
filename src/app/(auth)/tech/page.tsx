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
                    <span className="text-sm">Tailwind CSS</span>
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
                <p>• App Router with (auth) route groups for protected pages</p>
                <p>• Server-side rendering with optimistic updates</p>
                <p>• Mobile-first design with touch-and-hold drafting (500ms)</p>
                <p>• Real-time synchronization with WebSocket + polling fallback</p>
                <p>• Dynamic routes: /draft/[draftId]/admin/[adminToken]</p>
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
                <p>• <strong>Primary:</strong> Supabase WebSocket subscriptions with filter-based updates</p>
                <p>• <strong>Fallback:</strong> 5-second polling when real-time connection fails</p>
                <p>• <strong>Optimization:</strong> 100ms throttling + deduplication prevents duplicates</p>
                <p>• <strong>Hooks:</strong> useSupabaseRealtime + usePollingFallback pattern</p>
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
                <p>• <strong>Admin tokens:</strong> UUID-based with draft ownership validation</p>
                <p>• <strong>Middleware protection:</strong> Server-side route validation before rendering</p>
                <p>• <strong>Security headers:</strong> CSP, XSS protection, frame denial</p>
                <p>• <strong>Input validation:</strong> Zod schemas on all API endpoints</p>
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
                <p>• <strong>Type-first development:</strong> TypeScript interfaces define API contracts</p>
                <p>• <strong>Custom hooks:</strong> Reusable real-time and API patterns</p>
                <p>• <strong>Component co-location:</strong> Centralized exports through barrel pattern</p>
                <p>• <strong>API client:</strong> Centralized error handling with type safety</p>
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
              <h3 className="text-sm font-medium mb-2">Performance Optimizations</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• <strong>Optimistic updates:</strong> Immediate UI feedback with server confirmation</p>
                <p>• <strong>Memoized callbacks:</strong> Prevents subscription cycling in useEffect</p>
                <p>• <strong>Race condition prevention:</strong> Disabled states during API calls</p>
                <p>• <strong>Connection deduplication:</strong> Single WebSocket per client with pooling</p>
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