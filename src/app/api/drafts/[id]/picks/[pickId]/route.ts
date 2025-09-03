import { NextRequest } from 'next/server'
import { createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { apiResponse, apiError } from '@/lib/api-responses'
import { validateAdminToken } from '@/lib/api-auth'

// Replaces: api-endpoint-delete-draft-pick
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; pickId: string }> }
) {
  const { id, pickId } = await params
  
  const adminToken = request.headers.get('x-admin-token')
  if (!adminToken || !(await validateAdminToken(id, adminToken))) {
    return apiError.forbidden()
  }
  
  const supabase = await createServerSupabaseAdminClient()
  
  const { error: deleteError } = await supabase
    .from('draft_picks')
    .delete()
    .eq('id', pickId)
    .eq('draft_id', id) // Double-check ownership
  
  if (deleteError) {
    console.error('Draft pick deletion error:', deleteError)
    return apiError.serverError()
  }
  
  return apiResponse.success({ deleted: true })
}