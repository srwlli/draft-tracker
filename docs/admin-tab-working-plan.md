# Admin Tab Working Plan

## Objective
Replace the "Share" tab in BottomTabBar with an "Admin" tab and create an admin page with ActionCard components for share functionality.

## Current State Analysis
- BottomTabBar has Share tab with complex overlay logic for admin/viewer link sharing
- Share functionality uses inline overlay with clipboard operations
- Current share logic is tightly coupled to BottomTabBar component

## Implementation Plan

### Phase 1: Create Admin Page
1. Create `/src/app/(auth)/admin/page.tsx` with same styling pattern as Settings/Ranks/Leagues pages
2. Add back button header with ArrowLeft icon 
3. Use "Admin" as page title
4. Create two ActionCard components:
   - "Copy Viewer Link" ActionCard with Link icon
   - "Copy Admin Link" ActionCard with Shield icon
5. Implement clipboard functionality in ActionCard onButtonClick handlers

### Phase 2: Update BottomTabBar
1. Replace Share tab with Admin tab in BottomTabBar
2. Update tab configuration to use Shield icon for Admin
3. Remove share overlay state management (`activeTab`, `setActiveTab`)
4. Remove overlay logic and share menu rendering
5. Add admin navigation handler that routes to `/admin`
6. Make Admin tab visible only for admin users (`isAdmin` prop check)

### Phase 3: Update DashboardTabBar  
1. Add Admin tab to DashboardTabBar for consistency
2. Use Shield icon and "Admin" label
3. Route to `/admin` page

## Technical Details

### ActionCard Implementation
```typescript
// Viewer Link ActionCard
<ActionCard
  icon={<Link className="h-5 w-5" />}
  title="Copy Viewer Link"
  description="Share read-only access to this draft"
  buttonText="Copy Link"
  onButtonClick={handleCopyViewerLink}
/>

// Admin Link ActionCard  
<ActionCard
  icon={<Shield className="h-5 w-5" />}
  title="Copy Admin Link"
  description="Share admin access to this draft"
  buttonText="Copy Link"
  onButtonClick={handleCopyAdminLink}
/>
```

### Navigation Update
```typescript
// Replace in BottomTabBar
{
  id: 'admin',
  icon: <Shield size={20} />,
  label: 'Admin', 
  onClick: () => router.push('/admin'),
  isDisabled: !isAdmin  // Only show for admin users
}
```

## Benefits
- Cleaner BottomTabBar without complex overlay logic
- Consistent page styling across all auth pages
- Reusable ActionCard components for share functionality
- Better UX with dedicated admin page instead of overlay menu
- Follows established design patterns

## Files to Modify
- `/src/app/(auth)/admin/page.tsx` (create)
- `/src/components/bottom-tab-bar.tsx` (update)
- `/src/components/dashboard-tab-bar.tsx` (update)

## Dependencies
- Existing ActionCard component
- Shield icon from lucide-react
- Link icon from lucide-react
- Clipboard utility functions
- Toast notifications for user feedback