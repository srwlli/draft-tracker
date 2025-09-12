-- Phase 4 — Add integrity constraints and helpful indexes

-- Unique constraints (idempotent via exception guard)
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_draft_picks_draft_id ON draft_picks (draft_id);
CREATE INDEX IF NOT EXISTS idx_draft_picks_draft_player ON draft_picks (draft_id, player_id);

