# BBFL Draft Tracker

A real-time fantasy football draft tracking application built for mobile-first usage. Track draft picks, player rankings, and team selections with live updates across all connected devices.

## 🚀 Live Application

**Production URL**: [https://draft-tracker-ff5pf58p6-teamhart.vercel.app](https://draft-tracker-ff5pf58p6-teamhart.vercel.app)

## ✨ Features

- **Real-time Updates**: Live synchronization across all connected users with polling fallback
- **Mobile Optimized**: Touch-and-hold drafting with confirmation dialogs and loading states
- **Secure Authentication**: Next.js middleware with server-side validation
- **Dual Access Modes**: 
  - Admin view with drafting controls and undo functionality
  - Viewer-only mode for participants
- **Position Filtering**: Filter players by QB, RB, WR, TE, DEF, K
- **Draft Statistics**: Live stats grid showing picks by position
- **Professional Branding**: BBFL-themed interface
- **No Login Required**: URL-based access with secure admin tokens
- **Performance Optimized**: Race condition prevention and instant UI feedback

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5
- **Runtime**: React 19.1.0  
- **Database**: Supabase with PostgreSQL
- **Real-time**: Supabase subscriptions + polling fallback
- **UI**: Shadcn UI with Tailwind CSS 4
- **State Management**: React Context with optimized real-time sync
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/srwlli/draft-tracker.git
cd draft-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create environment variables file
cp .env.local.example .env.local  # if available, or create manually
```

Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Protected routes with authentication
│   │   ├── dashboard/     # User dashboard
│   │   ├── ranks/         # Player rankings page
│   │   ├── settings/      # Settings page
│   │   └── soon/          # Coming soon features
│   ├── draft/[draftId]/   # Draft viewer page
│   └── draft/[draftId]/admin/  # Admin controls (token in secure cookie)
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── player-table.tsx  # Main draft interface
│   ├── draft-stats.tsx   # Statistics display
│   ├── draft-form.tsx    # Draft creation form
│   └── various navigation and layout components
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # Authentication context
│   └── DraftLayoutContext.tsx  # Draft layout state
├── hooks/                # Custom React hooks
│   ├── useSupabaseRealtime.ts  # Real-time subscriptions
│   └── usePollingFallback.ts   # Polling backup
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Database client
│   ├── utils.ts          # Helper functions
│   └── clipboard.ts      # Clipboard utilities
└── types/                # TypeScript definitions
    └── index.ts          # Application types
middleware.ts               # Route protection and auth validation
```

## 📱 Usage

### Creating a Draft
1. Visit the homepage
2. Click "Create New Draft"
3. Save the admin and viewer URLs

### Admin Functions
- Touch and hold players to draft (mobile)
- Click draft button with confirmation dialog (desktop)
- Undo draft picks with confirmation
- Loading states prevent double-clicks
- Copy shareable links
- View real-time statistics

### Viewer Functions
- Watch live draft updates
- Filter players by position
- View draft statistics

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint

# Component management
npx shadcn@latest add [component]  # Add UI components
```

## 🌟 Planned Enhancements

See [docs/improvement.md](docs/improvement.md) for the full roadmap including:
- User authentication and team management
- Personal player rankings with drag-and-drop
- Settings page with dark mode
- Draft analytics and insights
- Multi-league support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🏈 About BBFL

Built for the BBFL (Big Boy Fantasy League) - where fantasy football meets real competition.

## Notes on Rate Limiting (Development)

- In development, a lightweight in-memory rate limiter is applied to `/api/*` routes inside `middleware.ts` to help catch accidental request floods.
- This limiter is dev-only and includes basic cleanup and a small map size cap. It is not suitable for production or multi-instance deployments.
- For production, use a distributed rate limiting solution (e.g., Upstash Redis or a provider-native edge limiter). This repository does not implement a production limiter by design.

## Admin Security Model

- Admin access uses a server-set HttpOnly cookie named `dt_admin_{draftId}` issued when creating a draft.
- Admin API routes (`/api/drafts/{id}/picks*`) validate this cookie on the server using a timing-safe token check. The browser never needs to read the token.
- During transition, the API also accepts an `x-admin-token` header; this will be removed once rollout is verified.
- The service-role Supabase client is configured to be stateless (no cookie persistence or auth mutation) and should only be used for admin operations on the server.
