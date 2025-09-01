# Working Plan: Next.js Middleware Authentication

## Current State Analysis
**Problem:** Using route groups incorrectly for URL-based authentication
**Modern Solution:** Next.js middleware for route protection with proper authentication checks

## Phase 1: Restore Proper File Structure
### 1.1 Move Admin Page Back
- [ ] Create `/src/app/draft/[draftId]/admin/[adminToken]/` directory
- [ ] Move admin page from `(admin)/[adminToken]/page.tsx` to `admin/[adminToken]/page.tsx`
- [ ] Delete `(admin)` route group directory

### 1.2 Update Navigation URL
- [ ] Change dashboard navigation back to `/draft/${draftId}/admin/${adminToken}`
- [ ] Remove `(admin)` from URL path

## Phase 2: Create Middleware Authentication
### 2.1 Create Middleware File
- [ ] Create `/middleware.ts` in project root
- [ ] Import NextRequest, NextResponse from Next.js
- [ ] Add Supabase client for server-side auth checking

### 2.2 Implement Authentication Logic
- [ ] Check if request path contains `/admin/`
- [ ] Verify user authentication via Supabase session
- [ ] Validate draft ownership (user_id matches authenticated user)
- [ ] Redirect unauthorized users to viewer page

### 2.3 Configure Middleware Matcher
- [ ] Set matcher to protect only admin routes: `/draft/:path*/admin/:path*`
- [ ] Ensure public routes (viewer, landing) remain unprotected

## Phase 3: Server-Side Authentication
### 3.1 Middleware Implementation
```typescript
// middleware.ts structure
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.includes('/admin/')) {
    // Extract draftId and adminToken from URL
    // Check Supabase session from cookies
    // Validate user owns the draft
    // Redirect if unauthorized
  }
}

export const config = {
  matcher: '/draft/:path*/admin/:path*'
}
```

### 3.2 Security Validation
- [ ] Check user authentication from request cookies
- [ ] Query draft ownership from database
- [ ] Validate admin token matches
- [ ] Return appropriate redirects for each failure case

## Phase 4: Remove Client-Side Auth Checks
### 4.1 Simplify Admin Page
- [ ] Remove authentication logic from admin page component
- [ ] Remove admin layout authentication checks
- [ ] Rely on middleware for all authentication

### 4.2 Clean Up Context
- [ ] Keep admin state management in DraftLayoutContext
- [ ] Remove redundant authentication checks from components
- [ ] Trust that middleware handles all security

## Phase 5: Testing & Validation
### 5.1 Authentication Flow Testing
- [ ] Test unauthenticated users redirected from admin URLs
- [ ] Test authenticated non-owners redirected from admin URLs
- [ ] Test authenticated owners can access their admin pages
- [ ] Verify viewer access remains completely public

### 5.2 Edge Case Testing
- [ ] Test invalid admin tokens
- [ ] Test non-existent draft IDs
- [ ] Test expired or invalid user sessions
- [ ] Verify middleware doesn't affect other routes

## Final Architecture
```
Authentication Flow:
1. User visits /draft/123/admin/456
2. Middleware checks:
   - Is user authenticated? (session cookies)
   - Does user own draft 123? (database query)
   - Does admin token match? (token validation)
3. If all pass: Allow access
4. If any fail: Redirect to /draft/123 (viewer)

File Structure:
- middleware.ts (root) - Route protection
- /draft/[id]/admin/[token]/page.tsx - Admin interface
- /draft/[id]/page.tsx - Public viewer
- No route groups needed
```

## Benefits of Middleware Approach
- **Server-side security** - Runs before page loads
- **Clean separation** - Authentication logic separate from UI
- **Performance** - No client-side redirects or loading states
- **Industry standard** - How experienced developers handle route protection
- **Scalable** - Easy to add more protected routes

## Success Criteria
- ✅ Middleware protects all admin routes automatically
- ✅ Authentication happens server-side before page load
- ✅ No client-side authentication complexity
- ✅ Public viewer access unaffected
- ✅ Clean, maintainable code following Next.js best practices