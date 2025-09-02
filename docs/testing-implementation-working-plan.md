# Testing Implementation Working Plan

## Executive Summary
Transform draft-tracker from **zero test coverage** to **comprehensive testing infrastructure** with focus on real-time features, mobile interactions, and authentication security.

**Current State:** No testing infrastructure exists  
**Target State:** 85%+ test coverage with automated CI/CD pipeline  
**Timeline:** 6 weeks phased implementation  
**Priority:** Critical - Real-time application requires robust testing

---

## Phase 1: Foundation Setup (Week 1)

### Goals
- Install and configure testing infrastructure
- Create basic test utilities and setup files
- Test framework integration with Next.js and TypeScript

### Tasks

#### 1.1 Install Dependencies
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

#### 1.2 Create Configuration Files
**jest.config.js:**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}
```

#### 1.3 Setup Files
**src/setupTests.ts:**
```typescript
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills for Node.js test environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Navigator for haptic feedback tests
Object.defineProperty(navigator, 'vibrate', {
  writable: true,
  value: jest.fn()
});
```

#### 1.4 Update package.json Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --coverage --ci --watchAll=false"
  }
}
```

### Success Criteria
- ✅ Testing framework runs without errors
- ✅ Basic test passes
- ✅ Coverage reporting works
- ✅ TypeScript integration functional

---

## Phase 2: Core Component Testing (Week 2-3)

### Goals
- Test ActionCard component system
- Test authentication flows
- Create reusable testing utilities

### Priority Components

#### 2.1 ActionCard Component Testing
**File:** `src/components/__tests__/action-card.test.tsx`

**Test Categories:**
- **Props Validation:** Icon, title, description, content rendering
- **Size Variants:** sm/md/lg/xl responsive behavior
- **Button Integration:** Click handling, loading states, disabled states
- **CSS Grid Layout:** Button alignment and equal heights

```typescript
describe('ActionCard', () => {
  it('should render with all props', () => {
    render(
      <ActionCard
        icon={<TestIcon />}
        title="Test Title"
        description="Test Description"
        content={<div>Test Content</div>}
        buttonText="Click Me"
        onButtonClick={mockClick}
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('should apply correct size variants', () => {
    const { rerender } = render(<ActionCard size="sm" title="Test" buttonText="Click" />);
    expect(screen.getByTestId('action-card')).toHaveClass('col-span-1');
    
    rerender(<ActionCard size="md" title="Test" buttonText="Click" />);
    expect(screen.getByTestId('action-card')).toHaveClass('md:col-span-2');
  });
});
```

#### 2.2 Authentication Testing
**File:** `src/contexts/__tests__/auth-context.test.tsx`

**Test Categories:**
- **Auth State Management:** Login/logout flows
- **Session Persistence:** Local storage and session handling
- **Protected Routes:** Middleware integration testing

#### 2.3 Real-time Hook Testing
**File:** `src/hooks/__tests__/use-supabase-realtime.test.tsx`

**Test Categories:**
- **Subscription Management:** Connect/disconnect flows
- **Event Handling:** Insert/update/delete events
- **Fallback Logic:** Polling when real-time fails

### Success Criteria
- ✅ ActionCard component 100% coverage
- ✅ Authentication flows tested
- ✅ Real-time hooks tested with mocks
- ✅ 40%+ overall coverage achieved

---

## Phase 3: Business Logic Testing (Week 3-4)

### Goals
- Test core drafting functionality
- Test mobile touch interactions
- Test database operations

### Priority Areas

#### 3.1 PlayerTable Component Testing
**Test Categories:**
- **Touch Interactions:** Long-press detection (500ms timer)
- **Haptic Feedback:** Navigator.vibrate integration
- **Draft Operations:** onDraft/onUndraft callbacks
- **Admin Controls:** Conditional rendering based on isAdmin prop

```typescript
describe('PlayerTable Touch Interactions', () => {
  it('should trigger draft confirmation after 500ms hold', async () => {
    jest.useFakeTimers();
    const mockDraft = jest.fn();
    
    render(<PlayerTable isAdmin={true} onDraft={mockDraft} />);
    
    const playerRow = screen.getByTestId('player-1');
    fireEvent.touchStart(playerRow);
    
    // Advance timer to 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(navigator.vibrate).toHaveBeenCalledWith(50);
    expect(screen.getByText('Draft Player?')).toBeInTheDocument();
  });
});
```

