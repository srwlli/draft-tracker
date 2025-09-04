import { Draft, DraftPick, Player, UserRanking } from '@/types';

// Extended types for API responses
interface PlayerWithStatus extends Player {
  is_drafted: boolean;
}

interface DraftData {
  draft: {
    id: string;
    name?: string;
    created_at: string;
  };
  players: PlayerWithStatus[];
  picks: DraftPick[];
}

class DraftTrackerAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
      ...options,
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error?.message || result.error || result.message || 'API request failed')
    }
    
    return result.data || result
  }
  
  // Public endpoints
  public = {
    getDraftData: (draftId: string) =>
      this.request<DraftData>(`/api/public/drafts/${draftId}`),
  }
  
  // Authenticated endpoints
  drafts = {
    list: () => 
      this.request<Draft[]>('/api/drafts'),
    
    create: (name: string) =>
      this.request<Draft>('/api/drafts', {
        method: 'POST',
        body: JSON.stringify({ name }),
      }),
      
    delete: (draftId: string) =>
      this.request<{deleted: boolean}>(`/api/drafts/${draftId}`, {
        method: 'DELETE',
      }),
  }
  
  // User rankings endpoints
  rankings = {
    get: (position?: string) => {
      const url = position ? `/api/user-rankings?position=${position}` : '/api/user-rankings';
      return this.request<UserRanking[]>(url);
    },
    
    save: (player_id: number, custom_rank: number, position: string) =>
      this.request<UserRanking>('/api/user-rankings', {
        method: 'POST',
        body: JSON.stringify({ player_id, custom_rank, position }),
      }),
    
    saveMultiple: (rankings: Array<{player_id: number, custom_rank: number, position: string}>) =>
      this.request<UserRanking[]>('/api/user-rankings', {
        method: 'PUT',
        body: JSON.stringify({ rankings }),
      }),
  }
  
  // Admin endpoints
  admin = {
    draftPlayer: (draftId: string, playerId: number, adminToken: string) =>
      this.request<DraftPick>(`/api/drafts/${draftId}/picks`, {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: JSON.stringify({ playerId }),
      }),
      
    undraftPlayer: (draftId: string, pickId: string, adminToken: string) =>
      this.request<{deleted: boolean}>(`/api/drafts/${draftId}/picks/${pickId}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken },
      }),
  }
}

export const api = new DraftTrackerAPI()