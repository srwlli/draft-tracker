# BBFL Draft Tracker - Technical Specification

## Architecture Overview

The BBFL Draft Tracker is a real-time web application built on a modern TypeScript stack with Supabase as the backend-as-a-service provider. The application follows a mobile-first design approach with real-time synchronization capabilities.

### System Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client Apps   │    │   Vercel Edge    │    │    Supabase     │
│  (Mobile/Web)   │◄──►│   Next.js App    │◄──►│   PostgreSQL    │
│                 │    │                  │    │   + Realtime    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Technology Stack

### Frontend Framework
- **Next.js 15.5.2** - React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes for server-side logic
  - Built-in optimization features

### Language & Type System
- **TypeScript 5** - Static type checking
- **React 19.1.0** - UI library with latest concurrent features
- **React DOM 19.1.0** - DOM rendering layer

### Styling & UI Framework
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing with @tailwindcss/postcss
- **Shadcn UI** - Component library built on Radix UI
- **Lucide React** - Icon library with 1000+ icons

### Database & Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - RESTful API auto-generation

### State Management & Interactions
- **@dnd-kit/core** - Drag and drop functionality
- **@dnd-kit/sortable** - Sortable list implementation
- **@dnd-kit/utilities** - Utility functions for drag operations
- **React Hooks** - Built-in state management

### Notifications & UX
- **Sonner** - Toast notification system
- **class-variance-authority** - Conditional CSS class management
- **clsx** - Utility for constructing className strings
- **tailwind-merge** - Merge Tailwind CSS classes

### Utilities
- **UUID** - Unique identifier generation
- **React DevTools** - Development debugging

## Dependencies Analysis

### Production Dependencies (32 packages)
```json
{
  "@dnd-kit/core": "^6.3.1",           // Drag & drop core
  "@dnd-kit/sortable": "^10.0.0",      // Sortable lists
  "@dnd-kit/utilities": "^3.2.2",      // DnD utilities
  "@radix-ui/react-alert-dialog": "^1.1.15",   // Modal dialogs
  "@radix-ui/react-avatar": "^1.1.10",         // Avatar component
  "@radix-ui/react-checkbox": "^1.3.3",        // Checkbox input
  "@radix-ui/react-dialog": "^1.1.15",         // Dialog component
  "@radix-ui/react-select": "^2.2.6",          // Select dropdown
  "@radix-ui/react-separator": "^1.1.7",       // Visual separator
  "@radix-ui/react-slot": "^1.2.3",            // Slot component
  "@radix-ui/react-tabs": "^1.1.13",           // Tab navigation
  "@supabase/supabase-js": "^2.56.1",          // Supabase client
  "class-variance-authority": "^0.7.1",        // CSS variant utility
  "clsx": "^2.1.1",                            // Conditional classes
  "lucide-react": "^0.542.0",                  // Icon library
  "next": "15.5.2",                            // React framework
  "react": "19.1.0",                           // UI library
  "react-dom": "19.1.0",                       // DOM renderer
  "sonner": "^2.0.7",                          // Toast notifications
  "tailwind-merge": "^3.3.1",                  // Tailwind utilities
  "uuid": "^11.1.0"                            // UUID generation
}
```

### Development Dependencies (11 packages)
```json
{
  "@eslint/eslintrc": "^3",                     // ESLint configuration
  "@tailwindcss/postcss": "^4",                // PostCSS integration
  "@types/node": "^20",                        // Node.js types
  "@types/react": "^19",                       // React types
  "@types/react-dom": "^19",                   // React DOM types
  "eslint": "^9",                              // Code linting
  "eslint-config-next": "15.5.2",             // Next.js ESLint rules
  "tailwindcss": "^4",                         // CSS framework
  "tw-animate-css": "^1.3.7",                 // Tailwind animations
  "typescript": "^5"                           // TypeScript compiler
}
```

## Component Library

### Shadcn UI Components (11 installed)
- **alert-dialog** - Modal confirmation dialogs
- **avatar** - User profile images
- **badge** - Status indicators and labels
- **button** - Interactive buttons with variants
- **card** - Content containers
- **checkbox** - Boolean input controls
- **dialog** - Modal windows
- **input** - Text input fields
- **select** - Dropdown selection
- **separator** - Visual dividers
- **table** - Data tables with sorting
- **tabs** - Tab navigation interface

### Custom Components
- **PlayerTable** (`src/components/player-table.tsx`)
  - Real-time draft interface
  - Touch-and-hold mobile controls
  - Position filtering tabs
  - Draft confirmation dialogs
  
