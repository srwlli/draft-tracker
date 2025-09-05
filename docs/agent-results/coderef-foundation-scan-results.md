# BBFL Draft Tracker - Comprehensive Codebase Documentation

**Generated:** 2025-09-05  
**Agent Onboarding Mode:** Comprehensive  
**Project Status:** Production-ready with active development

## Project Overview

### Core Purpose
The BBFL Draft Tracker is a **real-time fantasy football draft management system** built for the "Big Boy Fantasy League." It provides live synchronization across devices during draft sessions with both administrative controls and viewer-only access modes.

### Domain & Business Logic
- **Primary Domain:** Fantasy Sports Draft Management
- **Target Audience:** Fantasy football leagues (primarily BBFL)
- **Core Business Value:** Real-time draft coordination eliminating manual tracking errors
- **Access Model:** URL-based access with secure admin tokens (no account required for basic viewing)

### Production Environment
- **Live URL:** https://draft-tracker-ff5pf58p6-teamhart.vercel.app
- **Deployment:** Vercel with Supabase backend
- **Status:** Actively used by BBFL league

---

## Technical Architecture

### Framework & Runtime Stack
- **Framework:** Next.js 15.5.2 (App Router)
- **Runtime:** React 19.1.0 (latest stable)
- **Language:** TypeScript 5.x with strict type checking
- **Database:** Supabase PostgreSQL with real-time subscriptions
- **Deployment:** Vercel edge functions and static generation

### Database Architecture
```sql
-- Core Tables (inferred from codebase)
players (id, name, team_id, position, default_rank)
teams (id, team_name, city, abbreviation) 
drafts (id, admin_token, created_at, name, user_id)
draft_picks (id, draft_id, player_id, pick_number, timestamp)
user_rankings (id, user_id, player_id, custom_rank, position, created_at, updated_at)
```

### Real-time Infrastructure
- **Primary:** Supabase real-time subscriptions via WebSocket
- **Fallback:** Custom polling mechanism every 5 seconds when real-time fails
- **Deduplication:** Commit timestamp + event type tracking prevents duplicate updates
- **Throttling:** 100ms throttle on real-time updates prevents excessive re-renders

---

## Key Features & Workflows

### Draft Session Management
1. **Draft Creation:** Authenticated users create drafts with unique admin tokens
2. **Dual Access Modes:**
   - **Admin:** `/draft/[draftId]/admin/[adminToken]` - Full drafting controls
   - **Viewer:** `/draft/[draftId]` - Read-only with live updates
3. **Real-time Sync:** All connected clients see draft picks instantly
4. **Mobile Optimization:** Touch-and-hold drafting with haptic feedback

### User Authentication & Authorization
- **Public Access:** Draft viewing requires no authentication
- **Admin Access:** Protected by Next.js middleware validating user ownership + admin token
- **Authentication Provider:** Supabase Auth with email/password
- **Session Management:** Server-side validation with cookie-based sessions

### Player Rankings System
- **Default Rankings:** Seeded with standard fantasy football player rankings
- **Custom Rankings:** Drag-and-drop reordering with real-time sync across devices
- **Position Filtering:** QB, RB, WR, TE, DEF, K position-specific views
- **Optimistic Updates:** Immediate UI feedback with server confirmation

---

## Critical File Structure & Responsibilities

