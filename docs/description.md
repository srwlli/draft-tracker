# Fantasy Football Draft Tracker

A real-time fantasy football draft tracking application with authentication and mobile-optimized interface.

## What It Does

### Core Purpose
Provides a comprehensive platform for managing fantasy football drafts with real-time synchronization, user authentication, and mobile-first design.

### Main Features

#### Authentication & User Management
- Supabase authentication with email/password sign-in
- User dashboard for creating and managing multiple drafts
- Persistent user sessions with automatic redirects

#### Draft Management
- Create new drafts with custom names
- Unique admin tokens for secure draft control
- Separate admin and viewer URLs for role-based access
- Real-time synchronization across all connected users

#### Player Tracking
- Comprehensive player database with NFL positions (QB, RB, WR, TE, DEF, K)
- Default rankings with support for custom user rankings (planned)
- Touch-optimized mobile interface with long-press drafting
- Haptic feedback for mobile interactions

#### Live Draft Board
- Three view modes: Available Players, Drafted Players, Statistics
- Position-based filtering (QB, RB, WR, TE, DEF, K, ALL)
- Real-time draft updates with Supabase subscriptions
- Polling fallback when real-time connection fails
- Mobile-first responsive design

#### Statistics & Analytics
- Live position counts and draft progress tracking
- Pick number tracking for drafted players
- Visual statistics dashboard

#### Mobile Experience
- Bottom tab navigation optimized for mobile use
- Touch gestures for drafting players
- Share functionality for admin/viewer links
- Progressive web app capabilities

## How It Works

### Authentication Flow
- Users sign up/sign in through landing page
- Authenticated users access dashboard
- Dashboard allows creating new drafts or joining existing ones

### Draft Creation & Access
- Admin creates draft and receives unique admin URL with token
- Admin shares viewer URL (without token) with participants
- Admin token validates draft management permissions

### Real-time Synchronization
- Supabase real-time subscriptions for instant updates
- Automatic polling fallback ensures reliability
- All users see draft changes immediately

### Mobile Interaction
- Long-press (500ms) to draft players on mobile
- Confirmation dialogs prevent accidental drafts
- Bottom navigation for easy one-handed use
- Share menu for distributing draft links

## Use Case

Fantasy football leagues use this during draft day. Users sign up for accounts and create drafts from their dashboard. The league commissioner acts as admin with the admin URL, while participants use the viewer URL. Everyone sees real-time updates as players are drafted, with mobile-optimized interface for easy use during draft events.

## User Roles

### Authenticated Users
- Sign up/sign in through Supabase authentication
- Access personal dashboard for draft management
- Create new drafts with custom names
- Future: Manage personal player rankings

### Draft Admin
- Controls draft through admin URL with unique token
- Draft/undraft players via mobile-optimized interface
- Long-press gestures with haptic feedback on mobile
- Share admin/viewer links through built-in share menu

### Draft Viewers
- Access drafts via viewer URL (no admin token)
- Real-time view of draft progress
- Position filtering and statistics
- Mobile navigation through bottom tab bar

## Current Implementation

### Authentication System
- Supabase Auth UI integration on landing page
- Persistent sessions with automatic dashboard redirects
- User dashboard with draft creation functionality
- Sign out capability

### Draft Management
- UUID-based draft creation with admin tokens
- Real-time synchronization via Supabase subscriptions
- Polling fallback for connection reliability
- Three view modes: Available, Drafted, Statistics

### Mobile-First Design
- Bottom tab navigation for one-handed use
- Touch-optimized player selection
- Share functionality for draft links
- Responsive grid layouts

### Data Architecture
- Supabase PostgreSQL database
- Real-time subscriptions for live updates
- TypeScript interfaces for type safety
- Position-based filtering and statistics

## Technology Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS variables for theming
- **UI Components:** shadcn/ui with Radix UI primitives
- **Backend:** Supabase (database, auth, real-time)
- **Icons:** Lucide React
- **Notifications:** Sonner toast library
- **Theme:** next-themes for dark mode support

## Security Model

### Authentication-Based Access
- User accounts required for draft creation
- Dashboard access protected by authentication
- Automatic session management

### URL-Based Draft Control
- Admin URLs contain unique tokens for draft control
- Viewer URLs provide read-only access
- Server-side admin token validation
- No additional permissions system needed

The application serves as a modern, mobile-optimized replacement for traditional draft boards with real-time collaboration and persistent user accounts.