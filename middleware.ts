import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Dev-only rate limiter (isolated) — used only in development for /api/* paths
type WindowInfo = { count: number; resetTime: number; firstSeen: number };
const devRateWindows: Map<string, WindowInfo> = new Map();
const DEV_RATE_LIMIT = 100; // requests per window
const DEV_WINDOW_MS = 60 * 1000; // 1 minute
const DEV_MAX_ENTRIES = 10_000; // cap map size in dev

function applyDevRateLimit(request: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== 'development') return null;
  if (!request.nextUrl.pathname.startsWith('/api/')) return null;

  const now = Date.now();
  // Cleanup expired windows and enforce size cap
  for (const [ip, info] of devRateWindows) {
    if (now > info.resetTime) devRateWindows.delete(ip);
  }
  if (devRateWindows.size > DEV_MAX_ENTRIES) {
    // Evict oldest entries by firstSeen
    const entries = Array.from(devRateWindows.entries());
    entries.sort((a, b) => a[1].firstSeen - b[1].firstSeen);
    for (let i = 0; i < entries.length && devRateWindows.size > DEV_MAX_ENTRIES; i++) {
      devRateWindows.delete(entries[i][0]);
    }
  }

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
  const existing = devRateWindows.get(ip);
  
  if (!existing || now > existing.resetTime) {
    devRateWindows.set(ip, { count: 1, resetTime: now + DEV_WINDOW_MS, firstSeen: now });
    return null; // allow
  }

  if (existing.count >= DEV_RATE_LIMIT) {
    const resp = new NextResponse('Too Many Requests', { status: 429 });
    // Minimal rate limit headers for debugging in dev
    resp.headers.set('X-RateLimit-Limit', String(DEV_RATE_LIMIT));
    resp.headers.set('X-RateLimit-Remaining', '0');
    resp.headers.set('X-RateLimit-Reset', new Date(existing.resetTime).toISOString());
    // Apply security headers to the 429 as well
    setSecurityHeaders(resp);
    return resp;
  }

  existing.count += 1;
  devRateWindows.set(ip, existing);
  return null; // allow
}

function generateNonce() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  // Prefer btoa when available in edge/runtime
  // Fallback encodes via URL-safe base64 if needed
  try {
    return btoa(bin);
  } catch {
    // Minimal fallback: convert to hex-like base64 (not expected in edge)
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

function setSecurityHeaders(response: NextResponse) {
  const nonce = generateNonce();
  const isProd = process.env.NODE_ENV === 'production';

  // Enforced CSP (conservative to avoid breaking; no 'unsafe-eval', allow inline for now)
  const enforcedCsp = [
    "default-src 'self'",
    "frame-ancestors 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co"
  ].join('; ');

  // Report-Only CSP (target policy with nonce; does not block yet)
  const reportOnlyCsp = [
    "default-src 'self'",
    "frame-ancestors 'none'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co"
  ].join('; ');

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  response.headers.set('Content-Security-Policy', enforcedCsp);
  if (isProd) {
    response.headers.set('Content-Security-Policy-Report-Only', reportOnlyCsp);
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-site');
    // COEP can break third-party embeds; enable only if validated
    // response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  }
}

export async function middleware(request: NextRequest) {
  // Dev-only rate limiting for API paths
  const limited = applyDevRateLimit(request);
  if (limited) return limited;

  const { pathname } = request.nextUrl;
  
  // Add security headers to all responses
  const response = NextResponse.next();
  // Security headers (from scan recommendations)
  setSecurityHeaders(response);
  
  // Create Supabase client for server-side (used for general auth-aware routing if needed)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  // No route-level admin validation here; rely on API route checks with x-admin-token.
  // Return response with security headers for all routes.
  return response;
}

export const config = {
  matcher: [
    // Apply to admin routes for authentication
    '/draft/:path*/admin/:path*',
    // Apply to all routes for security headers
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};
