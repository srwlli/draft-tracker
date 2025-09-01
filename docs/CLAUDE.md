# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Philosophy

### Code Quality Standards
- **Modern Best Practices**: Always use contemporary web development patterns and APIs
- **Professional Solutions**: Implement solutions that experienced developers would choose
- **No Hacky Workarounds**: Avoid temporary fixes, magic numbers, or brittle implementations
- **Performance First**: Choose performant, scalable solutions over quick fixes

### Technical Decision Making
When facing implementation choices, always prioritize:
1. **Modern Web Standards**: Use Intersection Observer over scroll listeners, Flexbox/Grid over manual positioning
2. **Maintainable Code**: Avoid magic numbers and manual calculations that break on changes
3. **Scalable Patterns**: Choose solutions that work as requirements evolve
4. **Industry Standards**: Follow patterns that senior developers use in production

### Modern Web Standards We Use

#### Layout & Positioning
- **Flexbox Layout**: `flex`, `flex-1`, `flex-shrink-0` for intrinsic sizing
- **CSS Grid**: Grid layouts for tab navigation and responsive components
- **Viewport Units**: `h-screen` for full-height containers
- **Dynamic Positioning**: Conditional classes vs manual calc() calculations

#### Browser APIs
- **Intersection Observer API**: Scroll detection and visibility changes
- **Clipboard API**: Modern copy-to-clipboard with fallback support
- **Navigator Vibrate**: Haptic feedback for mobile interactions
- **CSS Custom Properties**: Dynamic styling over JavaScript manipulation

#### React Patterns
- **React Context**: Centralized state management with proper typing
- **useRef Hooks**: DOM references over getElementById/querySelector
- **Declarative JSX**: React elements over createElement/appendChild
- **Effect Dependencies**: Proper cleanup and dependency arrays

#### CSS Techniques
- **CSS Transitions**: Smooth animations over JavaScript animations
- **Transform Properties**: `translate` for performant position changes
- **Backdrop Filter**: Modern glass morphism effects
- **Logical Properties**: Future-proof spacing and positioning

#### Performance Optimizations
- **Passive Event Listeners**: Non-blocking scroll and touch events
- **CSS Containment**: Efficient rendering with `overflow-auto`
- **Client-Side Hydration**: Proper SSR/client state synchronization
- **Debounced Updates**: Efficient state changes during rapid interactions

## Project Overview

This is a Fantasy Football Draft Tracker - a real-time web application for managing fantasy football drafts. The application is fully deployed and production-ready with real-time updates, mobile-optimized UI, and complete admin/viewer functionality.

## Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5 for type safety
- **UI Framework**: React 19.1.0
- **Styling**: Tailwind CSS 4 with PostCSS
- **UI Components**: Shadcn UI (11 components installed) with Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: Sonner for toast notifications
- **Database**: Supabase with real-time subscriptions
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- **Development**: ESLint with Next.js configuration

## Architecture Requirements

### Database
- **Platform**: Supabase (PostgreSQL)
- **Connection**: Configured in `.env.local` with credentials from `supabase-creds.txt`
- **Client**: Available at `src/lib/supabase.ts` with environment validation
- **Schema needs**: 
  - Players table (name, team, position, default_rank)
  - Drafts table (id, admin_token, created_at, name)
  - Draft_picks table (id, draft_id, player_id, pick_number, timestamp)

### Frontend Architecture
- Real-time updates for all connected users
- Local storage for personalized player rankings
- Drag-and-drop interface for ranking customization (@dnd-kit/core)
- Position filtering (QB, RB, WR, TE, Defense, Kicker)
- Responsive design for multiple devices
- Modern, accessible UI using Shadcn UI components with Tailwind CSS

### Backend Requirements
- WebSocket or Supabase Realtime for live synchronization
- URL-based authentication (no user accounts)
- Admin actions: draft/undraft players
- Viewer actions: customize rankings (local only)

## Security Model
- Admin access via unique URL token: `/draft/{draft_id}/admin/{admin_token}`
- Viewer access via public URL: `/draft/{draft_id}`
- No user authentication required - security through URL obscurity

