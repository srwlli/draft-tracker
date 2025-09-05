PS C:\Users\willh\Desktop\draft-tracker> vercel --prod
Vercel CLI 47.0.5
🔍  Inspect: https://vercel.com/teamhart/draft-tracker/5YvprmMSFtwJhUkm6pKzkvckFpo2 [2s]
✅  Production: https://draft-tracker-j7eojusck-teamhart.vercel.app [2s]
Error: Command "npm run build" exited with 1

2025-09-05T06:38:22.509Z  Running build in Washington, D.C., USA (East) – iad1
2025-09-05T06:38:22.509Z  Build machine configuration: 2 cores, 8 GB
2025-09-05T06:38:22.523Z  Retrieving list of deployment files...
2025-09-05T06:38:23.202Z  Downloading 108 deployment files...
2025-09-05T06:38:25.574Z  Restored build cache from previous deployment (DDzwLivgBrcbmccs3DPvk2ScTX1h)
2025-09-05T06:38:26.111Z  Running "vercel build"
2025-09-05T06:38:26.524Z  Vercel CLI 47.0.5
2025-09-05T06:38:26.860Z  Installing dependencies...
2025-09-05T06:38:28.222Z
2025-09-05T06:38:28.223Z  up to date in 1s
2025-09-05T06:38:28.224Z
2025-09-05T06:38:28.224Z  150 packages are looking for funding
2025-09-05T06:38:28.226Z    run `npm fund` for details
2025-09-05T06:38:28.254Z  Detected Next.js version: 15.5.2
2025-09-05T06:38:28.258Z  Running "npm run build"
2025-09-05T06:38:28.368Z
2025-09-05T06:38:28.368Z  > draft-tracker@0.1.0 build
2025-09-05T06:38:28.369Z  > next build --turbopack
2025-09-05T06:38:28.369Z
2025-09-05T06:38:29.449Z     ▲ Next.js 15.5.2 (Turbopack)
2025-09-05T06:38:29.451Z
2025-09-05T06:38:29.540Z     Creating an optimized production build ...
2025-09-05T06:38:43.862Z   ✓ Finished writing to disk in 31ms
2025-09-05T06:38:43.894Z   ✓ Compiled successfully in 13.6s
2025-09-05T06:38:43.907Z     Linting and checking validity of types ...
2025-09-05T06:38:50.559Z
2025-09-05T06:38:50.568Z  Failed to compile.
2025-09-05T06:38:50.569Z
2025-09-05T06:38:50.569Z  ./src/app/(auth)/dashboard/page.tsx
2025-09-05T06:38:50.569Z  4:10  Warning: 'Input' is defined but never used.  @typescript-eslint/no-unused-vars     
2025-09-05T06:38:50.569Z  9:34  Warning: 'UserPlus' is defined but never used.  @typescript-eslint/no-unused-vars  
2025-09-05T06:38:50.569Z  9:50  Warning: 'Clock' is defined but never used.  @typescript-eslint/no-unused-vars     
2025-09-05T06:38:50.569Z  18:10  Warning: 'isClient' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T06:38:50.569Z
2025-09-05T06:38:50.569Z  ./src/app/(auth)/locks/page.tsx
2025-09-05T06:38:50.569Z  68:52  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
2025-09-05T06:38:50.569Z
2025-09-05T06:38:50.569Z  ./src/app/(auth)/profile/page.tsx
2025-09-05T06:38:50.569Z  3:10  Warning: 'Button' is defined but never used.  @typescript-eslint/no-unused-vars    
2025-09-05T06:38:50.569Z
2025-09-05T06:38:50.569Z  ./src/app/api/drafts/route.ts
2025-09-05T06:38:50.569Z  2:10  Warning: 'createServerSupabaseClient' is defined but never used.  @typescript-eslint/no-unused-vars
2025-09-05T06:38:50.569Z
2025-09-05T06:38:50.569Z  ./src/app/api/user-rankings/route.ts
2025-09-05T06:38:50.569Z  3:10  Warning: 'UserRanking' is defined but never used.  @typescript-eslint/no-unused-vars
2025-09-05T06:38:50.569Z  33:12  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars    
2025-09-05T06:38:50.569Z
2025-09-05T06:38:50.569Z  ./src/app/draft/[draftId]/admin/[adminToken]/page.tsx
2025-09-05T06:38:50.569Z  23:10  Warning: 'draft' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T06:38:50.570Z
2025-09-05T06:38:50.570Z  ./src/app/draft/[draftId]/layout.tsx
2025-09-05T06:38:50.570Z  7:87  Warning: 'draft' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T06:38:50.570Z
2025-09-05T06:38:50.570Z  ./src/components/bottom-tab-bar.tsx
2025-09-05T06:38:50.571Z  12:32  Warning: 'isAdmin' is defined but never used.  @typescript-eslint/no-unused-vars  
2025-09-05T06:38:50.571Z
2025-09-05T06:38:50.571Z  ./src/components/player-rankings.tsx
2025-09-05T06:38:50.571Z  108:3  Warning: 'compact' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T06:38:50.571Z  129:10  Warning: 'isConnected' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2025-09-05T06:38:50.571Z
2025-09-05T06:38:50.571Z  ./src/components/player-table.tsx
2025-09-05T06:38:50.571Z  35:3  Warning: 'onUndraft' is defined but never used.  @typescript-eslint/no-unused-vars 
2025-09-05T06:38:50.571Z
2025-09-05T06:38:50.571Z  ./src/hooks/usePollingFallback.ts
2025-09-05T06:38:50.571Z  20:46  Warning: React Hook useMemo has a missing dependency: 'filter'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
2025-09-05T06:38:50.572Z
2025-09-05T06:38:50.572Z  ./src/hooks/useRealtimeRankings.ts
2025-09-05T06:38:50.572Z  138:6  Warning: React Hook useEffect has a missing dependency: 'fetchRankings'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
2025-09-05T06:38:50.572Z
2025-09-05T06:38:50.572Z  ./src/hooks/useSupabaseRealtime.ts
2025-09-05T06:38:50.572Z  23:46  Warning: React Hook useMemo has a missing dependency: 'filter'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
2025-09-05T06:38:50.572Z
2025-09-05T06:38:50.572Z  ./src/lib/api-auth.ts
2025-09-05T06:38:50.579Z  4:39  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars   
2025-09-05T06:38:50.580Z
2025-09-05T06:38:50.583Z  info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
2025-09-05T06:38:50.605Z  Error: Command "npm run build" exited with 1
PS C:\Users\willh\Desktop\draft-tracker> 