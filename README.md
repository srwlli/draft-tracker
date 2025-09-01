# BBFL Draft Tracker

A real-time fantasy football draft tracking application built for mobile-first usage. Track draft picks, player rankings, and team selections with live updates across all connected devices.

## 🚀 Live Application

**Production URL**: [https://draft-tracker-ff5pf58p6-teamhart.vercel.app](https://draft-tracker-ff5pf58p6-teamhart.vercel.app)

## ✨ Features

- **Real-time Updates**: Live synchronization across all connected users
- **Mobile Optimized**: Touch-and-hold drafting with confirmation dialogs
- **Secure Authentication**: Next.js middleware with server-side validation
- **Dual Access Modes**: 
  - Admin view with drafting controls
  - Viewer-only mode for participants
- **Position Filtering**: Filter players by QB, RB, WR, TE, DEF, K
- **Draft Statistics**: Live stats grid showing picks by position
- **Professional Branding**: BBFL-themed interface
- **No Login Required**: URL-based access with secure admin tokens

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5
- **Database**: Supabase with PostgreSQL
- **Real-time**: Supabase subscriptions + polling fallback
- **UI**: Shadcn UI with Tailwind CSS 4
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
# Copy and configure environment variables
cp .env.example .env.local
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
│   ├── draft/[draftId]/   # Draft viewer page
│   └── draft/[draftId]/admin/[adminToken]/  # Admin controls
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── player-table.tsx  # Main draft interface
│   └── draft-stats.tsx   # Statistics display
├── hooks/                # Custom React hooks
│   ├── useSupabaseRealtime.ts  # Real-time subscriptions
│   └── usePollingFallback.ts   # Polling backup
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Database client
│   └── utils.ts          # Helper functions
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
- Click draft button (desktop)
- Copy shareable links
- View real-time statistics

### Viewer Functions
- Watch live draft updates
- Filter players by position
- View draft statistics

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Component management
npx shadcn-ui@latest add [component]  # Add UI components
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