import { NextRequest } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { createServerSupabaseClient, createServerSupabaseAdminClient } from './supabase-server'

export async function validateSession(_request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    
    if (error || !user) {
      return { user: null, error: 'Unauthorized' }
    }
    
    return { user, error: null }
  } catch (err) {
    console.error('Validation error:', err)
    return { user: null, error: 'Unauthorized' }
  }
}

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
    
    // Ensure both buffers are same length to prevent timing attacks
    if (expected.length !== actual.length) {
      return false
    }
    
    return timingSafeEqual(expected, actual)
  } catch (error) {
    console.error('Token comparison error:', error)
    return false
  }
}