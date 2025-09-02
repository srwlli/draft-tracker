# Working Plan: Client-Side to API Routes Migration

## Overview
**Objective:** Convert 27 identified client-side Supabase operations to server-side API routes  
**Complexity:** 3/10 (Well-documented operations, clear patterns)  
**Risk:** 1/10 (Complete documentation, app not live, easy rollback)  
**Timeline:** 2-3 days of focused work  
**Approach:** Complete migration with comprehensive testing

---

## Executive Summary

Based on the comprehensive API scan, the draft-tracker uses a **client-side database architecture** with 27 distinct operations across 4 main categories:

- **Draft Management**: 8 operations (create, fetch, update)
- **Player Operations**: 6 operations (fetch all, query by position)
- **Draft Pick Operations**: 9 operations (fetch, insert, delete, real-time)
- **Authentication**: 4 operations (session, sign-out, middleware validation)

**Key Finding**: All operations are well-documented with clear patterns, making migration straightforward.

---

## Step 1: Infrastructure Setup (2-3 hours)

### 1.1 Server-Side Supabase Client
```typescript
// src/lib/supabase-server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabaseClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Server-side key
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### 1.2 Authentication Helpers
```typescript
// src/lib/api-auth.ts
import { NextRequest } from 'next/server'
import { createServerSupabaseClient } from './supabase-server'

export async function validateSession(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { user: null, error: 'Unauthorized' }
  }
  
  return { user, error: null }
}

export async function validateAdminToken(draftId: string, adminToken: string) {
  const supabase = createServerSupabaseClient()
  
  const { data: draft } = await supabase
    .from('drafts')
    .select('admin_token, user_id')
    .eq('id', draftId)
    .single()
  
  return draft?.admin_token === adminToken
}
```

### 1.3 API Response Helpers
```typescript
// src/lib/api-responses.ts
import { NextResponse } from 'next/server'

export const apiResponse = {
  success: <T>(data: T, status: number = 200) => 
    NextResponse.json({ data }, { status }),
    
  error: (message: string, status: number = 400) => 
    NextResponse.json({ 
      error: { 
        message, 
        code: status,
        timestamp: new Date().toISOString() 
      } 
    }, { status }),
}

