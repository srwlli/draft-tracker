-- Fix the atomic pick creation function - remove created_at reference

DROP FUNCTION IF EXISTS create_draft_pick_atomic(UUID, INTEGER);

CREATE OR REPLACE FUNCTION create_draft_pick_atomic(
  draft_id_param UUID,
  player_id_param INTEGER
)
RETURNS TABLE(
  id UUID,
  draft_id UUID,
  player_id INTEGER,
  pick_number INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
  next_pick_num INTEGER;
  new_pick_id UUID;
BEGIN
  -- Get next pick number atomically with explicit table reference
  SELECT COALESCE(MAX(dp.pick_number), 0) + 1
  INTO next_pick_num
  FROM draft_picks dp
  WHERE dp.draft_id = draft_id_param;
  
  -- Insert the new pick with explicit column names
  INSERT INTO draft_picks (draft_id, player_id, pick_number)
  VALUES (draft_id_param, player_id_param, next_pick_num)
  RETURNING draft_picks.id INTO new_pick_id;
  
  -- Return the created pick with explicit column references
  RETURN QUERY
  SELECT 
    dp.id,
    dp.draft_id,
    dp.player_id,
    dp.pick_number
  FROM draft_picks dp
  WHERE dp.id = new_pick_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_draft_pick_atomic(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION create_draft_pick_atomic(UUID, INTEGER) TO service_role;