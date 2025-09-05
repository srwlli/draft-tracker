# Draft Tracker - Working Plan

## Current Task: Move Draft Creation to Leagues Page

### **Analysis Summary**
**Difficulty: Easy to Moderate** ⭐⭐⭐

### **Current Draft Architecture**
- ✅ **API Layer**: `/api/drafts` POST endpoint for creating drafts
- ✅ **Draft Creation Logic**: In `dashboard/page.tsx` with `createDraft()` function  
- ✅ **UI Components**: `DraftForm` and `ActionCard` components
- ✅ **Draft Flow**: Create → Redirect to admin page `/draft/[id]/admin/[token]`

### **Implementation Plan**

#### Phase 1: Extract and Move Components
1. **Copy Draft Creation Logic** 
   - Move `createDraft()` function from `src/app/(auth)/dashboard/page.tsx` to leagues page
   - Copy required state management (`draftName`, `isLoading`, etc.)

2. **Import Required Components**
   ```typescript
   import { DraftForm } from '@/components/draft-form';
   import { ActionCard } from '@/components/action-card';
   import { api } from '@/lib/api-client';
   import { toast } from 'sonner';
   ```

#### Phase 2: UI Integration
3. **Replace Mock Content**
   - Remove the existing "Create New League" TextCard section (lines 13-45 in leagues page)
   - Replace with functional draft creation using ActionCard component

4. **Style Integration**
   - Ensure new components match leagues page design
   - Maintain TextCard styling consistency for other sections

#### Phase 3: Navigation Updates
5. **Update Dashboard**
   - Remove or modify draft creation from dashboard
   - Update navigation references

### **File Changes Required**

```
📁 src/app/(auth)/leagues/page.tsx
  - Add draft creation imports
  - Add createDraft function 
  - Replace mock "Create New League" section
  - Add state management

📁 src/app/(auth)/dashboard/page.tsx (optional)
  - Remove/update draft creation section
  - Update navigation flows
```

### **Benefits**
- ✅ More logical organization (leagues = drafts)
- ✅ Consolidates fantasy management in one place  
- ✅ Removes redundancy between dashboard and leagues
- ✅ Better user experience flow

### **Time Estimate**
**~30 minutes implementation**

---

## Recently Completed Tasks

### ✅ Fixed Live Functions and Draft Creation Issues
- **Environment Variables**: Added missing Supabase credentials to Vercel deployment
- **Database Schema**: Verified `user_rankings` table structure and constraints
- **RLS Policies**: Confirmed Row Level Security configuration
- **Realtime Sync**: Fixed bidirectional mobile ↔ laptop synchronization
- **API Routes**: Resolved 500 errors in `/api/drafts` and `/api/user-rankings`

### ✅ Supabase CLI Integration
- **Installation**: Added Supabase CLI as dev dependency
- **Authentication**: Set up access token authentication
- **Project Linking**: Attempted project linking (network issues in WSL2)

---

## Known Issues

### ⚠️ Supabase CLI Connection Issues
- **Problem**: WSL2 network timeout connecting to Supabase pooler
- **Status**: Non-blocking - environment variables work fine for API operations
- **Workaround**: Use Supabase dashboard for database management

---

## Next Priority Tasks

1. **Complete Draft Creation Move** (Current)
2. **League Management Features** 
   - Connect real league data to leagues page
   - Remove remaining mock content
3. **User Rankings Enhancement**
   - Improve ranking interface
   - Add bulk ranking operations
4. **Mobile Optimization**
   - Enhance mobile draft experience
   - Improve responsive design

---

*Last Updated: 2025-09-05*