- **DraftStats** (`src/components/draft-stats.tsx`)
  - Live statistics grid (2x3 mobile layout)
  - Position-based pick counters
  - Total picks summary

## Database Schema

### Current Tables
```sql
-- Players table (example structure)
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  position TEXT NOT NULL,
  default_rank INTEGER,
  bye_week INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Drafts table
CREATE TABLE drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_token UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Draft picks table
CREATE TABLE draft_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID REFERENCES drafts(id),
  player_id UUID REFERENCES players(id),
  pick_number INTEGER,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

## Real-time Implementation

### Supabase Configuration
```typescript
// src/lib/supabase.ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
```

### Real-time Hooks
- **useSupabaseRealtime** (`src/hooks/useSupabaseRealtime.ts`)
  - Single subscription pattern with `event: '*'`
  - Handles INSERT, UPDATE, DELETE operations
  - Automatic cleanup on unmount

- **usePollingFallback** (`src/hooks/usePollingFallback.ts`)
  - 5-second polling as backup
  - Prevents missed updates if WebSocket fails
  - Configurable interval

## Mobile Optimization Features

### Touch Controls
```typescript
// Touch-and-hold implementation
const handleTouchStart = (player: Player) => {
  touchTimer.current = setTimeout(() => {
    handleDraft(player);
  }, 500); // 500ms hold time
};

// CSS to prevent text selection
style={{
  WebkitUserSelect: 'none',
  WebkitTouchCallout: 'none',
  userSelect: 'none'
}}
```

### Responsive Design
- Mobile-first Tailwind breakpoints
- Grid-based layouts for all screen sizes
- Touch-friendly button sizing (min 44px)
- Optimized tab spacing with full-width grid

## Security Model

### URL-based Authentication
- **Public Access**: `/draft/{draftId}` - Read-only viewer
- **Admin Access**: `/draft/{draftId}/admin/{adminToken}` - Full controls
- **Token Generation**: UUID v4 for secure admin tokens
- **No Login Required**: Security through URL obscurity

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

## Performance Optimizations

### Real-time Efficiency
- Single subscription per page (not per component)
- Event filtering on client side
- Automatic reconnection handling
- Polling fallback for reliability

### Build Optimizations
- Next.js Turbopack for faster builds
- Tree shaking for smaller bundles
- Automatic code splitting
- Image optimization

### Caching Strategy
- Static generation for public pages
- Dynamic rendering for draft pages
- Client-side caching for player data

## Development Workflow

### Code Quality
```bash
npm run lint        # ESLint with Next.js rules
npm run build       # TypeScript type checking
```

### Git Workflow
- Feature branches for new development
- Conventional commit messages
- Production deployment via Vercel

### Testing Strategy (Planned)
- Unit tests for utilities and hooks
- Integration tests for Supabase operations
- E2E tests for draft workflows
- Mobile device testing

## Deployment Architecture

### Vercel Platform
- **Hosting**: Vercel Edge Network
- **Domain**: Custom Vercel subdomain
- **Environment**: Production environment variables
- **Build**: Next.js with Turbopack
- **CDN**: Global edge caching

### Environment Configuration
- Supabase credentials imported to Vercel
- Automatic deployments from main branch
- Preview deployments for pull requests

## API Integration

### Supabase Client Features
- **Database**: PostgreSQL with generated TypeScript types
- **Real-time**: WebSocket subscriptions
- **Storage**: File uploads (not currently used)
- **Auth**: Authentication system (planned for v2)

### API Patterns
```typescript
// Real-time subscription
supabase
  .channel('draft-picks')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'draft_picks'
  }, callback)
  .subscribe();

// Data fetching
const { data, error } = await supabase
  .from('players')
  .select('*')
  .order('default_rank');
```

## Browser Compatibility

### Supported Features
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Falls back gracefully without JavaScript

### Required APIs
- WebSocket (for real-time)
- Local Storage (for rankings)
- Touch Events (for mobile)
- Clipboard API (for copy links)

## Monitoring & Analytics

### Error Tracking
- Next.js built-in error boundaries
- Supabase error logging
- Client-side error handling

### Performance Metrics
- Vercel Analytics (available)
- Core Web Vitals monitoring
- Real-time connection health

## Future Technical Considerations

### Scalability
- Supabase can handle 500+ concurrent connections
- Vercel Edge Network for global performance
- Client-side state management for large datasets

### Security Enhancements
- Row Level Security policies
- Rate limiting for API calls
- Input sanitization and validation
- CSRF protection

### Feature Expansion
- WebRTC for voice/video
- Push notifications
- Offline support with service workers
- PWA capabilities