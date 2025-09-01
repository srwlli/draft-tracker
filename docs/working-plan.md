# Working Plan: Route Group Navigation Restructure

## Phase 1: Create Route Group Structure
### 1.1 Setup Folders
- [ ] Create `/src/app/(with-nav)/` directory for route group
- [ ] Create subdirectories: `dashboard/`, `settings/`, `soon/` inside `(with-nav)`

### 1.2 Create Shared Layout
- [ ] Create `/src/app/(with-nav)/layout.tsx` with DashboardTabBar
- [ ] Import necessary dependencies and components
- [ ] Structure layout to wrap children with navigation

## Phase 2: Migrate Pages
### 2.1 Move Dashboard
- [ ] Move `/src/app/dashboard/page.tsx` to `/src/app/(with-nav)/dashboard/page.tsx`
- [ ] Remove DashboardTabBar import and component from dashboard page
- [ ] Update page structure to work with new layout

### 2.2 Move Settings
- [ ] Move `/src/app/settings/page.tsx` to `/src/app/(with-nav)/settings/page.tsx`
- [ ] Add back button component (matching Coming Soon style)
- [ ] Ensure proper spacing for bottom navigation

### 2.3 Move Coming Soon
- [ ] Move `/src/app/soon/page.tsx` to `/src/app/(with-nav)/soon/page.tsx`
- [ ] Verify page works with new layout structure

## Phase 3: Cleanup & Testing
### 3.1 Remove Old Files
- [ ] Delete empty directories after moving pages
- [ ] Verify no broken imports or references

### 3.2 Test Navigation
- [ ] Test all routes still work: `/dashboard`, `/settings`, `/soon`
- [ ] Verify DashboardTabBar appears on all three pages
- [ ] Check back button functionality on Settings page
- [ ] Test navigation between pages using tab bar

## Phase 4: Final Validation
- [ ] Build project to check for TypeScript errors
- [ ] Test on mobile device for responsive behavior
- [ ] Verify no console errors during navigation
- [ ] Ensure consistent styling across all pages

## File Structure (Final)
```
src/app/
├── (with-nav)/
│   ├── layout.tsx          # Shared layout with DashboardTabBar
│   ├── dashboard/
│   │   └── page.tsx       # Dashboard page (no nav component)
│   ├── settings/
│   │   └── page.tsx       # Settings with back button
│   └── soon/
│       └── page.tsx       # Coming Soon page
├── draft/                  # Unchanged - uses its own layout
├── layout.tsx             # Root layout
└── page.tsx               # Landing page

## Success Criteria
- All non-draft pages use shared navigation layout
- No code duplication for navigation components
- Consistent user experience across dashboard, settings, and soon pages
- Clean route organization with Next.js best practices
- Back navigation works properly on settings page