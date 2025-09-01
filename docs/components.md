# Component Analysis: Fantasy Football Draft Tracker

## Page Components (App Router)

### **RootLayout** (`src/app/layout.tsx`)
- **Purpose:** Global layout with providers and font configuration
- **Props:** `children: React.ReactNode`
- **Dependencies:** ThemeProvider, AuthProvider, Toaster, Google fonts
- **Type:** Server component with providers
- **Usage:** Root of application

### **LandingPage** (`src/app/page.tsx`)
- **Purpose:** Authentication and feature showcase landing page
- **Props:** None (default export)
- **Dependencies:** Auth UI, AuthContext, UI components, Lucide icons
- **Type:** Client component with auth logic
- **Usage:** Home route, redirects authenticated users

### **Dashboard** (`src/app/dashboard/page.tsx`)
- **Purpose:** User dashboard for creating/managing drafts
- **Props:** None (default export)  
- **Dependencies:** UI components, Supabase, AuthContext, uuid
- **Type:** Client component with database operations
- **Usage:** Post-authentication dashboard

### **DraftViewerPage** (`src/app/draft/[draftId]/page.tsx`)
- **Purpose:** Read-only draft viewing with real-time updates
- **Props:** URL params: `draftId`
- **Dependencies:** Draft context, real-time hooks, shared tables
- **Type:** Client component with real-time subscriptions
- **Usage:** Public draft viewing

### **DraftAdminPage** (`src/app/draft/[draftId]/admin/[adminToken]/page.tsx`)
- **Purpose:** Admin draft management with draft/undraft capabilities
- **Props:** URL params: `draftId, adminToken`
- **Dependencies:** Same as viewer plus admin actions
- **Type:** Client component with admin validation
- **Usage:** Admin draft control

### **SettingsPage** (`src/app/settings/page.tsx`)
- **Purpose:** User settings and preferences
- **Props:** None (default export)
- **Type:** Client component
- **Usage:** Settings route

## Shared Components (Reusable)

### **PlayerTable** (`src/components/player-table.tsx`)
- **Purpose:** Available players table with draft actions
- **Props:** `players: PlayerWithStatus[], isAdmin: boolean, onDraft/onUndraft: (id) => void`
- **Dependencies:** UI table, AlertDialog, touch interaction
- **Usage:** Both admin and viewer pages
- **Features:** Long-press drafting, haptic feedback

### **DraftedPlayersTable** (`src/components/drafted-players-table.tsx`)
- **Purpose:** Shows drafted players with pick numbers
- **Props:** `players: PlayerWithStatus[], isAdmin: boolean, onUndraft: (id) => void, selectedPosition?: Position`
- **Dependencies:** UI table, Badge
- **Usage:** Both admin and viewer in drafted view
- **Features:** Position filtering, undo capability

### **DraftStats** (`src/components/draft-stats.tsx`)
- **Purpose:** Statistical overview of draft progress
- **Props:** `totalPicks: number, positionCounts: PositionCounts`
- **Dependencies:** Card, Badge
- **Usage:** Stats view on both admin and viewer
- **Features:** Position breakdown display

### **BottomTabBar** (`src/components/bottom-tab-bar.tsx`)
- **Purpose:** Mobile navigation with sharing functionality
- **Props:** `isAdmin: boolean`
- **Dependencies:** Lucide icons, clipboard utility, AuthContext
- **Usage:** Draft layouts only
- **Features:** Admin/viewer link sharing, navigation

## Context Providers

### **AuthProvider** (`src/contexts/AuthContext.tsx`)
- **Purpose:** Supabase authentication state management
- **Props:** `children: React.ReactNode`
- **Dependencies:** Supabase auth
- **Type:** Client-side context provider
- **Export:** `useAuth` hook
- **State:** `user, session, loading, signOut`

### **DraftLayoutProvider** (`src/contexts/DraftLayoutContext.tsx`)
- **Purpose:** Draft page state (position filter, view mode)
- **Props:** `children: ReactNode`
- **Dependencies:** Position types
- **Type:** Client-side context provider
- **Export:** `useDraftLayout` hook
- **State:** `selectedPosition, activeView, draft, isAdmin`

## UI Components (shadcn/ui)

### Layout Components
- **Card** (`ui/card.tsx`) - Layout container with header/content/footer variants
- **Separator** (`ui/separator.tsx`) - Visual divider
- **Tabs** (`ui/tabs.tsx`) - Tab navigation

### Interactive Components
- **Button** (`ui/button.tsx`) - Interactive button with variants
- **Input** (`ui/input.tsx`) - Form input field
- **Checkbox** (`ui/checkbox.tsx`) - Checkbox input
- **Select** (`ui/select.tsx`) - Dropdown selection

### Display Components
- **Badge** (`ui/badge.tsx`) - Status/category indicators
- **Avatar** (`ui/avatar.tsx`) - User profile image
- **Table** (`ui/table.tsx`) - Data table structure

### Modal Components
- **Dialog** (`ui/dialog.tsx`) - Modal dialog
- **AlertDialog** (`ui/alert-dialog.tsx`) - Confirmation modal

## Architecture Patterns

### Framework
- **Next.js 14 App Router:** File-based routing with server/client components
- **TypeScript:** Full type safety with custom interfaces
- **Tailwind CSS:** Utility-first styling system

### State Management
- **React Context:** Auth and draft layout state
- **Real-time Updates:** Supabase subscriptions with polling fallback
- **Local State:** useState for component-specific state

### Component Composition
- **UI Primitives:** Base components from shadcn/ui
- **Business Components:** Feature-specific components using primitives
- **Layout Components:** Page-level components with routing

## Refactoring Opportunities

### Extract Utility Components
1. **PositionFilter** - Repeated position filtering logic
2. **LoadingSpinner** - Consistent loading states
3. **EmptyState** - Standardized empty data messaging

### Reduce Props Drilling
1. **AdminContext** - Avoid passing `isAdmin` through multiple levels
2. **DraftContext** - Centralize draft-related state management

### Improve Type Safety
1. **Supabase Types** - Generate types from database schema
2. **Event Handlers** - Stronger typing for callback functions

### Code Deduplication
1. **Position Counting** - Extract utility function for position statistics
2. **Player Status Logic** - Centralize drafted player marking
3. **Real-time Subscriptions** - Create reusable hook pattern

## Missing Components (Suggested)
- **PositionTabs** - Dedicated position selection component
- **PlayerCard** - Alternative to table row for mobile
- **DraftHeader** - Standardized draft page header
- **ErrorBoundary** - Error handling for real-time failures