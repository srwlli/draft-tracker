import { createServerSupabaseClient, createServerSupabaseAdminClient } from '@/lib/supabase-server';
import { NextRequest } from 'next/server';
import { apiResponse, apiError } from '@/lib/api-responses';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return apiError.unauthorized();
    }

    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');

    let query = supabase
      .from('user_rankings')
      .select('*')
      .eq('user_id', user.id);

    if (position && position !== 'ALL') {
      query = query.eq('position', position);
    }

    const { data, error } = await query.order('custom_rank');
    if (error) {
      return apiError.serverError();
    }

    return apiResponse.success(data || []);
  } catch {
    return apiError.serverError();
  }
}

export async function POST(request: NextRequest) {
  try {
    const authSupabase = await createServerSupabaseClient();
    const adminSupabase = await createServerSupabaseAdminClient();
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) {
      return apiError.unauthorized();
    }

    const { player_id, custom_rank, position } = await request.json();
    if (!player_id || !custom_rank || !position) {
      return apiResponse.error('Missing required fields', 400);
    }

    const { data, error } = await adminSupabase
      .from('user_rankings')
      .upsert({
        user_id: user.id,
        player_id,
        custom_rank,
        position,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,player_id' })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return apiError.serverError();
    }

    return apiResponse.success(data);
  } catch (error) {
    console.error('API error:', error);
    return apiError.serverError();
  }
}

export async function PUT(request: NextRequest) {
  console.log('PUT /api/user-rankings endpoint called');
  try {
    const authSupabase = await createServerSupabaseClient();
    const adminSupabase = await createServerSupabaseAdminClient();
    console.log('Getting user from auth...');
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) {
      return apiError.unauthorized();
    }

    const { rankings } = await request.json();
    if (!Array.isArray(rankings)) {
      return apiResponse.error('Rankings must be an array', 400);
    }

    const rankingsWithUser = rankings.map((ranking: any) => ({
      user_id: user.id,
      player_id: ranking.player_id,
      custom_rank: ranking.custom_rank,
      position: ranking.position,
      updated_at: new Date().toISOString(),
    }));

    console.log('Attempting to upsert rankings:', rankingsWithUser);

    const { data, error } = await adminSupabase
      .from('user_rankings')
      .upsert(rankingsWithUser, { onConflict: 'user_id,player_id' })
      .select();

    if (error) {
      console.error('Database error:', error);
      return apiError.serverError();
    }

    return apiResponse.success(data || []);
  } catch (error) {
    console.error('API error:', error);
    return apiError.serverError();
  }
}
