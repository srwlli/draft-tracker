Phased Plan: Implement Option B (Direct State Update)

  Phase 1: Verify API Response Structure 🔍

  Goal: Confirm the actual API response matches documentation
  1. Check current api.admin.draftPlayer() implementation
  2. Verify it returns the draft pick object (not just success)
  3. Check if any response transformation is needed

  Phase 2: Update Draft Handler (Admin Page) 🔧

  Goal: Implement direct state update in admin page
  1. Modify handleDraftPlayer in admin page
  2. Capture API response into variable
  3. Add setDraftPicks update with returned data
  4. Test admin sees immediate update

  Phase 3: Handle Race Conditions 🚦

  Goal: Prevent conflicts between direct update and real-time
  1. Add logic to ignore real-time updates for picks we just created
  2. Use timestamp or ID matching to detect duplicates
  3. Ensure clean handoff between direct update and real-time

  Phase 4: Add Loading States ⏳

  Goal: Prevent double-clicks and show feedback
  1. Add draftingPlayers state to track in-progress drafts
  2. Disable confirmation dialog during API call
  3. Show loading indicator in dialog
  4. Clear loading state on success/error

  Phase 5: Error Handling & Rollback 🛡️

  Goal: Handle edge cases gracefully
  1. Handle API failures (don't update state)
  2. Handle partial failures (API success but state update fails)
  3. Add error recovery mechanisms
  4. Test error scenarios

  Phase 6: Testing & Validation 🧪

  Goal: Ensure everything works correctly
  1. Test happy path (successful drafts)
  2. Test error cases (network failures, conflicts)
  3. Test with multiple concurrent drafts
  4. Verify real-time still works for other users

  Implementation Priority:

  - Phase 1-2: Essential (core functionality)
  - Phase 3: Important (prevents race conditions)
  - Phase 4: Nice-to-have (better UX)
  - Phase 5-6: Quality assurance