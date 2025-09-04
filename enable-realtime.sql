-- Enable realtime for user_rankings table
-- Run this in your Supabase SQL editor

-- Enable realtime on the user_rankings table
ALTER PUBLICATION supabase_realtime ADD TABLE user_rankings;

-- Optional: If you want to also enable realtime on other tables that might need sync
-- ALTER PUBLICATION supabase_realtime ADD TABLE draft_picks;
-- ALTER PUBLICATION supabase_realtime ADD TABLE drafts;