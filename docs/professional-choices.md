# Professional Development Standards

## Core Principle
**ALWAYS implement solutions that experienced, professional developers would choose in production environments. NO hacky workarounds, temporary fixes, or outdated patterns.**

## Layout & Positioning

### ✅ Professional Approaches
- **Flexbox/Grid**: Use `flex-1`, `flex-shrink-0`, `grid-template-columns` for intrinsic sizing
- **Viewport Units**: `h-screen`, `w-full` for container dimensions
- **Logical Properties**: `margin-inline`, `padding-block` for future-proof spacing
- **CSS Containment**: `overflow-auto` for efficient scroll containers

### ❌ Avoid These Patterns
- Manual `calc()` calculations with magic numbers
- Absolute positioning for layout structure  
- Fixed pixel heights that break on content changes
- JavaScript-based layout calculations

## State Management & Effects

### ✅ Professional Approaches
- **React Context**: Centralized state with TypeScript interfaces
- **useRef Hooks**: DOM references over `document.getElementById`
- **Proper Dependencies**: Complete useEffect dependency arrays with cleanup
- **Declarative JSX**: React elements over DOM manipulation

### ❌ Avoid These Patterns
- `createElement()` and `appendChild()` in useEffect
- Missing cleanup functions in useEffect
- Direct DOM queries in React components
- State updates without proper dependency tracking

## Browser APIs & Events

### ✅ Professional Approaches
- **Intersection Observer API**: For scroll detection and visibility changes
- **Passive Event Listeners**: Non-blocking scroll and touch handlers
- **Modern Clipboard API**: With proper fallbacks for HTTP contexts
- **CSS Transitions**: Hardware-accelerated animations
- **Transform Properties**: `translate` for performant position changes

### ❌ Avoid These Patterns
- Scroll event listeners with position calculations
- `setInterval` for animation loops
- Blocking event listeners without `passive: true`
- JavaScript animations over CSS transitions

## TypeScript & Code Quality

### ✅ Professional Approaches
- **Strict Typing**: Complete interfaces for all props and context
- **Null Safety**: Proper null checks and optional chaining
- **Generic Types**: Reusable type definitions
- **Exhaustive Dependencies**: Complete useEffect and useCallback deps

### ❌ Avoid These Patterns
- `any` types or missing type definitions
- Unused variables or imports
- Missing null checks on DOM references
- Incomplete dependency arrays

## CSS & Styling

### ✅ Professional Approaches
- **Utility Classes**: Tailwind CSS for consistent design system
- **Responsive Design**: Mobile-first with logical breakpoints
- **CSS Custom Properties**: Dynamic theming and values
- **Semantic HTML**: Proper element structure for accessibility

### ❌ Avoid These Patterns
- Inline styles for layout logic
- Fixed pixel values for responsive design
- Non-semantic div/span soup
- Missing accessibility attributes

## Performance & Optimization

### ✅ Professional Approaches
- **Code Splitting**: Dynamic imports for large components
- **Memoization**: React.memo and useMemo for expensive operations
- **Debounced Updates**: Throttled state changes for rapid interactions
- **Optimistic Updates**: Immediate UI feedback with rollback capability

### ❌ Avoid These Patterns
- Unnecessary re-renders from improper dependencies
- Synchronous operations blocking the main thread
- Missing loading states for async operations
- Memory leaks from uncleaned event listeners

## Decision Framework

When implementing any feature, ask:

1. **Is this how React documentation recommends it?**
2. **Would this pattern scale to enterprise applications?**
3. **Does this follow current web standards (2024+)?**
4. **Would a senior developer approve this in code review?**
5. **Is this maintainable without comments explaining "why"?**

## Implementation Order

1. **Research**: Check existing codebase patterns first
2. **Modern API**: Use latest browser/React APIs available
3. **Type Safety**: Implement with complete TypeScript coverage  
4. **Performance**: Optimize for mobile and low-end devices
5. **Accessibility**: Ensure keyboard/screen reader compatibility
6. **Testing**: Verify across different content states and screen sizes

## Code Examples

### Professional Layout Pattern
```typescript
// ✅ Professional: Flexbox with intrinsic sizing
<main className="h-screen flex flex-col">
  <nav className="flex-shrink-0">Navigation</nav>
  <div className="flex-1 overflow-auto">Content</div>
</main>

// ❌ Avoid: Manual calculations
<main style={{ height: 'calc(100vh - 64px)' }}>
  <div style={{ paddingTop: '64px' }}>Content</div>
</main>
```

### Professional State Management
```typescript
// ✅ Professional: Context with proper typing
interface ContextType {
  value: string;
  ref: React.RefObject<HTMLElement | null>;
}

// ❌ Avoid: Direct DOM manipulation
useEffect(() => {
  document.getElementById('element').style.display = 'none';
}, []);
```

### Professional Event Handling
```typescript
// ✅ Professional: Intersection Observer
useEffect(() => {
  const observer = new IntersectionObserver(callback, options);
  if (elementRef.current) observer.observe(elementRef.current);
  return () => observer.disconnect();
}, []);

// ❌ Avoid: Scroll position tracking
useEffect(() => {
  const handler = () => setVisible(window.scrollY < 50);
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}, []);
```

## Remember
**Professional developers write code that other professionals can maintain, extend, and deploy to production without hesitation. Every implementation should meet this standard.**