# Current Status: Auto-Hide Header Implementation

## Current Problem
We're implementing a professional auto-hide header for the Fantasy Football Draft Tracker. The header should only appear when users scroll to the very top of the content, maximizing screen space for the player tables on mobile.

## What We're Trying to Accomplish

### Goal
- Auto-hide header that slides out of view when scrolling down
- Header only reappears when user manually scrolls to absolute top
- Tabs (Position/View) remain sticky and visible during scroll
- Maximum screen space for content on mobile devices

### Current Technical Approach
- **Layout**: Flexbox-based layout with `h-screen` main container
- **Header**: Fixed positioned with transform slide animation
- **Tabs**: Flex-shrink-0 within main container for proper spacing
- **Content**: Flex-1 overflow-auto for scrollable area

### Implementation Challenge
Trying to replace scroll position detection with **Intersection Observer API** (modern best practice) instead of scroll event listeners. The observer should detect when content top is visible to show/hide header.

### Current Issue
Intersection Observer with programmatically created sentinel element isn't working properly. The sentinel positioning is incorrect, causing header to never appear.

### Next Steps
1. Fix Intersection Observer implementation with proper sentinel positioning
2. Ensure header appears/disappears correctly during content changes
3. Test across Available/Drafted/Stats tab switches
4. Verify no scroll jumping or jarring transitions

### Files Being Modified
- `/src/contexts/DraftLayoutContext.tsx` - Header visibility logic
- `/src/app/draft/[draftId]/layout.tsx` - Flexbox layout structure

### Success Criteria
- Header hides on any downward scroll
- Header only shows when scrolled to exact top (scrollTop === 0)
- No automatic header appearance during tab switches
- Smooth transitions without jarring movements
- Professional, non-hacky implementation using modern APIs