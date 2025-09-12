import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { apiResponse, apiError } from '@/lib/api-responses'
import { validateSession } from '@/lib/api-auth'
import { z } from 'zod'

// Input validation schemas
const createDraftSchema = z.object({
  name: z.string().min(1, 'Draft name is required').max(100, 'Draft name too long').trim()
})

// Replaces: api-endpoint-get-user-drafts
export async function GET(request: NextRequest) {
  const { user, error } = await validateSession(request)
  if (error || !user) {
    console.log('GET /api/drafts - Auth failed:', error)
    return apiError.unauthorized()
  }
  
  const supabase = await createServerSupabaseAdminClient()
  
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

// Replaces: api-endpoint-post-create-draft
export async function POST(request: NextRequest) {
  const { user, error } = await validateSession(request)
  if (error || !user) {
    console.log('POST /api/drafts - Auth failed:', error)
    return apiError.unauthorized()
  }
  
  try {
    const body = await request.json()
    
    // Input validation with Zod
    const validation = createDraftSchema.safeParse(body)
    if (!validation.success) {
      return apiResponse.error(validation.error.issues[0].message, 400)
    }
    
    const { name } = validation.data
    
    const supabase = await createServerSupabaseAdminClient()
    const adminToken = crypto.randomUUID()
    
    const { data: draft, error: dbError } = await supabase
      .from('drafts')
      .insert({
        name,
        user_id: user.id,
        admin_token: adminToken
      })
      .select()
      .single()
    
    if (dbError) {
      console.error('Draft creation error:', dbError)
      return apiError.serverError()
    }
    // Build response without exposing admin_token
    const res = NextResponse.json({ data: draft }, { status: 201 })
    // Set HttpOnly admin cookie for this draft
    const cookieName = `dt_admin_${draft.id}`
    const maxAge = 12 * 60 * 60 // 12 hours
    res.headers.append(
      'Set-Cookie',
      `${cookieName}=${encodeURIComponent(adminToken)}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Strict; Secure`
    )
    return res
    
  } catch (error) {
    console.error('Draft creation error:', error)
    return apiError.serverError()
  }
}