#### 3.2 Real-time Synchronization Testing
**Test Categories:**
- **Supabase Integration:** Database query mocking
- **Real-time Events:** Subscription event simulation
- **Polling Fallback:** Network failure scenarios

#### 3.3 Draft State Management Testing
**Test Categories:**
- **DraftLayoutContext:** Position filtering and view management
- **State Updates:** Real-time state synchronization
- **Error Handling:** Failed operations and recovery

### Success Criteria
- ✅ Core business logic 90%+ coverage
- ✅ Touch interactions thoroughly tested
- ✅ Real-time features tested with mocks
- ✅ 65%+ overall coverage achieved

---

## Phase 4: Integration & E2E Testing (Week 4-5)

### Goals
- End-to-end user journey testing
- Cross-browser compatibility
- Mobile device testing

### E2E Testing Setup

#### 4.1 Install Playwright
```bash
npm install --save-dev @playwright/test
npx playwright install
```

#### 4.2 Critical User Journeys
**File:** `tests/e2e/draft-workflow.spec.ts`

**Test Scenarios:**
1. **Complete Draft Flow:**
   - Sign in → Create draft → Navigate to admin → Draft players → View results
2. **Real-time Synchronization:**
   - Admin drafts player → Viewer sees update immediately
3. **Mobile Touch Interactions:**
   - Long-press to draft on mobile device
4. **Authentication Security:**
   - Admin token validation and access control

```typescript
test('complete draft workflow', async ({ page }) => {
  // 1. Sign in
  await page.goto('/');
  await page.fill('[data-cy=email]', 'test@example.com');
  await page.fill('[data-cy=password]', 'password');
  await page.click('[data-cy=sign-in]');

  // 2. Create draft
  await page.fill('[data-cy=draft-name]', 'Test Draft 2025');
  await page.click('[data-cy=create-draft]');

  // 3. Draft a player
  await page.locator('[data-cy=player-row]').first().click({ clickCount: 1, delay: 500 });
  await page.click('[data-cy=confirm-draft]');

  // 4. Verify real-time update
  await expect(page.locator('[data-cy=drafted-players]')).toContainText('Player Name');
});
```

### Success Criteria
- ✅ Critical user journeys tested
- ✅ Cross-browser compatibility verified
- ✅ Mobile testing implemented
- ✅ 80%+ overall coverage achieved

---

## Phase 5: Performance & Accessibility Testing (Week 5-6)

### Goals
- Performance regression testing
- Accessibility compliance testing
- CI/CD pipeline integration

### Performance Testing

#### 5.1 Lighthouse CI Setup
```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    configPath: './lighthouserc.json'
    uploadArtifacts: true
```

#### 5.2 Real-time Performance Testing
```typescript
// Performance test for real-time updates
test('real-time updates maintain performance', async () => {
  const startTime = performance.now();
  
  // Simulate 100 rapid draft picks
  for (let i = 0; i < 100; i++) {
    await simulateDraftPick(`player-${i}`);
  }
  
  const endTime = performance.now();
  expect(endTime - startTime).toBeLessThan(5000); // 5 second limit
});
```

### Accessibility Testing

