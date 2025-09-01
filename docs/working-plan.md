# Working Plan: Dashboard Navigation Implementation

## Phase 1: Refactor Base Infrastructure ⚙️
### 1.1 Extract Base Component
- [ ] Create `BaseTabBar` component in `/src/components/base-tab-bar.tsx`
- [ ] Extract shared styling/layout structure from existing `BottomTabBar`
- [ ] Accept navigation items as props following UI primitives → Business components pattern
- [ ] Add TypeScript interfaces for navigation item props

### 1.2 Refactor Existing Component
- [ ] Update `BottomTabBar` to use `BaseTabBar` with draft-specific items
- [ ] Maintain existing Share functionality for admin users
- [ ] Test draft page functionality remains intact
- [ ] Verify no regressions in existing navigation

## Phase 2: Dashboard Navigation 📱
### 2.1 Create Dashboard Component
- [ ] Create `DashboardTabBar` in `/src/components/dashboard-tab-bar.tsx`
- [ ] Use `BaseTabBar` with dashboard-specific navigation items
- [ ] Replace Share button with Soon button for dashboard context

### 2.2 Update Soon Button Logic
- [ ] Update all "Soon" buttons to navigate to `/soon` page (page created ✅)
- [ ] Remove `opacity-50 cursor-not-allowed` styling from Soon buttons
- [ ] Add proper hover states and transitions
- [ ] Test navigation flow to Coming Soon page

## Phase 3: Integration & Error Handling 🔌
### 3.1 Add to Dashboard Layout
- [ ] Import `DashboardTabBar` in dashboard page
- [ ] Add component to dashboard layout with proper positioning
- [ ] Ensure z-index doesn't conflict with existing elements

### 3.2 Add Error Boundaries
- [ ] Consider adding ErrorBoundary for navigation components
- [ ] Handle edge cases in navigation state
- [ ] Test error scenarios gracefully

## Phase 4: Testing & Validation ✅
### 4.1 Navigation Testing
- [ ] Test all navigation paths work correctly
- [ ] Verify Next.js router navigation (no window.location.href usage)
- [ ] Test mobile back button behavior with proper cleanup

### 4.2 Performance & Quality
- [ ] Verify no polling/subscription errors on navigation
- [ ] Check responsive behavior on mobile/desktop
- [ ] Run lint/typecheck commands to ensure code quality
- [ ] Test route transitions are smooth

## Final Navigation Structure
```
Draft Pages:  Home | Share | Soon | Soon | Settings
Dashboard:    Home | Soon  | Soon | Soon | Settings
```

## Refactoring Benefits
- **Reduced code duplication** - Shared navigation layout structure
- **Better maintainability** - Single source of truth for navigation styling
- **Improved reusability** - BaseTabBar can be used for future navigation needs
- **Consistent UX** - Same visual design across all pages

## Success Criteria
- ✅ No code duplication between navigation components
- ✅ Consistent 5-column grid layout maintained
- ✅ All Soon buttons navigate to functional Coming Soon page
- ✅ No navigation-related console errors
- ✅ Mobile navigation works properly with Next.js router
- ✅ Code passes lint/typecheck validation