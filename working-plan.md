# Draft Tracker - Working Plan

## Current Task: Replace "Saving..." with Green Light Icon

### **Issue to Address**
- **DEF tab wraps to second row** on mobile due to "Saving..." text taking too much space
- **Need smaller saving indicator** to prevent position tabs from stacking

### **Implementation Plan**

#### **Step 1: Add Icon Import**
**File:** `src/components/player-rankings.tsx`

**Action:**
- Add `Circle` to existing imports from `lucide-react`

**Current:**
```tsx
import { GripVertical } from 'lucide-react';
```

**New:**
```tsx
import { GripVertical, Circle } from 'lucide-react';
```

#### **Step 2: Replace "Saving..." Text with Green Icon**
**File:** `src/components/player-rankings.tsx`

**Current Structure:**
```tsx
<div className="w-20 text-right">
  {saving && (
    <span className="text-sm text-muted-foreground">
      Saving...
    </span>
  )}
</div>
```

**New Structure:**
```tsx
<div className="w-6 flex justify-end">
  {saving && (
    <Circle className="h-4 w-4 text-green-500 fill-current animate-pulse" />
  )}
</div>
```

### **Key Changes**
1. **Smaller container** - `w-20` → `w-6` saves significant horizontal space
2. **Icon instead of text** - Much more compact visual feedback
3. **Green pulsing dot** - Clear saving state with modern UX pattern
4. **Flexbox alignment** - `flex justify-end` for proper icon positioning

### **Benefits**
- ✅ **Prevents mobile tab wrapping** - DEF tab stays on same row
- ✅ **Space efficient** - Saves ~3.5rem width (`w-20` vs `w-6`)
- ✅ **Clear visual feedback** - Green pulsing dot indicates saving
- ✅ **Modern UX pattern** - Icon-based status indicators

### **Time Estimate:** 5 minutes