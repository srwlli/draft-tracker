# Changelog Maintenance Prompt

Update the existing changelog document at `/docs/changelog.md` with recent changes by following these steps:     

## Instructions
  1. **Check for new commits** - Use `git log --oneline --pretty=format:"%h %ai %s" -5` to get recent commits      
  since last update
  2. **Read current changelog** - Review existing `/docs/changelog.md` to see what's already documented
  3. **Add new entries** - Only add commits that aren't already in the changelog
  4. **Maintain structure** - Follow existing format and categorization patterns
  5. **Update metadata** - Change "Last updated" date to today

## Update Process
  1. **Identify new commits** - Compare git log with existing changelog entries
  2. **Categorize properly** - Use same categories as existing changelog (Features, Fixes, Refactoring, etc.)      
  3. **Add to appropriate date section** - Create new date section if needed, or add to existing recent
  section
  4. **Preserve existing content** - Only add new entries, don't modify existing ones
  5. **Update focus areas** - Refresh "Recent Focus Areas" if development themes have changed

## Formatting Rules
  - **Consistency first** - Match existing changelog style exactly
  - **No emojis** - Keep professional formatting
  - **Brief descriptions** - One sentence per entry focusing on user impact
  - **Include commit hash** - Always add (`commit-hash`) for traceability
  - **Chronological order** - Most recent changes at top

  ## Quality Checks
  - Verify all new commits are included
  - Check formatting matches existing entries
  - Ensure commit hashes are correct
  - Confirm dates are accurate
  - Update "Last updated" timestamp

  ## Example Addition
  ```markdown
  ### Fixes
  - **Navigation Issue** (`abc1234`) - Fixed mobile back button polling errors with proper router usage