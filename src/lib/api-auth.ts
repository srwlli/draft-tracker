import { NextRequest } from 'next/server'
import { createServerSupabaseClient, createServerSupabaseAdminClient } from './supabase-server'

export async function validateSession(_request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    console.log('Auth check:', { user: user?.email, error: error?.message })
    
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
  
  return draft?.admin_token === adminToken
}