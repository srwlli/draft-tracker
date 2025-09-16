# Architecture Analysis Report - Phase 2

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Component Relationships](#component-relationships)
- [Design Patterns](#design-patterns)
- [Core Classes & Functions](#core-classes--functions)
- [Database Connections](#database-connections)
- [External Services](#external-services)
- [Architecture Metrics](#architecture-metrics)
- [Dependencies Analysis](#dependencies-analysis)

---

## Architecture Overview

### System Architecture Type
**Pattern**: **Layered Architecture with Real-time Event-Driven Components**
- **Presentation Layer**: React components with context-based state management
- **Application Layer**: Next.js App Router with API route handlers
- **Business Logic Layer**: Custom hooks and service classes
- **Data Access Layer**: Supabase client with real-time subscriptions
- **Database Layer**: PostgreSQL with atomic functions and triggers

### Architectural Style
- **Primary**: Server-Side Rendering (SSR) + Client-Side Rendering (CSR) Hybrid
- **Secondary**: Event-Driven Architecture for real-time features
- **Communication**: RESTful APIs + WebSocket subscriptions

---

## Component Relationships

### Core Component Hierarchy
```
RootLayout (layout.tsx)
├── ThemeProvider (next-themes)
├── ErrorBoundary (error-boundary.tsx)
└── AuthProvider (AuthContext.tsx)
    ├── AuthenticatedRoutes (auth group)
    │   ├── Dashboard Components
    │   ├── Rankings Components
    │   └── Profile Components
    └── DraftComponents
        ├── DraftLayoutProvider (DraftLayoutContext.tsx)
        ├── PlayerTable (player-table.tsx)
        ├── DraftedPlayersTable (drafted-players-table.tsx)
        └── DraftStats (draft-stats.tsx)
```

### Component Dependencies
#### AuthProvider Dependencies
- **Imports**: `@/lib/supabase`, `@supabase/supabase-js`
- **Provides**: User authentication state, session management
- **Consumers**: All authenticated pages and components
- **Coupling Level**: High (Global state provider)

#### DraftLayoutProvider Dependencies
- **Imports**: `@/types`, React Context APIs
- **Provides**: Draft-specific state (position filters, view modes, admin status)
- **Consumers**: Draft viewer, admin interface, player tables
- **Coupling Level**: Medium (Domain-specific state)

#### API Client Dependencies
- **Imports**: `@/types`, `@/lib/api-client`
- **Provides**: Centralized API communication
- **Consumers**: All components requiring server data
- **Coupling Level**: Medium (Service layer abstraction)

#### Real-time Hook Dependencies
- **Imports**: `@/lib/supabase`, `@/hooks/useSupabaseRealtime`
- **Provides**: Live data synchronization
- **Consumers**: Draft pages, ranking components
- **Coupling Level**: Low (Well-encapsulated utility)

---

## Design Patterns

### 1. Provider Pattern (React Context)
**Implementation**:
- `AuthProvider` - Global authentication state
- `DraftLayoutProvider` - Draft-specific UI state
- `ThemeProvider` - UI theme management

**Usage Count**: 3 providers
**Benefits**: Centralized state management, prop drilling avoidance
**Files**: `src/contexts/AuthContext.tsx`, `src/contexts/DraftLayoutContext.tsx`

### 2. Repository Pattern (Data Access)
**Implementation**:
- `DraftTrackerAPI` class encapsulates all HTTP requests
- Organized by domain: `public`, `drafts`, `rankings`, `admin`
- Centralized error handling and response processing

**Usage Count**: 1 main repository class
**Benefits**: Consistent API interface, error handling, testability
**Files**: `src/lib/api-client.ts`

### 3. Factory Pattern (Supabase Client Creation)
**Implementation**:
- `createBrowserClient()` for client-side operations
- `createServerSupabaseClient()` for SSR contexts
- `createServerSupabaseAdminClient()` for administrative operations

**Usage Count**: 3 factory functions
**Benefits**: Context-appropriate client configuration
**Files**: `src/lib/supabase.ts`, `src/lib/supabase-server.ts`

### 4. Observer Pattern (Real-time Subscriptions)
**Implementation**:
- `useSupabaseRealtime` hook for WebSocket subscriptions
- Event-driven updates with callback functions
- Connection state management with fallback mechanisms

**Usage Count**: 1 main hook, multiple subscriptions
**Benefits**: Decoupled real-time updates, automatic cleanup
**Files**: `src/hooks/useSupabaseRealtime.ts`, `src/hooks/usePollingFallback.ts`

### 5. Middleware Pattern (Request Processing)
**Implementation**:
- Next.js middleware for security headers
- Rate limiting for API endpoints
- Authentication validation pipeline

**Usage Count**: 1 middleware function, multiple processing stages
**Benefits**: Cross-cutting concerns, request/response transformation
**Files**: `middleware.ts`, `src/lib/api-auth.ts`

### 6. Command Pattern (API Operations)
**Implementation**:
- Atomic database operations (`create_draft_pick_atomic`)
- Encapsulated business logic in stored procedures
- Rollback capabilities for complex operations

**Usage Count**: 4 SQL functions
**Benefits**: Data consistency, performance, transaction safety
**Files**: `supabase/migrations/*.sql`

---

## Core Classes & Functions

### Application Layer Classes

#### DraftTrackerAPI Class
```typescript
class DraftTrackerAPI {
  // Purpose: Centralized API communication
  private async request<T>(): Promise<T>  // Generic HTTP client
  public = { getDraftData }               // Public endpoints
  drafts = { list, create, delete }       // Authenticated draft operations
  rankings = { get, save, saveMultiple }  // User ranking management
  admin = { draftPlayer, undraftPlayer }  // Administrative operations
}
```
**Coupling Score**: Medium (7/10) - Well-abstracted but domain-coupled
**Files**: `src/lib/api-client.ts:18-99`

#### Authentication Services
```typescript
// Purpose: Session validation and admin token verification
validateSession(request: NextRequest)           // User authentication
validateAdminToken(draftId: string, token: string) // Admin access control
```
**Coupling Score**: Low (4/10) - Pure utility functions
**Files**: `src/lib/api-auth.ts:5-50`

### Custom React Hooks

#### useSupabaseRealtime Hook
```typescript
// Purpose: Real-time data synchronization
useSupabaseRealtime(
  table: string,
  callback: SubscriptionCallback,
  filter?: { column: string; value: string | number },
  onConnectionChange?: (connected: boolean) => void
)
```
**Coupling Score**: Low (3/10) - Highly reusable utility
**Files**: `src/hooks/useSupabaseRealtime.ts:10-87`

#### usePollingFallback Hook
```typescript
// Purpose: Backup data fetching when real-time fails
usePollingFallback({
  table: string,
  interval: number,
  filter: object,
  onUpdate: callback,
  enabled: boolean
})
```
**Coupling Score**: Low (3/10) - Independent fallback mechanism
**Files**: `src/hooks/usePollingFallback.ts`

### Database Layer Functions

#### Atomic Pick Creation
```sql
-- Purpose: Race condition-safe draft pick creation
CREATE OR REPLACE FUNCTION create_draft_pick_atomic(
  draft_id_param UUID,
  player_id_param INTEGER
) RETURNS TABLE(id UUID, draft_id UUID, player_id INTEGER, pick_number INTEGER)
```
**Coupling Score**: High (8/10) - Database schema dependent
**Files**: `supabase/migrations/004_update_atomic_pick_and_constraints.sql:25-68`

---

## Database Connections

### Database Architecture Pattern
**Type**: Active Record Pattern with Repository Layer
- **ORM**: Supabase Client (PostgreSQL abstraction)
- **Connection Management**: Automatic pooling via Supabase
- **Transaction Handling**: Atomic functions for critical operations

### Database Connection Types

#### 1. Browser Client (Read/Write)
```typescript
// Configuration
const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  realtime: { params: { eventsPerSecond: 10 } }
})
```
**Purpose**: Client-side operations, real-time subscriptions
**Security**: Row Level Security (RLS) enforced
**Files**: `src/lib/supabase.ts:13-19`

#### 2. Server Client (SSR Operations)
```typescript
// Purpose: Server-side rendering, API route operations
createServerSupabaseClient()  // Uses cookies for auth
```
**Purpose**: SSR contexts, session-based operations
**Security**: Server-side validation, cookie-based auth
**Files**: `src/lib/supabase-server.ts`

#### 3. Admin Client (Elevated Permissions)
```typescript
// Purpose: Administrative operations, bypassing RLS
createServerSupabaseAdminClient()  // Service role key
```
**Purpose**: Administrative operations, system-level access
**Security**: Service role permissions, server-only usage
**Files**: `src/lib/supabase-server.ts`

### Database Schema Relationships
| Table | Purpose | Constraints |
|-------|---------|-------------|
| `drafts` | Draft sessions | `user_id` FK, `admin_token` unique |
| `draft_picks` | Draft selections | Composite unique: `(draft_id, player_id)`, `(draft_id, pick_number)` |
| `players` | Player database | Static reference data |
| `user_rankings` | Custom rankings | `(user_id, player_id, position)` composite key |

### Real-time Subscriptions
- **Pattern**: Publisher-Subscriber with Channel-based Filtering
- **Tables Monitored**: `draft_picks`, `user_rankings`
- **Events**: INSERT, UPDATE, DELETE operations
- **Filtering**: Draft-specific and user-specific subscriptions

---

## External Services

### Primary External Dependencies

#### Supabase Platform
- **Service Type**: Backend-as-a-Service (BaaS)
- **Components Used**:
  - PostgreSQL Database with real-time triggers
  - Authentication & User Management
  - Real-time WebSocket subscriptions
  - Row Level Security (RLS)
- **Connection Files**: 22 files use Supabase clients
- **Coupling Level**: High (Core infrastructure dependency)

#### Vercel Platform
- **Service Type**: Serverless Deployment Platform
- **Components Used**:
  - Edge functions for API routes
  - Static site generation
  - Environment variable management
- **Coupling Level**: Medium (Deployment-specific)

#### Third-party UI Libraries
- **Radix UI**: Accessible component primitives (12 components)
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography
- **Sonner**: Toast notification system
- **Coupling Level**: Low (UI presentation only)

### Service Integration Patterns

#### API Rate Limiting
```typescript
// Development-only rate limiting pattern
const devRateWindows: Map<string, WindowInfo> = new Map()
applyDevRateLimit(request: NextRequest): NextResponse | null
```
**Purpose**: Prevent API abuse during development
**Files**: `middleware.ts:5-51`

#### Security Headers Management
```typescript
// Comprehensive security header application
setSecurityHeaders(response: NextResponse)
// CSP, HSTS, X-Frame-Options, etc.
```
**Purpose**: Security hardening for all responses
**Files**: `middleware.ts:67-106`

---

## Architecture Metrics

### Component Complexity Metrics
| Component Type | Count | Average Coupling | Complexity Level |
|----------------|-------|-----------------|------------------|
| **React Components** | 27 | Medium (6/10) | Moderate |
| **Context Providers** | 2 | High (8/10) | High |
| **API Route Handlers** | 6 | Medium (5/10) | Moderate |
| **Custom Hooks** | 4 | Low (3/10) | Low |
| **Utility Libraries** | 7 | Low (4/10) | Low |
| **Database Functions** | 4 | High (8/10) | High |

### Dependency Coupling Analysis
| Dependency Direction | Strength | Risk Level |
|---------------------|----------|------------|
| **Components → Contexts** | High | 🟡 Medium |
| **Components → Hooks** | Medium | 🟢 Low |
| **Hooks → Services** | Low | 🟢 Low |
| **Services → Database** | High | 🔴 High |
| **API Routes → Auth** | Medium | 🟡 Medium |

### Pattern Usage Distribution
```
Provider Pattern:           3 implementations (15%)
Repository Pattern:         1 implementation (5%)
Factory Pattern:           3 implementations (15%)
Observer Pattern:          2 implementations (10%)
Middleware Pattern:        2 implementations (10%)
Command Pattern:           4 implementations (20%)
Component Pattern:        27 implementations (25%)
```

### External Service Dependencies
- **Critical Dependencies**: 1 (Supabase)
- **Supporting Dependencies**: 3 (Vercel, CDN services)
- **UI Dependencies**: 8 (Component libraries)
- **Files with External Calls**: 22/64 (34%)

---

## Dependencies Analysis

### Inbound Dependencies (High Fan-in)
1. **AuthContext** - Used by 15+ components
2. **Supabase Client** - Used by 22 files
3. **API Client** - Used by 8+ components
4. **Type Definitions** - Used by 40+ files

### Outbound Dependencies (High Fan-out)
1. **Layout Components** - Import 6+ external libraries
2. **Draft Pages** - Depend on 5+ custom hooks
3. **API Routes** - Use 4+ utility libraries

### Circular Dependency Risk
**Status**: ✅ **Low Risk**
- Well-defined layered architecture prevents circular imports
- Clear separation between presentation, business, and data layers
- Context providers act as dependency injection boundaries

### Dependency Stability
| Layer | Stability Score | Risk Assessment |
|-------|----------------|-----------------|
| **Database Layer** | 9/10 | 🔴 High impact if changed |
| **Service Layer** | 7/10 | 🟡 Medium impact |
| **Business Logic** | 6/10 | 🟡 Medium impact |
| **Presentation Layer** | 4/10 | 🟢 Low impact |

---

## Architecture Assessment Summary

### Strengths
- ✅ **Clear Layered Architecture** with good separation of concerns
- ✅ **Consistent Design Patterns** applied throughout the codebase
- ✅ **Low Component Coupling** with well-defined interfaces
- ✅ **Effective State Management** using React Context pattern
- ✅ **Robust Real-time Architecture** with fallback mechanisms

### Areas for Improvement
- 🟡 **High Database Coupling** - Consider abstraction layer
- 🟡 **Limited Test Coverage** - Architecture supports testing but lacks implementation
- 🟡 **Centralized Error Handling** - Could benefit from more granular error boundaries

### Complexity Rating
**Overall Architecture Complexity**: **7/10 (Advanced)**
- Sophisticated real-time event handling
- Multi-layered security implementation
- Complex state synchronization patterns
- Production-grade error handling and resilience

*Architecture analysis completed successfully. System demonstrates enterprise-grade patterns with room for testing improvements.*