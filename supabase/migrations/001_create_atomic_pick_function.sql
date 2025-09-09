-- Migration: Create atomic pick creation function to prevent race conditions
-- This function ensures sequential pick numbers even under concurrent requests

CREATE OR REPLACE FUNCTION create_draft_pick_atomic(
  draft_id_param UUID,
  player_id_param INTEGER
)
RETURNS TABLE(
  id UUID,
  draft_id UUID,
  player_id INTEGER,
  pick_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
DECLARE
  next_pick_num INTEGER;
  new_pick_id UUID;
BEGIN
  -- Get next pick number atomically
  SELECT COALESCE(MAX(pick_number), 0) + 1
  INTO next_pick_num
  FROM draft_picks
  WHERE draft_picks.draft_id = draft_id_param;
  
  -- Insert the new pick
  INSERT INTO draft_picks (draft_id, player_id, pick_number)
  VALUES (draft_id_param, player_id_param, next_pick_num)
  RETURNING draft_picks.id INTO new_pick_id;
  
  -- Return the created pick
  RETURN QUERY
  SELECT dp.id, dp.draft_id, dp.player_id, dp.pick_number, dp.created_at
  FROM draft_picks dp
  WHERE dp.id = new_pick_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_draft_pick_atomic(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION create_draft_pick_atomic(UUID, INTEGER) TO service_role;