### Core Application Structure
```
src/
├── app/                     # Next.js App Router pages
│   ├── (auth)/             # Protected routes requiring authentication
│   │   ├── dashboard/      # User dashboard with draft management
│   │   ├── ranks/         # Personal player rankings interface  
│   │   └── **/           # Other authenticated pages
│   ├── draft/[draftId]/   # Public draft viewer
│   │   ├── admin/[adminToken]/ # Protected admin interface
│   │   ├── layout.tsx     # Draft-specific layout with DraftLayoutProvider
│   │   └── page.tsx       # Main draft viewer with real-time sync
│   ├── api/               # API route handlers
│   │   ├── drafts/        # CRUD operations for draft management
│   │   ├── public/        # Unauthenticated endpoints
│   │   └── user-rankings/ # Personal rankings management
│   ├── globals.css        # Tailwind CSS base styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page with authentication
├── components/            # React components
│   ├── ui/               # Shadcn/ui component library
│   ├── player-table.tsx  # Core draft interface with touch controls
│   ├── player-rankings.tsx # Drag-and-drop ranking system
│   ├── create-draft.tsx  # Reusable draft creation component
│   └── *Various layout and utility components*
├── contexts/             # React Context providers
│   ├── AuthContext.tsx   # Global authentication state
│   └── DraftLayoutContext.tsx # Draft page state management
├── hooks/                # Custom React hooks
│   ├── useSupabaseRealtime.ts # Generic real-time subscription hook
│   ├── usePollingFallback.ts  # Backup polling when real-time fails
│   └── useRealtimeRankings.ts # Specialized rankings real-time sync
├── lib/                  # Utility libraries
│   ├── supabase-server.ts # Server-side Supabase client factory
│   ├── supabase.ts       # Client-side Supabase client
│   ├── api-client.ts     # Type-safe API client with error handling
│   ├── api-auth.ts       # Server-side authentication validation
│   ├── api-responses.ts  # Standardized API response utilities
│   └── utils.ts          # General utility functions
└── types/                # TypeScript type definitions
    └── index.ts          # Comprehensive type definitions
```

### Critical Business Logic Files

#### `/src/app/draft/[draftId]/page.tsx`
**Purpose:** Core draft viewer with real-time synchronization  
**Key Features:**
- Real-time draft pick subscriptions with polling fallback
- Position filtering and player status tracking
- Dual-mode rendering (admin vs viewer capabilities)
- Performance optimization with memoized callbacks

#### `/src/components/player-table.tsx`
**Purpose:** Interactive draft interface with mobile-first design  
**Key Features:**
- Touch-and-hold drafting for mobile (500ms hold time)
- Confirmation dialogs with loading states to prevent race conditions
- Haptic feedback support for mobile devices
- Race condition prevention through disabled states during API calls

#### `/src/hooks/useSupabaseRealtime.ts`
**Purpose:** Generic real-time subscription management  
**Key Features:**
- Automatic reconnection handling with status tracking
- Memory leak prevention through proper cleanup
- Connection state management with fallback triggers
- Filter-based subscriptions for efficient data streaming

#### `/middleware.ts`
**Purpose:** Server-side route protection and security  
**Key Features:**
- Admin token validation with draft ownership verification
- Comprehensive security headers (CSP, XSS protection, etc.)
- Authentication checks with automatic redirects
- Performance optimization through selective middleware application

---

## State Management Architecture

### Global State (React Context)
1. **AuthContext:** User authentication state, session management
2. **DraftLayoutContext:** Draft page UI state (position filters, active views)

### Local State Patterns
- **Optimistic Updates:** Immediate UI feedback with server confirmation
- **Real-time Integration:** Server state managed through custom hooks
- **Error Boundaries:** API errors handled with toast notifications and fallback states

### Data Flow Pattern
```
User Action → Optimistic Update → API Call → Real-time Confirmation → State Cleanup
```

This pattern ensures immediate user feedback while maintaining data consistency across all connected clients.

---

## API Architecture & Integration Points

### Authentication Strategy
- **Public Endpoints:** `/api/public/*` - No authentication required
- **Authenticated Endpoints:** `/api/*` - Requires valid Supabase session
- **Admin Endpoints:** Require both authentication and admin token header

### External Dependencies
1. **Supabase Services:**
   - PostgreSQL database with real-time subscriptions
   - Authentication with email/password and session management
   - Row Level Security (RLS) for data access control
   
2. **Vercel Platform:**
   - Edge function deployment for API routes
   - Static site generation for public pages
   - Automatic preview deployments for development

3. **Core Libraries:**
   - **@dnd-kit:** Drag-and-drop functionality for player rankings
   - **@radix-ui:** Accessible component primitives (dialogs, selects, etc.)
   - **@supabase/ssr:** Server-side rendering support for authentication
   - **sonner:** Toast notification system
   - **zod:** Runtime input validation

---

## Security Implementation

### Route Protection
- **Middleware-based:** Server-side validation before page rendering
- **Token Security:** Admin tokens validated against draft ownership
- **Session Management:** Supabase handles JWT tokens with automatic refresh

