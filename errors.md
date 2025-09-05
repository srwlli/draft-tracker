> draft-tracker@0.1.0 build
> next build --turbopack

   ▲ Next.js 15.5.2 (Turbopack)
   - Environments: .env.local

   Creating an optimized production build ...
 ⚠ Slow filesystem detected. The benchmark took 147ms. If C:\Users\willh\Desktop\draft-tracker\.next is a network drive, consider moving it to a local folder. If you have an antivirus enabled, consider excluding your project directory.
 ✓ Finished writing to disk in 142ms
 ✓ Compiled successfully in 3.9s

./src/app/(auth)/dashboard/page.tsx
4:10  Warning: 'Input' is defined but never used.  @typescript-eslint/no-unused-vars
9:34  Warning: 'UserPlus' is defined but never used.  @typescript-eslint/no-unused-vars
9:50  Warning: 'Clock' is defined but never used.  @typescript-eslint/no-unused-vars
18:10  Warning: 'isClient' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/app/(auth)/profile/page.tsx
3:10  Warning: 'Button' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/api/drafts/route.ts
2:10  Warning: 'createServerSupabaseClient' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/api/user-rankings/route.ts
3:10  Warning: 'UserRanking' is defined but never used.  @typescript-eslint/no-unused-vars
33:12  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/draft/[draftId]/admin/[adminToken]/page.tsx
23:10  Warning: 'draft' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/app/draft/[draftId]/layout.tsx
7:87  Warning: 'draft' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/components/bottom-tab-bar.tsx
12:32  Warning: 'isAdmin' is defined but never used.  @typescript-eslint/no-unused-vars

./src/components/player-rankings.tsx
108:3  Warning: 'compact' is assigned a value but never used.  @typescript-eslint/no-unused-vars
129:10  Warning: 'isConnected' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/components/player-table.tsx
35:3  Warning: 'onUndraft' is defined but never used.  @typescript-eslint/no-unused-vars

./src/hooks/usePollingFallback.ts
20:46  Warning: React Hook useMemo has a missing dependency: 'filter'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps

./src/hooks/useRealtimeRankings.ts
138:6  Warning: React Hook useEffect has a missing dependency: 'fetchRankings'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps

./src/hooks/useSupabaseRealtime.ts
23:46  Warning: React Hook useMemo has a missing dependency: 'filter'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps

./src/lib/api-auth.ts
4:39  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars

info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
 ✓ Linting and checking validity of types 
 ✓ Collecting page data    
 ✓ Generating static pages (18/18)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                                 Size  First Load JS    
┌ ○ /                                    23.4 kB         201 kB
├ ○ /_not-found                              0 B         168 kB
├ ƒ /api/drafts                              0 B            0 B
├ ƒ /api/drafts/[id]                         0 B            0 B
├ ƒ /api/drafts/[id]/picks                   0 B            0 B
├ ƒ /api/drafts/[id]/picks/[pickId]          0 B            0 B
├ ƒ /api/public/drafts/[id]                  0 B            0 B
├ ƒ /api/user-rankings                       0 B            0 B
├ ○ /dashboard                           3.56 kB         183 kB
├ ƒ /draft/[draftId]                     3.12 kB         197 kB
├ ƒ /draft/[draftId]/admin/[adminToken]  4.51 kB         198 kB
├ ○ /icon.svg                                0 B            0 B
├ ○ /leagues                             3.51 kB         183 kB
├ ○ /locks                               2.69 kB         182 kB
├ ○ /news                                2.51 kB         182 kB
├ ○ /profile                             1.43 kB         181 kB
├ ○ /ranks                               19.1 kB         199 kB
├ ○ /settings                            1.58 kB         181 kB
├ ○ /soon                                1.07 kB         181 kB
├ ○ /subscriptions                       2.87 kB         182 kB
└ ○ /tech                                3.54 kB         183 kB
+ First Load JS shared by all             179 kB
  ├ chunks/2008ffcf9e5b170c.js             13 kB
  ├ chunks/5c947e29225221ed.js             11 kB
  ├ chunks/a69c0e9b8d47f6ae.js             43 kB
  ├ chunks/f901586877f4589f.js           75.4 kB
  ├ chunks/5c294eb392aeb479.css          11.6 kB
  └ other shared chunks (total)          25.3 kB


ƒ Middleware                             72.6 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

PS C:\Users\willh\Desktop\draft-tracker> 