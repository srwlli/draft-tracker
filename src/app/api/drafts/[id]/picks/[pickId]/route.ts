import { NextRequest } from 'next/server'
import { createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { apiResponse, apiError } from '@/lib/api-responses'
import { validateAdminToken } from '@/lib/api-auth'
import { z } from 'zod'

// Replaces: api-endpoint-delete-draft-pick
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; pickId: string }> }
) {
  const { id, pickId } = await params

  const paramsSchema = z.object({ id: z.string().uuid('Invalid draft ID'), pickId: z.string().uuid('Invalid pick ID') })
  const validation = paramsSchema.safeParse({ id, pickId })
  if (!validation.success) {
    return apiResponse.error(validation.error.issues[0].message, 400)
  }
  
  const cookieName = `dt_admin_${id}`
  const cookieToken = request.cookies.get(cookieName)?.value || ''
  const headerToken = request.headers.get('x-admin-token') || ''
  const token = cookieToken || headerToken
  if (!token || !(await validateAdminToken(id, token))) {
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
