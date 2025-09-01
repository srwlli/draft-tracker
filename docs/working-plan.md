# Working Plan: Require Draft Name Input

## Current State Analysis
**Issue:** Drafts can be created without names, using fallback 'Fantasy Draft'
**Goal:** Require users to enter a meaningful draft name before creation

## Phase 1: Input Validation
### 1.1 Update Create Draft Function
- [ ] Add validation to prevent empty/whitespace-only names
- [ ] Remove 'Fantasy Draft' fallback text
- [ ] Use `draftName.trim()` for clean input processing

### 1.2 UI Feedback
- [ ] Disable create button when name is empty
- [ ] Add visual indication of required field
- [ ] Update button state based on input validation

## Phase 2: User Experience Enhancement
### 2.1 Form Validation
- [ ] Add real-time validation feedback
- [ ] Show error state for empty input attempts
- [ ] Provide clear placeholder text guidance

### 2.2 Input Improvements
- [ ] Make input field more prominent as required
- [ ] Consider minimum/maximum name length limits
- [ ] Add character counter if needed

## Implementation Details

### Code Changes Required
```typescript
// Update createDraft function
const createDraft = async () => {
  if (!user || !draftName.trim()) return;
  
  // Remove fallback, use actual name
  name: draftName.trim()
}

// Update button disabled state
disabled={isLoading || !draftName.trim()}
```

### Validation Rules
- **Required**: Draft name cannot be empty
- **Trimmed**: Remove leading/trailing whitespace
- **Non-empty**: Must contain actual characters after trimming

## Benefits
- **Better Organization**: Users create meaningful draft names
- **Improved UX**: Clear requirement prevents confusion
- **Data Quality**: No generic 'Fantasy Draft' entries
- **User Intent**: Forces deliberate naming choices

## Success Criteria
- ✅ Cannot create draft without entering name
- ✅ Button disabled until valid name entered  
- ✅ Clean input processing with trim()
- ✅ No fallback generic names allowed