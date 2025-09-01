# Working Plan: Authentication Route Groups Implementation

## Phase 1: Create Authentication Route Group
### 1.1 Setup Authentication Structure
- [ ] Create `/src/app/(auth)/` directory for authenticated routes
- [ ] Create subdirectories: `dashboard/`, `settings/`, `soon/` inside `(auth)`

### 1.2 Create Authentication Layout
- [ ] Create `/src/app/(auth)/layout.tsx` with auth checks and navigation
- [ ] Import AuthContext and DashboardTabBar
- [ ] Add redirect logic for unauthenticated users
- [ ] Structure layout to wrap children with auth validation + navigation

## Phase 2: Migrate Pages from (with-nav) to (auth)
### 2.1 Move Dashboard
- [ ] Move `/src/app/(with-nav)/dashboard/page.tsx` to `/src/app/(auth)/dashboard/page.tsx`
- [ ] Verify page works with new authentication layout

### 2.2 Move Settings  
- [ ] Move `/src/app/(with-nav)/settings/page.tsx` to `/src/app/(auth)/settings/page.tsx`
- [ ] Ensure back button and theme functionality remain intact

### 2.3 Move Coming Soon
- [ ] Move `/src/app/(with-nav)/soon/page.tsx` to `/src/app/(auth)/soon/page.tsx`
- [ ] Verify page works with authentication wrapper

## Phase 3: Cleanup & Draft Admin Protection
### 3.1 Remove Old Route Group
- [ ] Delete `/src/app/(with-nav)/` directory and layout
- [ ] Verify no broken imports or references

### 3.2 Optional: Draft Admin Route Group
- [ ] Create `/src/app/draft/[draftId]/(admin)/` directory
- [ ] Move admin page to `(admin)/[adminToken]/page.tsx`
- [ ] Create admin layout with token validation

## Phase 4: Testing & Validation
### 4.1 Authentication Flow Testing
- [ ] Test unauthenticated users are redirected from `/dashboard`, `/settings`, `/soon`
- [ ] Test authenticated users can access all protected routes
- [ ] Verify navigation works properly with auth checks

### 4.2 Build & Quality Checks
- [ ] Build project to check for TypeScript errors
- [ ] Test on mobile device for responsive behavior
- [ ] Verify no console errors during navigation
- [ ] Test sign out functionality redirects properly

## Final File Structure
```
src/app/
├── layout.tsx                    # Root layout (theme, auth providers)
├── page.tsx                      # Public landing page
├── (auth)/                       # Protected routes group
│   ├── layout.tsx               # Auth check + DashboardTabBar
│   ├── dashboard/page.tsx       # Protected dashboard
│   ├── settings/page.tsx        # Protected settings
│   └── soon/page.tsx           # Protected coming soon
└── draft/[draftId]/            # Public draft access
    ├── layout.tsx              # Draft context + BottomTabBar
    ├── page.tsx                # Public viewer
    └── (admin)/                # Optional: Admin protection
        └── [adminToken]/
            ├── layout.tsx      # Admin token validation
            └── page.tsx        # Protected admin interface
```

## Security Benefits
- **Centralized Auth Checks** - All protected routes validate authentication in one place
- **Automatic Redirects** - Unauthenticated users sent to landing page
- **Clear Access Patterns** - Obvious which routes require authentication
- **Admin Token Validation** - Centralized validation for draft admin access

## Success Criteria
- ✅ Unauthenticated users cannot access dashboard, settings, or soon pages
- ✅ Authenticated users have seamless access to all protected routes
- ✅ Navigation remains consistent with bottom tab bar
- ✅ Draft pages work for both authenticated and unauthenticated users
- ✅ Admin pages validate tokens properly
- ✅ Clean, organized file structure following Next.js best practices

## Implementation Priority
1. **High Priority:** Basic `(auth)` route group with auth checks
2. **Medium Priority:** Draft `(admin)` route group for better organization
3. **Low Priority:** Additional optimizations and refinements