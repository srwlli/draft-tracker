# Prompt for TypeScript Type Creation

I need you to create the necessary TypeScript type definitions for our Fantasy Football Draft Tracker application. Here's what I need you to do:

1. Create a `src/types` directory if it doesn't already exist
2. Create a file called `src/types/index.ts` that will contain all our core type definitions

The types should include:
- Player interface (id, name, team, position, default_rank)
- Draft interface (id, admin_token, created_at, name)
- DraftPick interface (id, draft_id, player_id, pick_number, timestamp)
- PersonalRanking interface for localStorage (player_id, custom_rank)
- Position type (QB, RB, WR, TE, DEF, K)
- PlayerWithStatus extending Player (adding is_drafted, custom_rank)

These types will provide type safety throughout our application, enable code autocompletion, and serve as documentation for our data structures. They'll be used in components, API routes, and database interactions.

After creating the types, we'll move on to setting up the database schema in Supabase and building the basic page structure.
