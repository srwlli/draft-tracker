import { createServerSupabaseClient, createServerSupabaseAdminClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authSupabase = await createServerSupabaseClient();
    const adminSupabase = await createServerSupabaseAdminClient();
    
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { player_id, custom_rank, position } = await request.json();

    if (!player_id || !custom_rank || !position) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await adminSupabase
      .from('user_rankings')
      .upsert({
        user_id: user.id,
        player_id,
        custom_rank,
        position,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,player_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { rankings } = await request.json();

    if (!Array.isArray(rankings)) {
      return NextResponse.json({ error: 'Rankings must be an array' }, { status: 400 });
    }

    const rankingsWithUser = rankings.map(ranking => ({
      user_id: user.id,
      player_id: ranking.player_id,
      custom_rank: ranking.custom_rank,
      position: ranking.position,
      updated_at: new Date().toISOString(),
    }));

    console.log('Attempting to upsert rankings:', rankingsWithUser);

    const { data, error } = await adminSupabase
      .from('user_rankings')
      .upsert(rankingsWithUser, {
        onConflict: 'user_id,player_id'
      })
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}