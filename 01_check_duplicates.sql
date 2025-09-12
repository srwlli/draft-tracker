-- Phase 4 — Pre‑check for duplicates before adding constraints

-- 1) Duplicate player in the same draft (should be zero rows)
SELECT draft_id, player_id, COUNT(*) AS cnt
FROM draft_picks
GROUP BY draft_id, player_id
HAVING COUNT(*) > 1;

-- 2) Duplicate pick_number in the same draft (should be zero rows)
SELECT draft_id, pick_number, COUNT(*) AS cnt
FROM draft_picks
GROUP BY draft_id, pick_number
HAVING COUNT(*) > 1;

