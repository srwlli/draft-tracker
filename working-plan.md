# Production Build Fix Plan - Precise ESLint Error Resolution

## 🚨 **Critical Error (Build Blocker)**
**File**: `src/app/(auth)/locks/page.tsx:68:52`
**Error**: `react/no-unescaped-entities` - Apostrophe needs escaping
**Fix**: Change `you're` to `you&apos;re`

## ⚠️ **Unused Variable Warnings (Safe to Fix)**

### **1. Dashboard Page** - `src/app/(auth)/dashboard/page.tsx`
**✅ VERIFIED SAFE TO REMOVE:**
- Remove unused import: `Input` (line 4) - Not used anywhere in component
- Remove unused imports from lucide-react: `UserPlus`, `Clock` (line 9) - Not used in any JSX
- Remove unused state: `isClient` variable and useEffect (lines 18, 22-24) - Set but never read

**✅ CONFIRMED IN USE (KEEP):**
- `Button` - Used on line 60 for Sign Out
- `Plus`, `BarChart3`, `Users`, `User`, `Newspaper`, `Code`, `CreditCard` - All used for ActionCard icons

### **2. Profile Page** - `src/app/(auth)/profile/page.tsx`  
- Remove unused import: `Button` (line 3)

### **3. API Routes**
- `src/app/api/drafts/route.ts`: Remove unused `createServerSupabaseClient` import (line 2)
- `src/app/api/user-rankings/route.ts`: Remove unused `UserRanking` import (line 3) and `error` variable (line 33)

### **4. Draft Pages**
- `src/app/draft/[draftId]/admin/[adminToken]/page.tsx`: Remove unused `draft` variable (line 23)
- `src/app/draft/[draftId]/layout.tsx`: Remove unused `draft` assignment (line 7)

### **5. Components** 
- `src/components/bottom-tab-bar.tsx`: Mark `isAdmin` param as used with underscore `_isAdmin` (line 12)
- `src/components/player-rankings.tsx`: Remove unused `compact` parameter (line 108) and `isConnected` state (line 129)
- `src/lib/api-auth.ts`: Mark unused `request` param with underscore `_request` (line 4)

## 🔴 **CRITICAL: DO NOT TOUCH**
**`src/components/player-table.tsx:35` - `onUndraft` warning**
- **DO NOT REMOVE** - This is the undraft feature for admin error correction
- This warning is acceptable - the prop is used by parent components
- Leave this warning as-is to preserve functionality

## 📋 **Phase 2 Status: PENDING REVIEW**
**Dashboard Page Analysis Complete:** ✅ Verified 4 items safe to remove, 8 items confirmed in use
**Next:** Need to review remaining files before executing Phase 2 cleanup

## ⚠️ **React Hooks Dependencies (Medium Risk)**
**Note**: These could affect runtime behavior, approach carefully:

### **Files to Fix:**
1. `src/hooks/usePollingFallback.ts:20` - Add `filter` to useMemo dependencies
2. `src/hooks/useRealtimeRankings.ts:138` - Add `fetchRankings` to useEffect dependencies  
3. `src/hooks/useSupabaseRealtime.ts:23` - Add `filter` to useMemo dependencies

## 🎯 **Execution Strategy**

### **Phase 1: Fix Critical Error (REQUIRED)**
- Fix apostrophe in locks page
- Test build passes

### **Phase 2: Clean Safe Unused Variables**
- Remove unused imports and variables
- Mark used-but-flagged params with underscores
- **SKIP** the onUndraft warning entirely

### **Phase 3: Fix React Hooks (Optional)**
- Only if Phase 1-2 aren't sufficient
- Test thoroughly for side effects

## 📋 **Expected Results**
- ✅ Build passes (critical error fixed)
- ✅ Cleaner codebase (unused code removed)
- ✅ Undraft functionality preserved
- ⚠️ 1 acceptable warning remains (onUndraft)

## 🛡️ **Safety Notes**
- The `onUndraft` prop IS used by parent components for admin draft correction
- This is intentional functionality that must be preserved
- ESLint doesn't detect usage across component boundaries
- Better to have 1 warning than break admin functionality