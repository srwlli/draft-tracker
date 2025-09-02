# ActionCard Component Implementation Plan

## Problem Statement
Dashboard contains 4 repetitive Card components with identical structure but different content. Need reusable ActionCard component with size variants for app-wide consistency.

## Component Architecture Plan

### ActionCard Component Design
**File:** `/src/components/action-card.tsx`

**Props Interface:**
```typescript
interface ActionCardProps {
  // Content
  icon?: ReactNode;
  title: string;
  description?: string;
  content?: ReactNode;
  
  // Button
  buttonText: string;
  onButtonClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  
  // Layout
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
```

**Size Variants:**
```typescript
const sizeVariants = {
  sm: "col-span-1",                           // Single column (default)
  md: "md:col-span-2",                        // 2 columns on tablet+
  lg: "md:col-span-2 lg:col-span-3",          // 2 on tablet, 3 on desktop
  xl: "md:col-span-2 lg:col-span-4"           // Full width on desktop
};
```

**Built-in Features:**
- CSS Grid layout automatically applied
- Button alignment at bottom
- Consistent spacing and styling
- Loading states for async actions
- Optional content sections

## Implementation Phases

### Phase 1: Create ActionCard Component
**Goal:** Build reusable component with all variants

**Tasks:**
1. Create `/src/components/action-card.tsx`
2. Implement props interface with TypeScript
3. Add size variant system using CVA (class-variance-authority)
4. Include built-in CSS Grid layout (`grid grid-rows-[auto_1fr_auto] h-full`)
5. Add conditional rendering for optional props (icon, description, content)

**Component Structure:**
```tsx
export function ActionCard({
  icon, title, description, content,
  buttonText, onButtonClick, disabled, loading, variant = 'default',
  size = 'sm', className
}: ActionCardProps) {
  return (
    <Card className={cn(
      "grid grid-rows-[auto_1fr_auto] h-full",
      sizeVariants[size],
      className
    )}>
      <CardHeader>
        {icon && (
          <div className="flex items-center space-x-2">
            {icon}
            <CardTitle>{title}</CardTitle>
          </div>
        )}
        {!icon && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      {content && <CardContent>{content}</CardContent>}
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onButtonClick}
          disabled={disabled || loading}
          variant={variant}
        >
          {loading ? 'Loading...' : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Phase 2: Dashboard Refactoring
**Goal:** Replace all dashboard cards with ActionCard component

**Tasks:**
1. Import ActionCard in dashboard page
2. Replace Create Draft card with ActionCard
3. Replace My Drafts card with ActionCard  
4. Replace My Rankings card with ActionCard
5. Replace Join Draft card with ActionCard
6. Remove redundant Card imports

**Before/After Example:**
```tsx
// Before (50+ lines)
<Card className="md:col-span-2 grid grid-rows-[auto_1fr_auto] h-full">
  <CardHeader>
    <div className="flex items-center space-x-2">
      <Plus className="w-5 h-5 text-primary" />
      <CardTitle>Create New Draft</CardTitle>
    </div>
    <CardDescription>Start a new fantasy football draft</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>
    <Button className="w-full" onClick={createDraft}>Create Draft</Button>
  </CardFooter>
</Card>

// After (5 lines)
<ActionCard
  size="md"
  icon={<Plus className="w-5 h-5 text-primary" />}
  title="Create New Draft"
  description="Start a new fantasy football draft"
  content={<DraftForm />}
  buttonText="Create Draft"
  onButtonClick={createDraft}
  loading={isLoading}
/>
```

### Phase 3: Content Extraction
**Goal:** Extract complex content into separate components

**Tasks:**
1. Create `DraftForm` component for Create Draft card content
2. Create `EmptyState` component for placeholder content
3. Update ActionCard calls to use extracted components

**Benefits:**
- Cleaner ActionCard usage
- Reusable form and empty state components
- Better separation of concerns

### Phase 4: App-wide Integration
**Goal:** Use ActionCard throughout application

**Tasks:**
1. Identify other pages with card + button patterns
2. Update My Ranks page to use ActionCard for feature cards
3. Update Settings page sections if applicable
4. Create style guide documentation

**Future Usage Examples:**
```tsx
// Profile page
<ActionCard
  title="Account Settings"
  description="Manage your profile"
  buttonText="Edit Profile"
  onButtonClick={() => router.push('/profile')}
/>

// Feature page
<ActionCard
  size="lg"
  title="Premium Features"
  description="Unlock advanced functionality"
  buttonText="Upgrade Now"
  variant="default"
/>
```

## Technical Implementation

### Component Dependencies
```typescript
// Required imports
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
```

### Size Variant System
```typescript
const actionCardVariants = cva(
  "grid grid-rows-[auto_1fr_auto] h-full",
  {
    variants: {
      size: {
        sm: "col-span-1",
        md: "md:col-span-2", 
        lg: "md:col-span-2 lg:col-span-3",
        xl: "md:col-span-2 lg:col-span-4"
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
);
```

### Responsive Behavior
- **Mobile:** All cards single column regardless of size
- **Tablet:** `md:` prefixes activate 2-column spans
- **Desktop:** `lg:` prefixes activate 3-4 column spans
- **Custom:** className prop overrides for special cases

## Benefits

### Developer Experience
- **Reduced code:** 50+ lines → 5 lines per card
- **Type safety:** Full TypeScript interface
- **Consistent API:** Same props across all usage
- **Easy maintenance:** Update component, changes everywhere

### User Experience  
- **Visual consistency:** Identical card behavior app-wide
- **Button alignment:** Professional layout on all screen sizes
- **Loading states:** Proper feedback for async actions
- **Accessibility:** Built-in ARIA support from shadcn/ui

### Codebase Quality
- **DRY principle:** Single source of truth for card patterns
- **Composability:** Mix and match with any content
- **Scalability:** Easy to add new variants and features
- **Testability:** Single component to test vs multiple implementations

## Success Metrics
- **Code reduction:** 200+ lines → 50 lines for dashboard cards
- **Consistency:** Identical visual behavior across all card usage
- **Maintainability:** Single file to update for card changes
- **Reusability:** Component used in 3+ different pages

## Git Workflow
After implementation and testing:
```bash
git add .
git commit -m "refactor: create reusable ActionCard component with size variants"
git push origin main
```