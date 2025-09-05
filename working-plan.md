# Draft Tracker - Working Plan

## Current Task: Consolidate Redundant Navigation Components

### **Issue to Address**
- **Duplicate navigation components** - `BottomTabBar` and `DashboardTabBar` have identical functionality
- **Code duplication** - Same navigation logic maintained in two places
- **Maintenance overhead** - Updates need to be made to both components

### **Redundancy Analysis**

#### **Current Usage:**

**`BottomTabBar`:**
- Used in: `/src/app/draft/[draftId]/layout.tsx` (line 126)
- Takes `isAdmin` prop to conditionally show different behavior
- Used for: Draft pages (viewer and admin)

**`DashboardTabBar`:** 
- Used in: `/src/app/(auth)/layout.tsx` (line 39)
- No props needed
- Used for: All authenticated pages (dashboard, settings, ranks, leagues, etc.)

#### **Key Differences:**
1. **Props:** `BottomTabBar` accepts `isAdmin` prop, `DashboardTabBar` doesn't
2. **Functionality:** Both now have identical navigation items and behavior
3. **Usage Context:** Different layouts use them

### **Implementation Plan**

#### **Step 1: Update Auth Layout**
**File:** `/src/app/(auth)/layout.tsx`

**Current:**
```tsx
<DashboardTabBar />
```

**New:**
```tsx
<BottomTabBar isAdmin={false} />
```

#### **Step 2: Add Import**
**File:** `/src/app/(auth)/layout.tsx`

**Current:**
```tsx
import { DashboardTabBar } from '@/components/dashboard-tab-bar';
```

**New:**
```tsx
import { BottomTabBar } from '@/components/bottom-tab-bar';
```

#### **Step 3: Remove Redundant Component**
**File:** `/src/components/dashboard-tab-bar.tsx`

**Action:** Delete the entire file as it's no longer needed

### **Safe Removal Assessment**

**✅ We CAN safely remove `DashboardTabBar`:**

**Benefits:**
- Eliminates code duplication
- Single source of truth for navigation
- Easier maintenance (only one component to update)

**No Problems Expected:**
- Both components use the same `BaseTabBar` foundation
- Both have identical tab items and navigation logic
- The `isAdmin` prop in `BottomTabBar` appears unused currently (no conditional rendering)

### **Expected Results**
- ✅ **Single navigation component** - Only `BottomTabBar` across entire app
- ✅ **Consistent behavior** - Same navigation on all pages
- ✅ **Reduced maintenance** - Updates only needed in one place
- ✅ **Cleaner codebase** - Less redundant code

### **Time Estimate:** 10 minutes