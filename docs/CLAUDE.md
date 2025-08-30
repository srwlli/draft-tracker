# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Fantasy Football Draft Tracker - a real-time web application for managing fantasy football drafts. The project has completed its foundation phase with TypeScript types, Supabase integration, and UI component setup. Ready for feature implementation.

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

## Key Features to Implement

1. **Player Management**
   - Load players from Supabase
   - Display with rank, name, team, position
   - Position-based filtering

2. **Ranking System**
   - Default rankings from database
   - Drag-and-drop reordering
   - Local storage persistence per browser

3. **Draft State**
   - Real-time synchronization across all users
   - Visual indication of drafted players (strikethrough, gray)
   - Position counters (e.g., "3 QBs drafted")

4. **Admin Controls**
   - Draft button for each player
   - Undo functionality
   - Confirmation dialogs

## Current Implementation Status

### ✅ Completed Foundation
- **TypeScript Types**: Complete type system in `src/types/index.ts`
  - Player, Draft, DraftPick, PersonalRanking interfaces
  - Position type safety with validation
  - PlayerWithStatus for UI display
- **Supabase Integration**: Client setup in `src/lib/supabase.ts`
- **Real-time Hook**: Custom hook at `src/hooks/useSupabaseRealtime.ts`
- **UI Components**: 11 Shadcn UI components installed and configured
- **Environment**: Supabase credentials configured in `.env.local`

### 🔄 Next Implementation Phase
1. **Database Schema**: Create Supabase tables and seed player data
2. **Core Pages**: Homepage, draft viewer, and admin interfaces
3. **Components**: PlayerTable, PositionFilter, DraftControls
4. **Real-time Features**: Live draft updates and synchronization

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
- `src/lib/supabase.ts` - Supabase client configuration  
- `src/hooks/useSupabaseRealtime.ts` - Real-time subscription hook
- `.env.local` - Environment variables (Supabase credentials)
- `components.json` - Shadcn UI configuration
- `docs/supabase-creds.txt` - Original Supabase credentials

### Available Components
Shadcn UI components ready for use:
- avatar, badge, button, card, checkbox, dialog, input, select, separator, table, tabs

## Testing Approach
- Unit tests for ranking logic and type validation
- Integration tests for Supabase operations
- E2E tests for real-time synchronization
- Test admin vs viewer permissions and URL routing