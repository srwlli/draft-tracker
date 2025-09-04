// Position types for NFL players
export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'DEF' | 'K';

// Base player interface matching Supabase schema
export interface Player {
  id: number;
  name: string;
  team_id: number;
  position: Position;
  default_rank: number;
}

// Team interface for the new teams table
export interface Team {
  id: number;
  team_name: string;
  city: string;
  abbreviation: string;
  created_at: string;
}

// Draft session interface
export interface Draft {
  id: string;
  admin_token: string;
  created_at: string;
  name?: string;
  user_id: string;
}

// Individual draft pick record
export interface DraftPick {
  id: string;
  draft_id: string;
  player_id: number;
  pick_number: number;
  timestamp: string;
}

// Local storage structure for personal rankings
export interface PersonalRanking {
  player_id: number;
  custom_rank: number;
}

// Database structure for user-specific player rankings
export interface UserRanking {
  id: string;
  user_id: string;
  player_id: number;
  custom_rank: number;
  position: Position;
  created_at: string;
  updated_at: string;
}

// Extended player interface for UI display
export interface PlayerWithStatus extends Player {
  is_drafted: boolean;
  custom_rank?: number;
  teams?: Team; // Supabase JOIN result (note: plural 'teams')
}

// Database response types for Supabase queries
export type PlayersResponse = Player[];
export type DraftResponse = Draft;
export type DraftPicksResponse = DraftPick[];

// Type guards for runtime validation
export function isValidPosition(position: string): position is Position {
  return ['QB', 'RB', 'WR', 'TE', 'DEF', 'K'].includes(position);
}

// Helper type for position counts
export type PositionCounts = Record<Position, number>;