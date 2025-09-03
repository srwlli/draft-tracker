import { NextRequest } from 'next/server'
import { createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { apiResponse, apiError } from '@/lib/api-responses'
import { validateAdminToken } from '@/lib/api-auth'
import { z } from 'zod'

// Input validation schemas
const draftPlayerSchema = z.object({
  playerId: z.number().int().positive('Player ID must be a positive integer')
})

// Replaces: api-endpoint-post-draft-player
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Admin token validation (from middleware pattern)
  const adminToken = request.headers.get('x-admin-token')
  if (!adminToken || !(await validateAdminToken(id, adminToken))) {
    return apiError.forbidden()
  }
  
  try {
    const body = await request.json()
    
    // Input validation with Zod
    const validation = draftPlayerSchema.safeParse(body)
    if (!validation.success) {
      return apiResponse.error(validation.error.errors[0].message, 400)
    }
    
    const { playerId } = validation.data
    
    const supabase = await createServerSupabaseAdminClient()
    
    // Check if player already drafted (prevent duplicates)
    const { data: existingPick } = await supabase
      .from('draft_picks')
      .select('id')
      .eq('draft_id', id)
      .eq('player_id', playerId)
      .single()
    
    if (existingPick) {
      return apiError.conflict('Player already drafted')
    }
    
    // Get next pick number (from workflow pattern)
    const { data: picks } = await supabase
      .from('draft_picks')
      .select('pick_number')
      .eq('draft_id', id)
      .order('pick_number', { ascending: false })
      .limit(1)
    
    const nextPickNumber = (picks?.[0]?.pick_number || 0) + 1
    
    // Create draft pick
    const { data: newPick, error: insertError } = await supabase
      .from('draft_picks')
      .insert({
        draft_id: id,
        player_id: playerId,
        pick_number: nextPickNumber
      })
      .select()
      .single()
    
    if (insertError) {
      console.error('Draft pick creation error:', insertError)
      return apiError.serverError()
    }
    
    // Real-time broadcast happens automatically via Supabase
    return apiResponse.success(newPick, 201)
    
  } catch (error) {
    console.error('Draft player error:', error)
    return apiError.serverError()
  }
}