### Data Security
- **Row Level Security:** Database-level access control through Supabase policies
- **Input Validation:** Zod schemas validate all API inputs
- **CSRF Protection:** Built-in through Next.js API routes with proper headers

### Security Headers (Applied via Middleware)
```typescript
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: [Restrictive policy allowing only necessary sources]
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Performance Optimizations

### Real-time Performance
- **Connection Pooling:** Single WebSocket connection per client
- **Update Throttling:** 100ms delay prevents excessive re-renders
- **Deduplication:** Prevents duplicate updates from multiple sources
- **Polling Fallback:** 5-second interval when WebSocket fails

### Rendering Performance
- **Memoized Callbacks:** Prevents subscription cycling in useEffect hooks
- **Optimistic Updates:** Immediate UI feedback reduces perceived latency
- **Component Virtualization:** Large player lists handled efficiently
- **Bundle Optimization:** Tree-shaking and code splitting through Next.js

### Database Performance
- **Indexed Queries:** All filtering operations use database indexes
- **Selective Subscriptions:** Real-time updates filtered at database level
- **Connection Pooling:** Supabase handles database connection optimization

---

## Mobile-First Design Patterns

### Touch Interface Optimizations
- **Long-press Drafting:** 500ms hold time with visual feedback
- **Haptic Feedback:** Native vibration API integration
- **Touch Prevention:** Proper CSS to prevent text selection and callouts
- **Responsive Breakpoints:** Mobile-first CSS with progressive enhancement

### Accessibility Features
- **ARIA Labels:** Screen reader support for all interactive elements
- **Keyboard Navigation:** Full keyboard support for all functions
- **Focus Management:** Proper focus handling in modal dialogs
- **Color Contrast:** WCAG AA compliance for all UI elements

---

## Development Workflow & Conventions

### Code Organization Patterns
- **Component Co-location:** Components, styles, and tests in same directory structure
- **Barrel Exports:** Centralized exports through index files
- **Type-First Development:** TypeScript interfaces define API contracts
- **Functional Components:** Hooks-based architecture throughout

### Naming Conventions
- **Files:** kebab-case for components, PascalCase for React components
- **Functions:** camelCase with descriptive verbs
- **Types:** PascalCase interfaces with descriptive prefixes
- **API Routes:** RESTful patterns with HTTP method handlers

### Error Handling Strategy
- **API Errors:** Structured error responses with consistent format
- **UI Errors:** Toast notifications with user-friendly messages
- **Network Errors:** Automatic retries with exponential backoff
- **Fallback States:** Graceful degradation when features unavail

---

## Testing & Quality Assurance

### Current Testing Status
- **Manual Testing:** Extensive manual testing across devices and browsers
- **Real-world Usage:** Active production use by BBFL league provides continuous testing
- **Error Monitoring:** Console logging and error tracking in production

### Testing Gaps (Technical Debt)
- **Unit Tests:** No automated unit test coverage
- **Integration Tests:** No API endpoint testing
- **E2E Tests:** No end-to-end workflow testing
- **Performance Tests:** No automated performance regression testing

### Code Quality Tools
- **ESLint:** Configured with Next.js recommended rules
- **TypeScript:** Strict mode enabled with comprehensive type checking
- **Prettier:** Code formatting (implied by consistent formatting)

---

## Recent Development Focus (2025-09-03)

### Performance & UX Improvements
- **Race Condition Prevention:** Resolved duplicate draft pick issues
- **Loading States:** Added comprehensive loading indicators
- **Confirmation Dialogs:** Implemented confirmation for all destructive actions
- **Optimistic Updates:** Immediate UI feedback for better perceived performance

### Component Architecture Refactoring
- **ActionCard Component:** Reusable card component with size variants
- **BaseTabBar Component:** Extracted common navigation patterns
- **Real-time Optimization:** Enhanced subscription handling and cleanup

### Mobile Experience Enhancements
- **Touch Controls:** Refined long-press timing and feedback
- **Navigation Improvements:** Fixed back button behavior on mobile
- **Header Optimization:** Auto-hide header for better screen real estate

---

## Known Technical Debt & Limitations

### High Priority Technical Debt
1. **Testing Coverage:** Zero automated test coverage across the application
2. **Error Boundaries:** No React error boundaries for graceful failure handling
3. **Performance Monitoring:** No automated performance metrics or alerting
4. **Documentation:** API documentation exists only through code comments

### Medium Priority Technical Debt
1. **Bundle Size:** No bundle analysis or size optimization tracking
2. **Accessibility Audit:** No automated accessibility testing
3. **SEO Optimization:** Minimal meta tags and structured data
4. **Analytics:** No user behavior tracking or usage metrics

### Low Priority Technical Debt
1. **Code Splitting:** Opportunities for better code splitting at route level
2. **Image Optimization:** No image optimization or lazy loading
3. **Progressive Web App:** Could benefit from PWA features
4. **Internationalization:** Hard-coded English strings throughout

---

## Agent Onboarding Context

### Key Architectural Decisions
1. **Real-time First:** Application built around real-time data synchronization
2. **Mobile-first UI:** Touch controls prioritized over desktop interactions
3. **No Registration Required:** Emphasis on ease of access over user tracking
4. **Optimistic Updates:** User experience prioritized through immediate feedback

### Common Development Patterns
1. **API Client Pattern:** Centralized API client with consistent error handling
2. **Custom Hook Pattern:** Reusable hooks for common operations (real-time, polling)
3. **Context + Local State:** Global context for app state, local state for UI
4. **Server-side Validation:** All user inputs validated on server with Zod schemas

### Debugging & Development Tips
1. **Real-time Debugging:** Console logs prefixed with emojis for easy filtering
2. **API Debugging:** All API errors logged with full context
3. **Performance Debugging:** React DevTools Profiler recommended for optimization
4. **Database Debugging:** Supabase dashboard provides query performance metrics

### Integration Points for New Features
1. **New API Endpoints:** Follow existing patterns in `/src/app/api/`
2. **New Components:** Add to `/src/components/` with TypeScript interfaces
3. **New Pages:** Use App Router conventions with proper layouts
4. **New Real-time Features:** Extend existing real-time hooks for consistency

---

## Future Development Roadmap

### Planned Features (from improvements.md and context)
1. **User Authentication Expansion:** OAuth providers, team management
2. **Advanced Analytics:** Draft performance insights, player trend analysis
3. **Multi-league Support:** Support for multiple concurrent leagues
4. **Enhanced Mobile App:** Progressive Web App features, offline support

### Infrastructure Improvements
1. **Testing Framework:** Jest + Testing Library implementation
2. **CI/CD Pipeline:** Automated testing and deployment workflows
3. **Performance Monitoring:** Real user monitoring and alerting
4. **Error Tracking:** Comprehensive error reporting and analysis

### Scaling Considerations
1. **Database Optimization:** Query optimization for large datasets
2. **Real-time Scaling:** Connection pooling for high concurrent usage
3. **CDN Integration:** Static asset optimization and global distribution
4. **Microservices:** Potential service extraction for complex features

---

## Critical Success Factors

### What Makes This Application Successful
1. **Real-time Reliability:** Draft picks sync instantly across all devices
2. **Mobile Experience:** Touch controls feel native and responsive  
3. **No Barriers to Entry:** Anyone can join a draft with just a URL
4. **Performance:** Optimistic updates make the interface feel instant

### Key Metrics to Monitor
1. **Real-time Connection Success Rate:** WebSocket connection reliability
2. **Draft Completion Rate:** Percentage of started drafts completed successfully
3. **Mobile Usage:** Mobile vs desktop usage patterns
4. **Error Rates:** API errors and client-side errors

### Maintenance Priorities
1. **Real-time System Health:** Monitor WebSocket connections and fallbacks
2. **Database Performance:** Query performance and connection pooling
3. **Mobile Compatibility:** Test across devices and browsers regularly
4. **Security Updates:** Keep dependencies updated for security patches

---

## Appendix: Development Commands

### Local Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

### Database Management (Supabase)
```bash
npx supabase start   # Start local Supabase instance
npx supabase stop    # Stop local Supabase instance
npx supabase status  # Check service status
npx supabase reset   # Reset local database
```

### Component Management
```bash
npx shadcn@latest add [component]  # Add new UI components
```

---

**This documentation serves as the foundation for agent handoffs and new developer onboarding. It provides the architectural context, business logic understanding, and practical development guidance needed to effectively contribute to the BBFL Draft Tracker codebase.**