#### 5.3 Automated A11y Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('PlayerTable should be accessible', async () => {
  const { container } = render(<PlayerTable {...props} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Success Criteria
- ✅ Performance budgets met (<500kb, <2s load)
- ✅ WCAG 2.1 AA compliance
- ✅ CI/CD pipeline with automated testing
- ✅ 85%+ overall coverage achieved

---

## Phase 6: CI/CD Integration (Week 6)

### Goals
- Automated testing in GitHub Actions
- Coverage reporting and enforcement
- Test parallelization and optimization

### GitHub Actions Workflow

#### 6.1 Complete Testing Pipeline
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:ci
      
      - name: Run E2E tests
        run: npx playwright test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

### Success Criteria
- ✅ All tests pass in CI
- ✅ Coverage reporting active
- ✅ E2E tests running on multiple browsers
- ✅ Performance budgets enforced

---

## Implementation Priority Matrix

### Critical (Immediate - Week 1)
1. **ActionCard Component Tests** - Recently implemented, needs validation
2. **Authentication Flow Tests** - Security critical
3. **Basic Framework Setup** - Foundation for all other testing

### High (Week 2-3)
1. **Real-time Feature Tests** - Core application functionality
2. **Mobile Touch Tests** - Unique user interaction patterns
3. **Database Operation Tests** - Data integrity critical

### Medium (Week 4-5)
1. **E2E User Journey Tests** - Complete workflow validation
2. **Cross-browser Testing** - Compatibility assurance
3. **Performance Testing** - User experience optimization

### Low (Week 6)
1. **Accessibility Testing** - Compliance and inclusivity
2. **CI/CD Optimization** - Development workflow enhancement
3. **Test Documentation** - Knowledge transfer preparation

---

## Testing Architecture Decisions

### Framework Selection
- **Unit Testing:** Jest + React Testing Library (React ecosystem standard)
- **E2E Testing:** Playwright (better mobile testing than Cypress)
- **Accessibility:** jest-axe (automated WCAG compliance)
- **Performance:** Lighthouse CI (Core Web Vitals monitoring)

### Testing Strategies
- **Real-time Testing:** Mock Supabase client with event simulation
- **Mobile Testing:** jsdom with touch event polyfills + actual device E2E
- **Authentication Testing:** Mock Supabase auth with token validation
- **Component Testing:** Isolated unit tests with comprehensive prop validation

### Quality Gates
- **Pre-commit:** Run affected tests automatically
- **Pull Request:** Full test suite + coverage report
- **Production:** E2E tests + performance budgets
- **Post-deploy:** Smoke tests + real-time functionality validation

---

## Risk Mitigation

### High-Risk Areas
1. **Real-time Synchronization:** Complex dual-approach architecture
2. **Mobile Touch Events:** Platform-specific behavior variations
3. **Authentication Security:** Admin token and middleware validation
4. **Database Operations:** Race conditions in concurrent operations

### Mitigation Strategies
1. **Comprehensive Mocking:** Isolate external dependencies
2. **Device Testing:** Real device validation for touch interactions
3. **Security Testing:** Penetration testing for admin flows
4. **Load Testing:** Concurrent user simulation

---

## Success Metrics

### Coverage Targets
- **Overall Coverage:** 85%+
- **Critical Components:** 95%+ (PlayerTable, ActionCard, Auth)
- **Real-time Features:** 90%+ (hooks, subscriptions)
- **E2E Scenarios:** 100% critical user journeys

### Quality Metrics
- **Flaky Test Rate:** <2%
- **Test Execution Time:** <60 seconds for full suite
- **CI/CD Reliability:** 99%+ green builds
- **Performance Budget:** <500kb initial load, <2s LCP

### Development Impact
- **Bug Detection:** 80% reduction in production bugs
- **Deployment Confidence:** Automated quality gates
- **Refactoring Safety:** Comprehensive test coverage enables safe changes
- **Developer Productivity:** Fast feedback loop with watch mode testing

---

## Git Workflow Integration

### Testing Commands
```bash
# Development
npm run test:watch          # Continuous testing during development
npm run test:coverage       # Local coverage analysis

# CI/CD
npm run test:ci            # Automated testing pipeline
npm run test:e2e           # End-to-end testing

# Quality Assurance
npm run test:a11y          # Accessibility testing
npm run test:perf          # Performance testing
```

### Commit Requirements
- All tests pass before merge
- Coverage maintained or improved
- No new accessibility violations
- Performance budgets met

---

## Expected Outcomes

### Week 1
- ✅ Testing infrastructure operational
- ✅ Basic ActionCard tests implemented
- ✅ Coverage reporting configured

### Week 3
- ✅ Core components tested (40%+ coverage)
- ✅ Authentication flows validated
- ✅ Real-time features mocked and tested

### Week 5
- ✅ E2E critical journeys tested
- ✅ Mobile touch interactions validated
- ✅ Cross-browser compatibility confirmed

### Week 6
- ✅ CI/CD pipeline operational
- ✅ 85%+ test coverage achieved
- ✅ Performance and accessibility compliance
- ✅ Team training and documentation complete

---

## Next Steps

1. **Review and approve** this implementation plan
2. **Phase 1 execution** - Install testing infrastructure
3. **Team alignment** on testing practices and standards
4. **Begin implementation** with ActionCard component tests

This plan transforms the draft-tracker from an untested application to a comprehensively tested, production-ready system with focus on the unique challenges of real-time synchronization and mobile-first interactions.