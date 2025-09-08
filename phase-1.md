# Phase 1: Security Fixes - Precise Implementation Instructions

## 🛡️ **CRITICAL SECURITY FIXES**

### **Fix 1: Remove Console Logging Vulnerability**

**File**: `src/lib/api-auth.ts`
**Line**: 10
**Time**: 30 minutes
**Risk**: 8/10 (Information disclosure)

#### **Current Code:**
```typescript
console.log('Auth check:', { user: user?.email, error: error?.message })
```

#### **Fix Instructions:**
1. **Option A: Complete Removal (Recommended for Production)**
   - Delete line 10 entirely
   - Remove the console.log statement completely

2. **Option B: Sanitized Logging (If logging needed for debugging)**
   ```typescript
   // Replace line 10 with:
   console.log('Auth check:', { 
     hasUser: !!user, 
     userIdPrefix: user?.id?.substring(0, 8) + '...', 
     hasError: !!error 
   })
   ```

#### **Implementation Steps:**
1. Open `src/lib/api-auth.ts`
2. Navigate to line 10
3. Delete: `console.log('Auth check:', { user: user?.email, error: error?.message })`
4. Save file
5. Test authentication flow still works

---

### **Fix 2: Implement Timing-Safe Token Comparison**

**File**: `src/lib/api-auth.ts`
**Line**: 32
**Time**: 1 hour
**Risk**: 7/10 (Token enumeration attack)

#### **Current Code:**
```typescript
return draft?.admin_token === adminToken
```

#### **Fix Instructions:**

1. **Add crypto import** at the top of the file (after line 1):
   ```typescript
   import { timingSafeEqual } from 'crypto'
   ```

2. **Replace line 32** with secure comparison:
   ```typescript
   // Replace: return draft?.admin_token === adminToken
   // With:
   if (!draft?.admin_token || !adminToken) {
     return false
   }
   
   try {
     const expected = Buffer.from(draft.admin_token, 'utf8')
     const actual = Buffer.from(adminToken, 'utf8')
     
     // Ensure both buffers are same length to prevent timing attacks
     if (expected.length !== actual.length) {
       return false
     }
     
     return timingSafeEqual(expected, actual)
   } catch (error) {
     console.error('Token comparison error:', error)
     return false
   }
   ```

#### **Implementation Steps:**
1. Open `src/lib/api-auth.ts`
2. Add crypto import after line 1
3. Replace the simple comparison on line 32 with the secure implementation above
4. Test admin token validation still works
5. Verify error handling works for malformed tokens

#### **Final validateAdminToken function should look like:**
```typescript
export async function validateAdminToken(draftId: string, adminToken: string) {
  const supabase = await createServerSupabaseAdminClient()
  
  const { data: draft } = await supabase
    .from('drafts')
    .select('admin_token, user_id')
    .eq('id', draftId)
    .single()
  
  if (!draft?.admin_token || !adminToken) {
    return false
  }
  
  try {
    const expected = Buffer.from(draft.admin_token, 'utf8')
    const actual = Buffer.from(adminToken, 'utf8')
    
    if (expected.length !== actual.length) {
      return false
    }
    
    return timingSafeEqual(expected, actual)
  } catch (error) {
    console.error('Token comparison error:', error)
    return false
  }
}
```

---

### **Fix 3: Add Rate Limiting Middleware**

**Time**: 2-3 hours
**Risk**: 9/10 (Service availability)

#### **Step 3.1: Install Rate Limiting Dependencies**

```bash
npm install @upstash/ratelimit @upstash/redis
```

#### **Step 3.2: Create Rate Limiting Middleware**

**New File**: `src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create Redis instance (configure with your Upstash credentials)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Create rate limiter
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  analytics: true,
})

export async function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? '127.0.0.1'
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_middleware_${ip}`
    )

    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
        },
      })
    }

    // Add rate limit headers to successful requests
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', new Date(reset).toISOString())
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
}
```

#### **Step 3.3: Environment Variables**

**File**: `.env.local` (add these variables)

```env
# Upstash Redis for rate limiting
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

#### **Step 3.4: Alternative: Simple In-Memory Rate Limiting (Development)**

If you don't want to set up Upstash immediately, create a simpler version:

**File**: `src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (not suitable for production clusters)
const requests = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = 100 // requests per minute
const WINDOW_MS = 60 * 1000 // 1 minute

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? '127.0.0.1'
    const now = Date.now()
    
    const userRequests = requests.get(ip)
    
    // Reset if window expired
    if (!userRequests || now > userRequests.resetTime) {
      requests.set(ip, { count: 1, resetTime: now + WINDOW_MS })
      return NextResponse.next()
    }
    
    // Check if rate limit exceeded
    if (userRequests.count >= RATE_LIMIT) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(userRequests.resetTime).toISOString(),
        },
      })
    }
    
    // Increment counter
    userRequests.count++
    requests.set(ip, userRequests)
    
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', RATE_LIMIT.toString())
    response.headers.set('X-RateLimit-Remaining', (RATE_LIMIT - userRequests.count).toString())
    response.headers.set('X-RateLimit-Reset', new Date(userRequests.resetTime).toISOString())
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
```

## 🧪 **Testing Phase 1 Fixes**

### **Test 1: Console Logging**
1. Run the app in development
2. Trigger authentication
3. Check browser console - should not see user emails
4. Check server logs - should not contain sensitive data

### **Test 2: Timing-Safe Comparison**
1. Test valid admin token - should work normally
2. Test invalid admin token - should fail securely
3. Test malformed token - should handle gracefully

### **Test 3: Rate Limiting**
1. Make rapid API requests (>100 in 1 minute)
2. Should receive 429 status after limit
3. Check rate limit headers in response
4. Wait for reset time - should work again

## ✅ **Success Criteria for Phase 1**

- [ ] No sensitive data in console logs
- [ ] Secure token comparison implemented
- [ ] Rate limiting active on all API routes
- [ ] All existing functionality still works
- [ ] No new errors introduced

## 📋 **Files Modified in Phase 1**

1. `src/lib/api-auth.ts` - Security fixes
2. `src/middleware.ts` - Rate limiting (new file)
3. `.env.local` - Environment variables (if using Upstash)

**Estimated Total Time**: 3.5-4.5 hours