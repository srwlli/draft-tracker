# Changelog - Fantasy Draft Tracker

## [2025-09-01] - Navigation & Infrastructure Updates

### Features
- **Coming Soon Page** - Created placeholder page for future features navigation
- **Navigation Refactoring** - Extracted reusable BaseTabBar component for consistent navigation across app
- **Dashboard Navigation** - Added bottom navigation bar to dashboard matching draft page style

### Refactoring  
- **Route Groups Implementation** (`114a507`) - Implemented Next.js route groups for consistent navigation across non-draft pages
- **Navigation Components** - Refactored BottomTabBar to use BaseTabBar with props-based navigation items
- **TypeScript Interfaces** - Added proper typing for navigation tab items and component props
- **Code Reusability** - Eliminated duplication between dashboard and draft navigation components

### Fixes
- **Mobile Navigation Error** (`411fd10`) - Fixed polling errors when using back button on mobile by replacing `window.location.href` with Next.js router
- **Router Events Cleanup** - Removed incompatible router.events usage from App Router
- **UI Navigation** (`f80a612`) - Added scroll-to-top when switching to drafted players tab

### Features  
- **Dark Mode** (`69ff87e`) - Added theme toggle functionality
- **Core Application** (`7adc228`) - Dashboard, authentication, and landing page implementation

## [2025-08-31] - Foundation & UX

### Fixes
- **Clipboard Functionality** (`2eed25e`) - Fixed copy/paste operations across browsers

### Features
- **Auto-hide Header** (`30658cd`) - Improved mobile UX with dynamic header visibility
- **Enhanced Player Management** (`d943898`) - Clipboard fallback, sticky tabs, empty state handling

### Refactoring
- **Layout System** (`061b963`) - Implemented flexbox grid for better responsiveness
- **UI Structure** (`82b215c`) - Removed title/subtitle, added nested tabs for cleaner interface

### Work in Progress
- **Header Improvements** (`d894716`) - Ongoing header optimization work

## Impact Levels
- **Major:** Core functionality changes (authentication, dashboard)
- **Minor:** Feature additions (dark mode, auto-hide header)
- **Patch:** Bug fixes and small improvements (clipboard, scroll behavior)

## Recent Focus Areas
1. **Navigation Architecture** - Route groups implementation and unified navigation components
2. **Code Organization** - Next.js best practices with (with-nav) route grouping
3. **Component Reusability** - BaseTabBar abstraction and consistent UI patterns
4. **Developer Experience** - Clean file structure and reduced code duplication

---
*Last updated: 2025-09-01*