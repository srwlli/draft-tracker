# Draft Tracker - Production Build Fix Plan

## Overview: Critical Production Build Failure
**Current Status**: Build failing on Vercel due to ESLint errors and warnings
**Target**: Clean production deployment with zero build errors

---

## Phase 1: Critical Error Fix ⚠️ **RISK: 2/10**
**Must complete before proceeding - Build currently fails**

### Issue
- **File**: `src/app/(auth)/locks/page.tsx:68:52` 
- **Error**: `react/no-unescaped-entities` - Apostrophe needs escaping
- **Impact**: Prevents production build from completing

### Action
```jsx
// Find and fix unescaped apostrophe around line 68
// Change: can't 
// To: can&apos;t or can&#39;t
```

### Time Estimate: 2 minutes
### Risk Level: 2/10 (Simple text fix, very low risk)

---

## Phase 2: Clean Unused Imports ⚠️ **RISK: 3/10**
**Low risk - removing dead code**

### Files to Clean:
1. **`src/app/(auth)/dashboard/page.tsx`** - Remove unused: `Input`, `UserPlus`, `Clock`, `isClient`
2. **`src/app/(auth)/profile/page.tsx`** - Remove unused: `Button`
3. **`src/app/api/drafts/route.ts`** - Remove unused: `createServerSupabaseClient`
4. **`src/app/api/user-rankings/route.ts`** - Remove unused: `UserRanking`, unused `error` variable
5. **`src/components/bottom-tab-bar.tsx`** - Remove unused: `isAdmin` prop
6. **`src/components/player-rankings.tsx`** - Remove unused: `compact`, `isConnected`
7. **`src/components/player-table.tsx`** - Remove unused: `onUndraft` prop
8. **`src/lib/api-auth.ts`** - Remove unused: `request` parameter

### Time Estimate: 15 minutes
### Risk Level: 3/10 (Dead code removal - safe but needs verification)

---

## Phase 3: Fix React Hooks Dependencies ⚠️ **RISK: 6/10** 
**Medium risk - affects runtime behavior**

### Files to Fix:
1. **`src/hooks/usePollingFallback.ts:20`** - Add `filter` to useMemo dependencies
2. **`src/hooks/useRealtimeRankings.ts:138`** - Add `fetchRankings` to useEffect dependencies  
3. **`src/hooks/useSupabaseRealtime.ts:23`** - Add `filter` to useMemo dependencies

### Considerations:
- **Risk**: Missing dependencies can cause stale closures and unexpected behavior
- **Testing Required**: Real-time functionality, polling fallback, rankings updates
- **Potential Issues**: May trigger more re-renders, could affect performance

### Time Estimate: 20 minutes
### Risk Level: 6/10 (Hooks dependencies affect runtime - needs careful testing)

---

## Phase 4: Clean Unused Variables ⚠️ **RISK: 4/10**
**Low-medium risk - removing unused assignments**

### Files to Fix:
1. **`src/app/draft/[draftId]/admin/[adminToken]/page.tsx:23`** - Remove unused `draft` variable
2. **`src/app/draft/[draftId]/layout.tsx:7`** - Remove unused `draft` assignment

### Considerations:
- Variables might be used for debugging
- Could indicate incomplete features
- Review context before removing

### Time Estimate: 10 minutes  
### Risk Level: 4/10 (Could remove debugging aids, minimal functional risk)

---

## Phase 5: Build Verification & Testing ⚠️ **RISK: 5/10**
**Critical validation phase**

### Local Testing:
1. **Run build locally**: `npm run build`
2. **Test all fixed functionality**:
   - Locks page renders correctly
   - Real-time rankings work
   - Polling fallback functions
   - Draft pages load properly
3. **Verify no regressions**

### Production Testing:
1. **Deploy to Vercel**: `vercel --prod`
2. **Smoke test critical paths**:
   - My Ranks functionality
   - Draft creation/joining
   - Real-time updates
   - Navigation between pages

### Time Estimate: 15 minutes
### Risk Level: 5/10 (Validation phase - may discover hidden issues)

---

## Total Time Estimate: ~62 minutes
## Overall Risk Assessment: 4/10

### Risk Mitigation:
- **Phase 1**: Must-fix, very safe
- **Phase 2**: Safe dead code removal 
- **Phase 3**: Highest risk - test thoroughly
- **Phase 4**: Review context before removing
- **Phase 5**: Comprehensive testing required

### Success Criteria:
- ✅ `npm run build` completes without errors
- ✅ `vercel --prod` deploys successfully  
- ✅ No functional regressions
- ✅ All real-time features working
- ✅ Navigation and core features intact

### Rollback Plan:
- Git commit after each phase
- Can revert individual phases if issues arise
- Keep original error log for reference