export const apiError = {
  unauthorized: () => apiResponse.error('Unauthorized', 401),
  forbidden: () => apiResponse.error('Forbidden', 403),
  notFound: () => apiResponse.error('Not found', 404),
  conflict: (message: string) => apiResponse.error(message, 409),
  serverError: () => apiResponse.error('Internal server error', 500),
}
```

---

## Step 2: Public API Routes (3-4 hours)

Based on scan results, these operations need public access:

### 2.1 GET /api/public/drafts/[id]/route.ts
```typescript
// Replaces: api-operation-fetch-draft + api-operation-get-all-players + api-operation-get-draft-picks
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabaseClient()
  
  try {
    // Parallel queries for performance (from scan recommendation)
    const [draftResult, playersResult, picksResult] = await Promise.all([
      supabase.from('drafts').select('*').eq('id', params.id).single(),
      supabase.from('players').select('*').order('position').order('default_rank'),
      supabase.from('draft_picks').select('*').eq('draft_id', params.id)
    ])
    
    if (draftResult.error || !draftResult.data) {
      return apiError.notFound()
    }
    
    // Transform data to match current client expectations
    const playersWithStatus = playersResult.data?.map(player => ({
      ...player,
      is_drafted: picksResult.data?.some(pick => pick.player_id === player.id) || false
    })) || []
    
    return apiResponse.success({
      draft: {
        id: draftResult.data.id,
        name: draftResult.data.name,
        created_at: draftResult.data.created_at,
        // Don't expose: admin_token, user_id
      },
      players: playersWithStatus,
      picks: picksResult.data || []
    })
    
  } catch (error) {
    console.error('Public draft fetch error:', error)
    return apiError.serverError()
  }
}
```

---

## Step 3: Authenticated API Routes (4-5 hours)

Based on scan results, these operations require authentication:

### 3.1 GET/POST /api/drafts/route.ts
```typescript
// Replaces: api-endpoint-get-user-drafts + api-endpoint-post-create-draft
export async function GET(request: NextRequest) {
  const { user, error } = await validateSession(request)
  if (error) return apiError.unauthorized()
  
  const supabase = createServerSupabaseClient()
  
  const { data: drafts, error: dbError } = await supabase
    .from('drafts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  
  if (dbError) {
    console.error('Drafts fetch error:', dbError)
    return apiError.serverError()
  }
  
  return apiResponse.success(drafts)
}

export async function POST(request: NextRequest) {
  const { user, error } = await validateSession(request)
  if (error) return apiError.unauthorized()
  
  try {
    const body = await request.json()
    const { name } = body
    
    // Input validation (from security recommendations)
    if (!name || typeof name !== 'string' || !name.trim()) {
      return apiResponse.error('Draft name is required', 400)
    }
    
    if (name.length > 100) {
      return apiResponse.error('Draft name too long', 400)
    }
    
    const supabase = createServerSupabaseClient()
    const adminToken = crypto.randomUUID()
    
    const { data: draft, error: dbError } = await supabase
      .from('drafts')
      .insert({
        name: name.trim(),
        user_id: user.id,
        admin_token: adminToken
      })
      .select()
      .single()
    
    if (dbError) {
      console.error('Draft creation error:', dbError)
      return apiError.serverError()
    }
    
    return apiResponse.success({
      ...draft,
      admin_token: adminToken // Only return on creation
    }, 201)
    
  } catch (error) {
    console.error('Draft creation error:', error)
    return apiError.serverError()
  }
}
```

### 3.2 DELETE /api/drafts/[id]/route.ts
```typescript
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await validateSession(request)
  if (error) return apiError.unauthorized()
  
  const supabase = createServerSupabaseClient()
  
  // Verify ownership before deletion
  const { data: draft } = await supabase
    .from('drafts')
    .select('user_id')
    .eq('id', params.id)
    .single()
  
  if (!draft || draft.user_id !== user.id) {
    return apiError.forbidden()
  }
  
  const { error: deleteError } = await supabase
    .from('drafts')
    .delete()
    .eq('id', params.id)
  
  if (deleteError) {
    console.error('Draft deletion error:', deleteError)
    return apiError.serverError()
  }
  
  return apiResponse.success({ deleted: true })
}
```

---

## Step 4: Admin API Routes (3-4 hours)

Based on scan results, these operations require admin token validation:

### 4.1 POST /api/drafts/[id]/picks/route.ts
```typescript
// Replaces: api-endpoint-post-draft-player
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Admin token validation (from middleware pattern)
  const adminToken = request.headers.get('x-admin-token')
  if (!adminToken || !(await validateAdminToken(params.id, adminToken))) {
    return apiError.forbidden()
  }
  
  try {
    const body = await request.json()
    const { playerId } = body
    
    // Input validation
    if (!playerId || typeof playerId !== 'number') {
      return apiResponse.error('Player ID is required', 400)
    }
    
    const supabase = createServerSupabaseClient()
    
    // Check if player already drafted (prevent duplicates)
    const { data: existingPick } = await supabase
      .from('draft_picks')
      .select('id')
      .eq('draft_id', params.id)
      .eq('player_id', playerId)
      .single()
    
    if (existingPick) {
      return apiError.conflict('Player already drafted')
    }
    
    // Get next pick number (from workflow pattern)
    const { data: picks } = await supabase
      .from('draft_picks')
      .select('pick_number')
      .eq('draft_id', params.id)
      .order('pick_number', { ascending: false })
      .limit(1)
    
    const nextPickNumber = (picks?.[0]?.pick_number || 0) + 1
    
    // Create draft pick
    const { data: newPick, error: insertError } = await supabase
      .from('draft_picks')
      .insert({
        draft_id: params.id,
        player_id: playerId,
        pick_number: nextPickNumber
      })
      .select()
      .single()
    
    if (insertError) {
      console.error('Draft pick creation error:', insertError)
      return apiError.serverError()
    }
    
    // Real-time broadcast happens automatically via Supabase
    return apiResponse.success(newPick, 201)
    
  } catch (error) {
    console.error('Draft player error:', error)
    return apiError.serverError()
  }
}
```

### 4.2 DELETE /api/drafts/[id]/picks/[pickId]/route.ts
```typescript
// Replaces: api-endpoint-delete-draft-pick
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; pickId: string } }
) {
  const adminToken = request.headers.get('x-admin-token')
  if (!adminToken || !(await validateAdminToken(params.id, adminToken))) {
    return apiError.forbidden()
  }
  
  const supabase = createServerSupabaseClient()
  
  const { error: deleteError } = await supabase
    .from('draft_picks')
    .delete()
    .eq('id', params.pickId)
    .eq('draft_id', params.id) // Double-check ownership
  
  if (deleteError) {
    console.error('Draft pick deletion error:', deleteError)
    return apiError.serverError()
  }
  
  return apiResponse.success({ deleted: true })
}
```

---

## Step 5: Frontend API Client (3-4 hours)

Based on the 27 operations documented in the scan:

### 5.1 API Client Implementation
```typescript
// src/lib/api-client.ts
class DraftTrackerAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed')
    }
    
    return data.data
  }
  
  // Public endpoints
  public = {
    getDraftData: (draftId: string) =>
      this.request<{draft: Draft, players: PlayerWithStatus[], picks: DraftPick[]}>
        (`/api/public/drafts/${draftId}`),
  }
  
  // Authenticated endpoints
  drafts = {
    list: () => 
      this.request<Draft[]>('/api/drafts'),
    
    create: (name: string) =>
      this.request<Draft>('/api/drafts', {
        method: 'POST',
        body: JSON.stringify({ name }),
      }),
      
    delete: (draftId: string) =>
      this.request<{deleted: boolean}>(`/api/drafts/${draftId}`, {
        method: 'DELETE',
      }),
  }
  
  // Admin endpoints
  admin = {
    draftPlayer: (draftId: string, playerId: number, adminToken: string) =>
      this.request<DraftPick>(`/api/drafts/${draftId}/picks`, {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: JSON.stringify({ playerId }),
      }),
      
    undraftPlayer: (draftId: string, pickId: string, adminToken: string) =>
      this.request<{deleted: boolean}>(`/api/drafts/${draftId}/picks/${pickId}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken },
      }),
  }
}

export const api = new DraftTrackerAPI()
```

### 5.2 Update Components (Replace all 27 operations)
```typescript
// src/app/(auth)/dashboard/page.tsx - Replace api-operation-create-draft
const createDraft = async () => {
  try {
    setIsLoading(true)
    const draft = await api.drafts.create(draftName.trim())
    router.push(`/draft/${draft.id}/admin/${draft.admin_token}`)
  } catch (error) {
    console.error('Error creating draft:', error)
    toast.error('Failed to create draft')
  } finally {
    setIsLoading(false)
  }
}

// src/app/draft/[draftId]/page.tsx - Replace 3 operations with 1 API call
useEffect(() => {
  const fetchData = async () => {
    try {
      const { draft, players, picks } = await api.public.getDraftData(draftId)
      setDraft(draft)
      setPlayers(players) // Already includes is_drafted flag
      setDraftPicks(picks)
    } catch (error) {
      console.error('Error fetching draft data:', error)
    }
  }
  
  fetchData()
}, [draftId])

// src/app/draft/[draftId]/admin/[adminToken]/page.tsx - Replace admin operations
const handleDraftPlayer = async (playerId: number) => {
  try {
    await api.admin.draftPlayer(draftId, playerId, adminToken)
    toast.success('Player drafted successfully')
  } catch (error) {
    console.error('Error drafting player:', error)
    toast.error(error.message || 'Failed to draft player')
  }
}
```

---

## Step 6: Keep Real-time Subscriptions (1 hour)

**CRITICAL**: Real-time subscriptions must remain client-side (as documented in scan):

### 6.1 Preserve WebSocket Connections
```typescript
// src/hooks/useSupabaseRealtime.ts - NO CHANGES
// Keep exactly as documented in api-endpoint-realtime-subscribe-draft-picks

// Real-time subscriptions work with API routes because:
// 1. API routes modify database
// 2. Database triggers real-time events
// 3. Client receives events and updates UI
// 4. No conflict with API approach
```

### 6.2 Update Real-time Event Handling
```typescript
// Only change: When real-time events arrive, don't modify local state directly
// Instead, optionally refetch data via API for consistency

useSupabaseRealtime('draft_picks', async (payload) => {
  setRealtimeConnected(true)
  
  // Option A: Update local state (current approach - keep this)
  if (payload.eventType === 'INSERT' && payload.new) {
    setDraftPicks(current => [...current, payload.new as DraftPick])
  }
  
  // Option B: Refetch via API (more consistent but slower)
  // const { picks } = await api.public.getDraftData(draftId)
  // setDraftPicks(picks)
}, { column: 'draft_id', value: draftId })
```

---

## Step 7: Testing & Validation (2-3 hours)

Based on scan findings (currently 0% test coverage):

### 7.1 API Route Tests
```typescript
// __tests__/api/drafts.test.ts
describe('/api/drafts', () => {
  it('GET returns user drafts when authenticated', async () => {
    const response = await fetch('/api/drafts', {
      headers: { Cookie: authenticatedUserCookie }
    })
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data.data)).toBe(true)
  })
  
  it('POST creates draft with valid data', async () => {
    const response = await fetch('/api/drafts', {
      method: 'POST',
      headers: { 
        Cookie: authenticatedUserCookie,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Test Draft' })
    })
    
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.data.name).toBe('Test Draft')
    expect(data.data.admin_token).toBeDefined()
  })
})
```

### 7.2 Integration Tests
```typescript
// Test complete workflows from scan documentation
describe('Draft Workflow Integration', () => {
  it('complete draft creation and player drafting flow', async () => {
    // 1. Create draft
    const draft = await api.drafts.create('Integration Test')
    expect(draft.id).toBeDefined()
    
    // 2. Fetch draft data
    const { players, picks } = await api.public.getDraftData(draft.id)
    expect(players.length).toBeGreaterThan(0)
    expect(picks.length).toBe(0)
    
    // 3. Draft a player
    const firstPlayer = players[0]
    const pick = await api.admin.draftPlayer(draft.id, firstPlayer.id, draft.admin_token)
    expect(pick.player_id).toBe(firstPlayer.id)
    expect(pick.pick_number).toBe(1)
  })
})
```

### 7.3 Error Scenario Tests
```typescript
// Test error scenarios identified in scan
describe('Error Handling', () => {
  it('handles invalid admin token', async () => {
    await expect(
      api.admin.draftPlayer('draft-id', 1, 'invalid-token')
    ).rejects.toThrow('Forbidden')
  })
  
  it('prevents duplicate player drafting', async () => {
    // Draft player once
    await api.admin.draftPlayer(draftId, playerId, adminToken)
    
    // Try to draft same player again
    await expect(
      api.admin.draftPlayer(draftId, playerId, adminToken)
    ).rejects.toThrow('Player already drafted')
  })
})
```

---

## Step 8: Security Enhancements (1-2 hours)

Based on security analysis from scan:

### 8.1 Input Validation
```typescript
// Add to each API route
import { z } from 'zod'

const createDraftSchema = z.object({
  name: z.string().min(1).max(100).trim()
})

const draftPlayerSchema = z.object({
  playerId: z.number().int().positive()
})

// Use in routes:
const { name } = createDraftSchema.parse(await request.json())
```

### 8.2 Security Headers
```typescript
// middleware.ts - Add security headers
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Security headers (from scan recommendations)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'"
  )
  
  return response
}
```

---

## Success Criteria & Rollback Plan

### ✅ Success Criteria
- [ ] All 27 identified operations migrated to API routes
- [ ] Real-time subscriptions working unchanged
- [ ] All existing functionality preserved
- [ ] Comprehensive test coverage added (>80%)
- [ ] Enhanced security headers implemented
- [ ] Performance maintained or improved
- [ ] No client-side database credentials

### 🔄 Rollback Plan
Since app isn't live, simple approach:
1. **Don't merge PR** if issues found
2. **Revert to main branch** if problems after merge
3. **Feature flag approach**: Add `USE_API_ROUTES=false` environment variable

---

## Expected Timeline

| Phase | Duration | Status |
|-------|----------|---------|
| Infrastructure Setup | 3 hours | ⏳ |
| Public API Routes | 4 hours | ⏳ |
| Authenticated Routes | 5 hours | ⏳ |
| Admin Routes | 4 hours | ⏳ |
| Frontend Migration | 4 hours | ⏳ |
| Real-time Preservation | 1 hour | ⏳ |
| Testing & Validation | 3 hours | ⏳ |
| Security Enhancements | 2 hours | ⏳ |
| **Total** | **26 hours** | ⏳ |

---

## Key Benefits Post-Migration

1. **Enhanced Security**: Server-side validation, no client-side credentials
2. **Better Error Handling**: Consistent error responses, proper status codes
3. **Performance Monitoring**: Can add logging, metrics, caching
4. **Business Logic**: Centralized validation and processing
5. **API Documentation**: Clear REST endpoints for future integrations
6. **Testing**: Comprehensive test coverage for reliability

This migration transforms the draft-tracker from a client-side database app to a proper full-stack application while preserving all existing functionality and real-time features.