import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (not suitable for production clusters)
const requests = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = 100 // requests per minute
const WINDOW_MS = 60 * 1000 // 1 minute

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') ||
              '127.0.0.1'
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