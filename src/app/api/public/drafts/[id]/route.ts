import { createServerSupabaseAdminClient } from '@/lib/supabase-server'
import { apiResponse, apiError } from '@/lib/api-responses'

// Replaces: api-operation-fetch-draft + api-operation-get-all-players + api-operation-get-draft-picks
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createServerSupabaseAdminClient()
  
  try {
    // Parallel queries for performance with team JOINs
    const [draftResult, playersResult, picksResult] = await Promise.all([
      supabase.from('drafts').select('*').eq('id', id).single(),
      supabase
        .from('players')
        .select(`
          *,
          teams!players_team_id_fkey (
            id,
            team_name,
            city,
            abbreviation
          )
        `)
        .order('position')
        .order('default_rank'),
      supabase.from('draft_picks').select('*').eq('draft_id', id)
    ])
    
    if (draftResult.error || !draftResult.data) {
      return apiError.notFound()
    }
    
    // Transform data to match current client expectations
    const playersWithStatus = playersResult.data?.map(player => ({
      ...player,
      is_drafted: picksResult.data?.some(pick => pick.player_id === player.id) || false
    })) || []
    
    return apiResponse.success({
      draft: {
        id: draftResult.data.id,
        name: draftResult.data.name,
        created_at: draftResult.data.created_at,
        // Don't expose: admin_token, user_id
      },
      players: playersWithStatus,
      picks: picksResult.data || []
    })
    
  } catch (error) {
    console.error('Public draft fetch error:', error)
    return apiError.serverError()
  }
}