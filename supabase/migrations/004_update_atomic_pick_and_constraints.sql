-- Phase 4: Concurrency safety and integrity for draft picks

-- 1) Unique constraints to harden integrity
DO $$ BEGIN
  ALTER TABLE draft_picks
    ADD CONSTRAINT uq_draft_player UNIQUE (draft_id, player_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE draft_picks
    ADD CONSTRAINT uq_draft_pick_number UNIQUE (draft_id, pick_number);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2) Helpful indexes
CREATE INDEX IF NOT EXISTS idx_draft_picks_draft_id ON draft_picks (draft_id);
CREATE INDEX IF NOT EXISTS idx_draft_picks_draft_player ON draft_picks (draft_id, player_id);

-- 3) Concurrency-safe function with row lock and duplicate check
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
SECURITY DEFINER
AS $$
DECLARE
  next_pick_num INTEGER;
  new_pick_id UUID;
BEGIN
  -- Lock the draft row to serialize concurrent pick assignments
  PERFORM 1 FROM drafts d WHERE d.id = draft_id_param FOR UPDATE;

  -- Prevent duplicate drafting of the same player in this draft
  IF EXISTS (
    SELECT 1 FROM draft_picks dp
    WHERE dp.draft_id = draft_id_param AND dp.player_id = player_id_param
  ) THEN
    RAISE EXCEPTION 'Player already drafted' USING ERRCODE = 'P0001';
  END IF;

  -- Compute next pick number atomically within the lock
  SELECT COALESCE(MAX(dp.pick_number), 0) + 1
  INTO next_pick_num
  FROM draft_picks dp
  WHERE dp.draft_id = draft_id_param;

  INSERT INTO draft_picks (draft_id, player_id, pick_number)
  VALUES (draft_id_param, player_id_param, next_pick_num)
  RETURNING draft_picks.id INTO new_pick_id;

  RETURN QUERY
  SELECT dp.id, dp.draft_id, dp.player_id, dp.pick_number
  FROM draft_picks dp
  WHERE dp.id = new_pick_id;
END;
$$;

GRANT EXECUTE ON FUNCTION create_draft_pick_atomic(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION create_draft_pick_atomic(UUID, INTEGER) TO service_role;
