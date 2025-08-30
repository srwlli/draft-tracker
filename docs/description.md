# Fantasy Football Draft Tracker

A live draft board application used during fantasy football draft sessions.

## What It Does

### Core Purpose
Helps track which players have been drafted during a fantasy football draft in real-time, with admin controls for managing the draft and personalized player rankings.

### Main Features

- Shows player rankings across different positions (QB, RB, WR, TE, Defense, Kicker)
- Database-driven player data: All player information (names, teams, positions, base rankings) stored in SupaBase
- Editable personal rankings: Users can customize and reorder player rankings to match their personal draft strategy
- Local storage persistence: Personal ranking changes are saved locally in the browser and persist between sessions
- Displays all players in a table with their rank, name, team, and position
- Admin functionality: One designated user (admin) can mark players as "drafted" which crosses them out and grays them out for all users
- Real-time updates: When the admin drafts/undrafts a player, all other users see the changes instantly without refreshing
- Tracks how many players have been drafted at each position
- Shows a running count of total drafted players
- Provides position-specific views (can filter to see only quarterbacks, only running backs, etc.)
- Modern, accessible UI using Shadcn UI components with Tailwind CSS

## How It Works

- Base rankings: Players start with default rankings stored in the database
- Personal customization: Each user can drag-and-drop or manually edit rankings to create their personalized draft board
- Local persistence: Ranking changes are saved in the user's browser and reload automatically
- Admin controls: Only the admin user can click "DRAFT" next to player names or undo drafts
- Viewer mode: Regular users see the same live board but cannot make changes to the draft state - they only view the current draft state with their personal rankings
- When the admin drafts a player, it gets crossed out for everyone in real-time (but each user sees it in their personal ranking order)
- The admin can undo mistakes by clicking "UNDO"
- The app keeps count of how many QBs, RBs, etc. have been drafted and updates for all users
- All users see the same synchronized draft state but with their own customized player order

## Use Case

This would typically be used by a fantasy football league during their draft day. Before the draft, each participant can customize their player rankings based on their draft strategy and research. The league commissioner or designated person would be the admin with draft control powers. Everyone else would have the app open on their devices in view-only mode with their personalized rankings displayed. As each person makes their pick in the real draft, the admin updates the digital board by marking that player as drafted. All participants instantly see which players are taken in their own preferred ranking order and can track position scarcity in real-time.

## Admin vs Viewer Roles

### Admin
- Can draft/undraft players via a special admin URL
- Sees confirmation dialogs
- Controls the master draft state
- Can also customize personal rankings

### Viewers
- Access the draft board via a separate viewer URL
- See live updates of drafted players
- Position counts
- Rankings in their personalized order
- Cannot make changes to the draft state

## Data Management

- Player database: Central database stores all player information, teams, positions, and default rankings
- Personal rankings: Individual ranking customizations stored in browser local storage
- Draft state: Centrally managed and synchronized across all users in real-time
- Admin access: Controlled through a unique admin token in the URL, separate from the viewer URL

## Technology Stack
- Next.js with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn UI for accessible, customizable components
- Supabase for database and real-time subscriptions
- @dnd-kit/core for drag-and-drop functionality

## Security Model

- When creating a draft, the system generates two URLs:
  1. Admin URL: Contains a unique admin token (e.g., `drafttracker.com/draft/ABC123/admin/XYZ789`)
  2. Viewer URL: Public link without admin powers (e.g., `drafttracker.com/draft/ABC123`)
- The admin keeps their special URL private and shares only the viewer URL with participants
- No accounts or passwords required - admin status is determined solely by having the correct URL
- Admin token is stored with the draft data in the database for verification

It's essentially a digital version of paper draft boards with real-time synchronization, role-based access control via URL, and personalized ranking customization that persists locally for each user.