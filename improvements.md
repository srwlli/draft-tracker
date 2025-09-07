Testing scaffold (Vitest + Playwright) with a few "golden path" E2E specs (create draft → make picks → real-time sync).

React error boundary at app root + draft page boundary.

Zod schemas → OpenAPI generation for REST routes (or co-locate route zod + typed client).

CI (GitHub Actions): lint, typecheck, unit, integration, E2E, preview deploy.

Basic RUM (Vercel Analytics or minimal web-vitals capture) + error tracking.

A11y lint + Axe CI check on critical pages.

Bundle guardrails: analyze, fail CI on >X kB increases.

Route-level code-splitting for admin vs viewer surfaces.

SEO pass: title/description, canonical, structured data for public draft pages.

Analytics events: draft_created, pick_made, pick_undone, connection_state_changed.

## Feature Enhancements

### My Locks Page Enhancement
- **Player Population**: Integrate with player database to populate available players
- **Prop Categories**: Add betting prop categories (passing yards, rushing TDs, receptions, etc.)
- **Confidence Rating System**: Implement 1-10 confidence scale for lock picks
- **Group Lock Rooms**: Real-time collaborative lock selection with friends

### My Players Module
- **Custom Player Tracking**: Allow users to create and manage custom player watchlists
- **Player Notes**: Add personal notes and tags for tracked players
- **Performance Alerts**: Notifications for tracked player updates

### Draft Scoring System
- **Scoring Settings**: Configurable league scoring (PPR, Standard, Half-PPR, SuperFlex)
- **Custom Scoring Rules**: Advanced scoring customization (bonuses, penalties)
- **Draft Grade Calculator**: Post-draft team analysis and scoring

### Weekly Rankings & Tracking
- **My Ranks Weekly**: Track and update player rankings throughout season
- **Pick Performance**: Historical tracking of draft pick success rates  
- **Trend Analysis**: Week-over-week ranking changes and insights

### Real Roster Integration
- **Live Stats Integration**: Connect with ESPN/Yahoo/NFL APIs for real-time stats
- **Roster Management**: Sync with actual fantasy league rosters
- **Performance Dashboard**: Real-time player performance vs. draft position

## UI/UX Improvements

### Collapsible Components
- **Import Collapsible Components**: Add expandable/collapsible sections for better organization
- **Module Reorganization**: Break large sections into collapsible modules for improved UX
- **Progressive Disclosure**: Show basic info first, expand for detailed views

### Sharing Capabilities
- **Public Rankings Share**: Generate shareable links for custom player rankings
- **Draft Results Export**: Export completed drafts as PDFs or shareable web pages
- **Social Media Integration**: Quick share buttons for draft highlights and lock picks
- **League Comparison**: Share and compare rankings/picks with league mates
- **Embed Widgets**: Embeddable draft boards and rankings for external sites

### ELO Rating System for Users
- **User Draft Performance ELO**: Rate users based on draft pick success and team performance
- **Head-to-Head League Comparisons**: Users gain/lose ELO points based on league standings vs opponents
- **Prediction Accuracy ELO**: ELO adjustments based on accuracy of player predictions and rankings
- **Draft Value ELO**: Rate users on ability to find value picks (players who outperform ADP)
- **Historical ELO Tracking**: Track user ELO progression across seasons and drafts
- **ELO-Based Matchmaking**: Match users with similar ELO ratings for competitive leagues
- **Skill-Based Leaderboards**: Global and league-specific ELO rankings for drafting expertise
- **ELO Decay System**: Gradual rating decay for inactive users to maintain competitive balance