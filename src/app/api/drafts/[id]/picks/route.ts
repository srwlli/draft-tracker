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
      return apiResponse.error(validation.error.issues[0].message, 400)
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
    
    // Try to use atomic database function first
    let newPick = null
    let insertError = null
    
    // Attempt to use the atomic function
    const rpcResult = await supabase
      .rpc('create_draft_pick_atomic', {
        draft_id_param: id,
        player_id_param: playerId
      })
      .single()
    
    if (rpcResult.error && rpcResult.error.message?.includes('does not exist')) {
      // Fallback to manual insertion if function doesn't exist
      console.warn('Atomic function not found, using fallback method')
      
      // Get the next pick number
      const { data: existingPicks } = await supabase
        .from('draft_picks')
        .select('pick_number')
        .eq('draft_id', id)
        .order('pick_number', { ascending: false })
        .limit(1)
      
      const nextPickNumber = existingPicks && existingPicks.length > 0 
        ? existingPicks[0].pick_number + 1 
        : 1
      
      // Insert the new pick
      const { data: fallbackPick, error: fallbackError } = await supabase
        .from('draft_picks')
        .insert({
          draft_id: id,
          player_id: playerId,
          pick_number: nextPickNumber
        })
        .select('id, draft_id, player_id, pick_number')
        .single()
      
      newPick = fallbackPick
      insertError = fallbackError
    } else {
      newPick = rpcResult.data
      insertError = rpcResult.error
    }
    
    if (insertError) {
      console.error('Draft pick creation error:', insertError)
      
      // Check if the function doesn't exist
      if (insertError.message?.includes('function') && insertError.message?.includes('does not exist')) {
        return apiResponse.error('Database function create_draft_pick_atomic not found. Please run the SQL migration.', 500)
      }
      
      // Check for other RPC errors
      if (insertError.code === 'PGRST202') {
        return apiResponse.error('Database function error: ' + insertError.message, 500)
      }
      
      return apiResponse.error('Failed to create draft pick: ' + insertError.message, 500)
    }
    
    // Real-time broadcast happens automatically via Supabase
    return apiResponse.success(newPick, 201)
    
  } catch (error) {
    console.error('Draft player error:', error)
    return apiError.serverError()
  }
}