# Draft Tracker Enhancement Plan

## Current MVP vs Enhanced Version

### MVP (Current)
- Simple URL-based access (no login)
- Single admin with token
- Basic real-time drafting
- Mobile-optimized UI

### Enhanced Version (Planned)
- User authentication system
- Multi-team draft management
- Individual player accounts
- Personal rankings and settings
- Dark mode support

## Phase 1: Authentication System

### 1.1 Supabase Auth Setup
- Enable Supabase Authentication
- Configure email/password authentication
- Add social login options (Google, Apple)
- Set up email verification

### 1.2 Database Schema Updates
```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES profiles(id),
  draft_id UUID REFERENCES drafts(id),
  draft_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Update drafts table
ALTER TABLE drafts ADD COLUMN 
  created_by UUID REFERENCES profiles(id),
  max_teams INTEGER DEFAULT 12,
  draft_started BOOLEAN DEFAULT FALSE,
  current_pick INTEGER DEFAULT 1;

-- User rankings table
CREATE TABLE user_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  player_id UUID REFERENCES players(id),
  custom_rank INTEGER,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User settings table
CREATE TABLE user_settings (
  user_id UUID REFERENCES profiles(id) PRIMARY KEY,
  theme TEXT DEFAULT 'light', -- 'light' or 'dark'
  notifications_enabled BOOLEAN DEFAULT TRUE,
  auto_refresh_interval INTEGER DEFAULT 5000,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 1.3 Authentication Components
- Login/Register forms
- Protected route wrapper
- User profile management
- Password reset functionality

## Phase 2: Team Management

### 2.1 Draft Creation Flow
- Create draft with team count (8, 10, 12, 14, 16)
- Generate team join codes/links
- Draft commissioner role (creates/manages draft)
- Snake draft order randomization

### 2.2 Team Features
- Team name customization
- Team roster view
- Pick history per team
- Team statistics

### 2.3 Draft Room Management
- Pre-draft lobby (teams join, set draft order)
- Draft timer per pick (optional)
- Auto-pick from rankings if timer expires
- Draft pause/resume controls

## Phase 3: Enhanced User Experience

### 3.1 Personal Rankings
- Import from ESPN, Yahoo, FantasyPros
- Drag-and-drop customization
- Tier-based organization
- Notes per player
- Export/import rankings

### 3.2 Settings Page
- Dark/light theme toggle with system preference
- Notification preferences
- Auto-refresh settings
- Data export options
- Account management

### 3.3 Dark Mode Implementation
```typescript
// Theme context
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

// Tailwind dark mode classes
// Use 'dark:' prefix for all components
```

## Phase 4: Advanced Features

### 4.1 Draft Analytics
- Pick value analysis
- Position scarcity tracking
- Team needs assessment
- Draft grade calculations

### 4.2 Real-time Enhancements
- Draft chat/comments
- Pick notifications
- Live draft audio/video (optional)
- Mobile push notifications

### 4.3 League Management
- Multiple drafts per league
- Keeper/dynasty support
- Trade tracking
- Season-long integration

## Implementation Priority

### High Priority (Core Auth Features)
1. Supabase Auth setup and login flow
2. Database schema migration
3. Protected routes and user context
4. Team creation and management
5. Enhanced draft flow with team assignments

### Medium Priority (UX Improvements)
1. Personal rankings system
2. Settings page with dark mode
3. Draft room lobby and timer
4. Team roster management

### Low Priority (Advanced Features)
1. Analytics and insights
2. Chat and notifications
3. Multiple draft types
4. Import/export functionality

## Migration Strategy

### Database Migration
- Create new tables alongside existing
- Migrate existing drafts to new schema
- Maintain backward compatibility during transition
- Add foreign key constraints

### Frontend Migration
- Implement auth context
- Update existing components to use user data
- Add new authenticated routes
- Preserve existing URL structure for bookmarks

### Deployment Strategy
- Feature flags for gradual rollout
- A/B testing for new vs old flow
- Rollback plan for each phase
- Performance monitoring

## Technical Considerations

### State Management
- Consider Zustand or React Context for complex state
- Sync user settings with database
- Offline support for rankings

### Performance
- Implement caching for player data
- Optimize real-time subscriptions
- Lazy loading for large datasets

### Security
- Row Level Security (RLS) policies
- API rate limiting
- Input validation and sanitization
- Secure token management

## Success Metrics
- User registration and retention
- Draft completion rates
- Mobile engagement
- Real-time sync reliability
- Page load performance