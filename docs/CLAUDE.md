# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Fantasy Football Draft Tracker - a real-time web application for managing fantasy football drafts. The project is currently in specification phase with no implementation code present.

## Technology Stack
- **Framework**: Next.js with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI for accessible, customizable components
- **Database**: Supabase (PostgreSQL with real-time subscriptions)
- **Drag & Drop**: @dnd-kit/core for ranking customization

## Architecture Requirements

### Database
- **Platform**: Supabase (PostgreSQL)
- **Connection**: Available in `supabase-creds.txt`
- **Schema needs**: 
  - Players table (name, team, position, default_rank)
  - Drafts table (id, admin_token, created_at)
  - Draft_state table (draft_id, player_id, is_drafted)

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

## Development Commands

Since no implementation exists yet, suggested setup:
```bash
# Next.js with TypeScript setup:
npx create-next-app@latest draft-tracker --typescript --tailwind --app
cd draft-tracker

# Install Shadcn UI:
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card table dialog

# Install additional dependencies:
npm install @supabase/supabase-js
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Development commands:
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Code linting
npm test         # Run tests

# For Supabase integration:
npx supabase init
npx supabase db push    # Push schema changes
```

## Testing Approach
- Unit tests for ranking logic
- Integration tests for Supabase operations
- E2E tests for real-time synchronization
- Test admin vs viewer permissions