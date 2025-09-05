Vercel CLI 47.0.5
🔍  Inspect: https://vercel.com/teamhart/draft-tracker/56qcbLyw8aDH5iZVgHKt62DeGXJ4 [2s]
✅  Production: https://draft-tracker-43mvdplre-teamhart.vercel.app [2s]
Error: Command "npm run build" exited with 1

2025-09-05T07:36:15.339Z  Running build in Washington, D.C., USA (East) – iad1
2025-09-05T07:36:15.340Z  Build machine configuration: 2 cores, 8 GB
2025-09-05T07:36:15.373Z  Retrieving list of deployment files...
2025-09-05T07:36:15.895Z  Downloading 108 deployment files...
2025-09-05T07:36:18.036Z  Restored build cache from previous deployment (DDzwLivgBrcbmccs3DPvk2ScTX1h)
2025-09-05T07:36:18.600Z  Running "vercel build"
2025-09-05T07:36:18.982Z  Vercel CLI 47.0.5
2025-09-05T07:36:19.322Z  Installing dependencies...
2025-09-05T07:36:20.618Z
2025-09-05T07:36:20.620Z  up to date in 1s
2025-09-05T07:36:20.620Z
2025-09-05T07:36:20.621Z  150 packages are looking for funding
2025-09-05T07:36:20.621Z    run `npm fund` for details
2025-09-05T07:36:20.688Z  Detected Next.js version: 15.5.2
2025-09-05T07:36:20.689Z  Running "npm run build"
2025-09-05T07:36:20.792Z
2025-09-05T07:36:20.792Z  > draft-tracker@0.1.0 build
2025-09-05T07:36:20.792Z  > next build --turbopack
2025-09-05T07:36:20.793Z
2025-09-05T07:36:21.877Z     ▲ Next.js 15.5.2 (Turbopack)
2025-09-05T07:36:21.878Z
2025-09-05T07:36:21.967Z     Creating an optimized production build ...
2025-09-05T07:36:36.041Z   ✓ Finished writing to disk in 29ms
2025-09-05T07:36:36.064Z   ✓ Compiled successfully in 13.4s
2025-09-05T07:36:36.076Z     Linting and checking validity of types ...
2025-09-05T07:36:42.052Z
2025-09-05T07:36:42.052Z  Failed to compile.
2025-09-05T07:36:42.052Z
2025-09-05T07:36:42.052Z  ./src/app/(auth)/dashboard/page.tsx
2025-09-05T07:36:42.052Z  4:10  Warning: 'Input' is defined but never used.  @typescript-eslint/no-unused-vars     
2025-09-05T07:36:42.052Z  9:34  Warning: 'UserPlus' is defined but never used.  @typescript-eslint/no-unused-vars  
2025-09-05T07:36:42.052Z  9:50  Warning: 'Clock' is defined but never used.  @typescript-eslint/no-unused-vars     
2025-09-05T07:36:42.052Z  18:10  Warning: 'isClient' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T07:36:42.052Z
2025-09-05T07:36:42.052Z  ./src/app/(auth)/locks/page.tsx
2025-09-05T07:36:42.054Z  68:52  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
2025-09-05T07:36:42.054Z
2025-09-05T07:36:42.054Z  ./src/app/(auth)/profile/page.tsx
2025-09-05T07:36:42.055Z  3:10  Warning: 'Button' is defined but never used.  @typescript-eslint/no-unused-vars    
2025-09-05T07:36:42.055Z
2025-09-05T07:36:42.055Z  ./src/app/api/drafts/route.ts
2025-09-05T07:36:42.055Z  2:10  Warning: 'createServerSupabaseClient' is defined but never used.  @typescript-eslint/no-unused-vars
2025-09-05T07:36:42.055Z
2025-09-05T07:36:42.055Z  ./src/app/api/user-rankings/route.ts
2025-09-05T07:36:42.055Z  3:10  Warning: 'UserRanking' is defined but never used.  @typescript-eslint/no-unused-vars
2025-09-05T07:36:42.055Z  33:12  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars    
2025-09-05T07:36:42.055Z
2025-09-05T07:36:42.055Z  ./src/app/draft/[draftId]/admin/[adminToken]/page.tsx
2025-09-05T07:36:42.055Z  23:10  Warning: 'draft' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T07:36:42.055Z
2025-09-05T07:36:42.055Z  ./src/app/draft/[draftId]/layout.tsx
2025-09-05T07:36:42.055Z  7:87  Warning: 'draft' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T07:36:42.055Z
2025-09-05T07:36:42.055Z  ./src/components/bottom-tab-bar.tsx
2025-09-05T07:36:42.056Z  12:32  Warning: 'isAdmin' is defined but never used.  @typescript-eslint/no-unused-vars  
2025-09-05T07:36:42.056Z
2025-09-05T07:36:42.056Z  ./src/components/player-rankings.tsx
2025-09-05T07:36:42.057Z  108:3  Warning: 'compact' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T07:36:42.057Z  129:10  Warning: 'isConnected' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T07:36:42.057Z
2025-09-05T07:36:42.057Z  ./src/components/player-table.tsx
2025-09-05T07:36:42.057Z  35:3  Warning: 'onUndraft' is defined but never used.  @typescript-eslint/no-unused-vars 
2025-09-05T07:36:42.057Z
2025-09-05T07:36:42.057Z  ./src/hooks/usePollingFallback.ts
2025-09-05T07:36:42.058Z  20:46  Warning: React Hook useMemo has a missing dependency: 'filter'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
2025-09-05T07:36:42.058Z
2025-09-05T07:36:42.058Z  ./src/hooks/useRealtimeRankings.ts
2025-09-05T07:36:42.058Z  138:6  Warning: React Hook useEffect has a missing dependency: 'fetchRankings'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
2025-09-05T07:36:42.058Z
2025-09-05T07:36:42.058Z  ./src/hooks/useSupabaseRealtime.ts
2025-09-05T07:36:42.059Z  23:46  Warning: React Hook useMemo has a missing dependency: 'filter'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
2025-09-05T07:36:42.059Z
2025-09-05T07:36:42.059Z  ./src/lib/api-auth.ts
2025-09-05T07:36:42.068Z  4:39  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars   
2025-09-05T07:36:42.069Z
2025-09-05T07:36:42.069Z  info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
2025-09-05T07:36:42.096Z  Error: Command "npm run build" exited with 1