## Remaining Features to Implement

1. **Database Setup**
   - Create Supabase tables (players, drafts, draft_picks)
   - Import 2025 NFL player data
   - Set default rankings

2. **Ranking System**
   - Drag-and-drop reordering using @dnd-kit (already installed)
   - Local storage persistence per browser/device
   - Reset to default rankings option

3. **Additional Features**
   - Undo last pick functionality
   - Draft history/log
   - Export draft results
   - Fix ALL tab to show by overall rank

## Current Implementation Status

### ✅ Completed Features
- **TypeScript Types**: Complete type system in `src/types/index.ts`
- **Supabase Integration**: Client with real-time configuration and environment validation
- **Real-time Updates**: Working live synchronization with polling fallback (5-second intervals)
- **Core Pages**: 
  - Homepage with draft creation and automatic token generation
  - Viewer page with read-only access and real-time updates
  - Admin page with full controls and secure token validation
- **Components**:
  - PlayerTable with touch-and-hold draft functionality (500ms hold time)
  - DraftStats with mobile-friendly 2x3 grid layout
  - Alert dialog for draft confirmation ("Draft [Player Name]?")
  - Position-based tabs (QB, RB, WR, TE, DEF, K) with full-width spacing
- **Mobile Optimizations**:
  - Touch-and-hold drafting with visual feedback
  - CSS to prevent text selection and copy menus
  - Responsive grid layouts for all screen sizes
  - Shortened button labels ("Admin Link" / "Viewer Link")
- **UI/UX Improvements**:
  - BBFL branded header/footer with proper padding
  - Mobile-optimized tab spacing using grid layout
  - Copy link buttons in header for admin users only
  - Professional branding throughout
- **Deployment**: Successfully deployed to Vercel at `https://draft-tracker-ff5pf58p6-teamhart.vercel.app`
- **Security**: URL-based authentication with UUID tokens for admin access

### 🚀 Production Status
- **Live URL**: `https://draft-tracker-ff5pf58p6-teamhart.vercel.app`
- **Real-time Updates**: Confirmed working across all connected devices
- **Mobile Experience**: Fully optimized with touch controls
- **Security Model**: URL-based with admin tokens (no login required)
- **Performance**: Instant updates with 5-second polling fallback
- **Branding**: Professional BBFL theme throughout

### 📝 Known Issues/Future Enhancements
1. **Database Schema**: Still needs Supabase tables created and player data seeded
2. **ALL Tab**: Currently hidden due to sorting issues (showed positions alphabetically instead of by overall rank)
3. **Local Rankings**: Drag-and-drop ranking customization with local storage not yet implemented
4. **Dark Mode**: Intentionally not included (per user preference)
5. **Player Data**: Needs to be imported from NFL/fantasy sources

## Development Commands

```bash
# Development server:
npm run dev      # Runs on http://localhost:3000

# Production build:
npm run build    # Build for production
npm run start    # Start production server

# Code quality:
npm run lint     # ESLint with Next.js rules

# Component management:
npx shadcn-ui@latest add [component]  # Add new UI components

# Database operations (when Supabase CLI is set up):
npx supabase db push    # Push schema changes
npx supabase db reset   # Reset database
```

## File Structure Reference

### Key Files
- `src/types/index.ts` - TypeScript type definitions
- `src/lib/supabase.ts` - Supabase client with real-time config
- `src/hooks/useSupabaseRealtime.ts` - Unified real-time subscription hook
- `src/hooks/usePollingFallback.ts` - 5-second polling fallback
- `src/components/player-table.tsx` - Main table with touch controls
- `src/components/draft-stats.tsx` - Mobile-optimized stats grid
- `.env.local` - Environment variables (Supabase credentials)
- `components.json` - Shadcn UI configuration

### Available Components
Shadcn UI components ready for use:
- avatar, badge, button, card, checkbox, dialog, input, select, separator, table, tabs

## Testing Approach
- Unit tests for ranking logic and type validation
- Integration tests for Supabase operations
- E2E tests for real-time synchronization
- Test admin vs viewer permissions and URL routing