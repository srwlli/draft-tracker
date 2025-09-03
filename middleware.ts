import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers (from scan recommendations)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co;"
  );
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Only protect admin routes
  if (!pathname.includes('/admin/')) {
    return response;
  }

  // Extract draftId and adminToken from URL
  const pathParts = pathname.split('/');
  const draftIndex = pathParts.indexOf('draft');
  const draftId = pathParts[draftIndex + 1];
  const adminToken = pathParts[pathParts.length - 1];

  if (!draftId || !adminToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Create Supabase client for server-side
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

  try {
    // Check user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check draft ownership and admin token
    const { data: draftData, error: draftError } = await supabase
      .from('drafts')
      .select('user_id, admin_token')
      .eq('id', draftId)
      .single();

    if (draftError || !draftData) {
      return NextResponse.redirect(new URL(`/draft/${draftId}`, request.url));
    }

    // Validate ownership and token
    const isOwner = draftData.user_id === user.id;
    const validToken = draftData.admin_token === adminToken;

    if (!isOwner || !validToken) {
      return NextResponse.redirect(new URL(`/draft/${draftId}`, request.url));
    }

    // All checks passed - allow access (preserve security headers)
    return response;
    
  } catch (error) {
    console.error('Middleware auth error:', error);
    return NextResponse.redirect(new URL(`/draft/${draftId}`, request.url));
  }
}

export const config = {
  matcher: [
    // Apply to admin routes for authentication
    '/draft/:path*/admin/:path*',
    // Apply to all routes for security headers
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};