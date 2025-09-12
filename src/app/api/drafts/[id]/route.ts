import { NextRequest } from 'next/server'
import { createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { apiResponse, apiError } from '@/lib/api-responses'
import { validateSession } from '@/lib/api-auth'
import { z } from 'zod'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const paramsSchema = z.object({ id: z.string().uuid('Invalid draft ID') })
  const validation = paramsSchema.safeParse({ id })
  if (!validation.success) {
    return apiResponse.error(validation.error.issues[0].message, 400)
  }
  
  const { user, error } = await validateSession(request)
  if (error || !user) return apiError.unauthorized()
  
  const supabase = await createServerSupabaseAdminClient()
  
  // Verify ownership before deletion
  const { data: draft } = await supabase
    .from('drafts')
    .select('user_id')
    .eq('id', id)
    .single()
  
  if (!draft || draft.user_id !== user.id) {
    return apiError.forbidden()
  }
  
  const { error: deleteError } = await supabase
    .from('drafts')
    .delete()
    .eq('id', id)
  
  if (deleteError) {
    console.error('Draft deletion error:', deleteError)
    return apiError.serverError()
  }
  
  return apiResponse.success({ deleted: true })
}
