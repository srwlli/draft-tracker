## Five Elements for Testing Documentation Template

### 1. Categories
```
Development > Testing Analysis > Test Framework Documentation
Development > Testing Analysis > Test Coverage Analysis
Development > Testing Analysis > Test Pattern Documentation
Development > Testing Analysis > Mock & Fixture Strategy
Development > Testing Analysis > CI/CD Testing Integration
Development > Testing Analysis > Performance Testing
Development > Testing Analysis > Accessibility Testing
```

### 2. Variables
```
project_name (text) - Project identifier
code_location (text) - Repository URL or file paths
foundation_scan_file (text) - Path to coderef-scan-results.md (required)
maintenance_mode (boolean) - Update existing documentation vs create new
existing_documentation_file (text) - Path to existing testing scan results (if maintenance_mode=true)
update_strategy (text) - Full-rewrite/Selective-updates/Append-changes
testing_framework (text) - Jest/Vitest/Mocha/Cypress/Playwright
test_runner (text) - Jest/Vitest/Node/Browser
include_code_examples (boolean) - Include test implementation examples
document_coverage (boolean) - Document test coverage analysis
analyze_test_patterns (boolean) - Document testing patterns and conventions
check_mocking_strategy (boolean) - Document mock and fixture approaches
document_ci_integration (boolean) - Document CI/CD testing pipeline
analyze_performance_testing (boolean) - Document performance testing setup
check_accessibility_testing (boolean) - Document accessibility testing approaches
document_e2e_testing (boolean) - Document end-to-end testing strategy
analyze_test_data (boolean) - Document test data management
check_test_utilities (boolean) - Document testing utilities and helpers
include_test_debugging (boolean) - Document test debugging approaches
document_snapshot_testing (boolean) - Document snapshot and visual regression testing
output_format (text) - Technical/QA-focused/Developer-focused
documentation_depth (text) - Overview/Detailed/Exhaustive
testing_scope (text) - All/Unit-only/Integration-focus/E2E-focus
```

### 3. Statics
```
Static Name: foundation_context_integration
Content: "First read the foundation scan results from {foundation_scan_file} to understand: overall project architecture, established coding patterns, security requirements, deployment platform, database schema, authentication strategy, and integration points. Use this context to ensure testing documentation aligns with project conventions and architectural decisions."

Static Name: maintenance_mode_instructions
Content: "If maintenance_mode=true: Read existing documentation from {existing_documentation_file}, compare current testing implementation with documented testing patterns, identify changes (new/modified/deleted test suites), update only changed sections using {update_strategy}, preserve accurate existing documentation, highlight what has changed since last scan."

Static Name: testing_discovery_tasks
Content: "Locate all test files and directories, identify testing frameworks and runners, find test configuration files, discover test utilities and helpers, map test coverage setup, locate mock and fixture files, find CI/CD testing configurations, identify performance testing setup, discover accessibility testing tools, map test data management"

Static Name: test_framework_documentation
Content: "Document testing setup: testing framework configuration, test runner setup and scripts, test environment configuration, testing library integrations, custom testing utilities, test setup and teardown procedures, test file naming conventions, test directory organization"

Static Name: test_coverage_analysis
Content: "Document coverage strategy: coverage tool configuration (nyc/c8/jest coverage), coverage thresholds and requirements, coverage reporting and visualization, uncovered code identification, coverage exclusion patterns, branch vs line vs function coverage, coverage CI/CD integration, coverage improvement strategies"

Static Name: test_pattern_documentation
Content: "Document testing patterns: unit testing patterns and conventions, integration testing approaches, test organization and grouping, test naming conventions, assertion patterns and styles, test data setup patterns, test isolation strategies, test parameterization and data-driven testing"

Static Name: mocking_strategy_analysis
Content: "Document mocking approach: mock library usage (jest.mock/sinon/etc), API mocking strategies, database mocking approaches, external service mocking, component mocking patterns, mock data factories, fixture management, mock cleanup and reset procedures"

Static Name: ci_testing_integration
Content: "Document CI/CD testing: test pipeline configuration, parallel test execution, test result reporting, flaky test handling, test caching strategies, test environment provisioning, test artifact management, test failure notification and alerting"

Static Name: e2e_testing_documentation
Content: "Document E2E testing: E2E framework setup (Cypress/Playwright/Selenium), test environment configuration, page object model patterns, test data seeding for E2E, cross-browser testing strategy, mobile testing approaches, visual regression testing, E2E test CI/CD integration"

Static Name: performance_testing_analysis
Content: "Document performance testing: load testing framework and setup, performance benchmark definitions, performance regression testing, API performance testing, frontend performance testing, memory leak testing, performance CI/CD integration, performance monitoring in tests"

Static Name: accessibility_testing_documentation
Content: "Document accessibility testing: a11y testing tools (jest-axe/pa11y/lighthouse), automated accessibility testing, manual accessibility testing procedures, screen reader testing approaches, keyboard navigation testing, color contrast testing, accessibility test coverage requirements"

Static Name: test_debugging_strategies
Content: "Document test debugging: test debugging tools and setup, test failure investigation procedures, test environment debugging, mock debugging techniques, test performance debugging, snapshot debugging, test isolation debugging, CI test failure debugging"
```

### 4. Formula Template
```
**COMPREHENSIVE TESTING DOCUMENTATION GENERATOR**
Create exhaustive testing documentation for {project_name} at {code_location}.

Project: {project_name}
Foundation context: {foundation_scan_file}
Maintenance mode: {maintenance_mode}
Testing Framework: {testing_framework}
Test Runner: {test_runner}
Testing scope: {testing_scope}
Documentation depth: {documentation_depth}

**Phase 1: Foundation Context Integration**
{static:foundation_context_integration}

**Phase 2: Maintenance Mode Processing**
{static:maintenance_mode_instructions}
Update strategy: {update_strategy}
Existing documentation: {existing_documentation_file}

**Phase 3: Testing Discovery & Framework Analysis**
{static:testing_discovery_tasks}
{static:test_framework_documentation}

**Phase 2: Test Coverage Analysis**
{static:test_coverage_analysis}
Document coverage: {document_coverage}

**Phase 3: Test Pattern Documentation**
{static:test_pattern_documentation}
Analyze test patterns: {analyze_test_patterns}

**Phase 4: Mocking Strategy Analysis**
{static:mocking_strategy_analysis}
Check mocking strategy: {check_mocking_strategy}
Analyze test data: {analyze_test_data}

**Phase 5: CI/CD Testing Integration**
{static:ci_testing_integration}
Document CI integration: {document_ci_integration}

**Phase 6: End-to-End Testing Documentation**
{static:e2e_testing_documentation}
Document E2E testing: {document_e2e_testing}

**Phase 7: Performance Testing Analysis**
{static:performance_testing_analysis}
Analyze performance testing: {analyze_performance_testing}

**Phase 8: Accessibility Testing Documentation**
{static:accessibility_testing_documentation}
Check accessibility testing: {check_accessibility_testing}

**Phase 9: Test Debugging & Utilities**
{static:test_debugging_strategies}
Check test utilities: {check_test_utilities}
Include test debugging: {include_test_debugging}
Document snapshot testing: {document_snapshot_testing}

**Output Required:**

Generate complete documentation file: coderef-testing-scan-results.md

### 🧪 TESTING DOCUMENTATION

#### 🎯 Testing Overview
- **Project:** {project_name}
- **Testing Framework:** [Jest/Vitest/Mocha/etc and version]
- **Test Runner:** [Jest/Vitest/Node/Browser execution environment]
- **Total Test Files:** [Count of test files]
- **Test Coverage:** [Overall coverage percentage]
- **Testing Strategy:** [Unit/Integration/E2E approach]
- **CI/CD Integration:** [Testing in deployment pipeline]

#### 🛠️ Testing Framework Setup

**Framework Configuration:**
```javascript
// Jest/Vitest configuration example
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts'
  ]
}
```

**Test Scripts:**
```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:e2e": "cypress run"
}
```

**Testing Environment:**
- **Setup Files:** [Global test setup and configuration]
- **Test Utilities:** [Custom testing helpers and utilities]
- **Test Environment:** [jsdom/node/browser environment setup]

#### 📊 Test Coverage Analysis

**Coverage Configuration:**
- **Coverage Tool:** [Built-in/nyc/c8/istanbul]
- **Coverage Thresholds:** [Minimum coverage requirements]
- **Coverage Exclusions:** [Files/patterns excluded from coverage]

**Current Coverage Metrics:**
```
Coverage Summary:
├── Statements: 85.2% (1234/1450)
├── Branches: 78.9% (456/578)
├── Functions: 91.3% (234/256)
└── Lines: 84.7% (1198/1414)

Top Uncovered Areas:
- Error handling paths (23% coverage)
- Edge case validations (45% coverage)
- Legacy utility functions (12% coverage)
```

**Coverage Reporting:**
- **Reports Generated:** [HTML/JSON/LCOV formats]
- **Coverage Visualization:** [Tools for coverage exploration]
- **CI Integration:** [Coverage reporting in pull requests]

#### 🧩 Test Pattern Documentation

**Unit Testing Patterns:**
```typescript
// Component testing pattern
describe('Button Component', () => {
  it('should render with correct props', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

**Integration Testing Patterns:**
```typescript
// API integration testing
describe('User API Integration', () => {
  beforeEach(() => {
    // Setup test database
    // Seed test data
  })

  it('should create user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(validUserData)
    expect(response.status).toBe(201)
  })
})
```

**Test Organization:**
- **Test File Structure:** [Co-location vs separate test directories]
- **Test Naming:** [.test.js vs .spec.js conventions]
- **Test Grouping:** [describe blocks and test suites]

#### 🎭 Mocking Strategy

**Mock Implementations:**
```typescript
// API mocking example
jest.mock('../services/api', () => ({
  fetchUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn()
}))

// Component mocking
jest.mock('../components/ComplexComponent', () => {
  return function MockComplexComponent(props: any) {
    return <div data-testid="mock-complex-component">{props.children}</div>
  }
})
```

**Mock Categories:**
- **API Mocks:** [External service and internal API mocking]
- **Component Mocks:** [Complex component mocking for isolation]
- **Utility Mocks:** [Date, random, localStorage mocking]
- **Module Mocks:** [Third-party library mocking]

**Test Data Management:**
```typescript
// Factory pattern for test data
const userFactory = {
  build: (overrides = {}) => ({
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    ...overrides
  })
}
```

#### 🔄 CI/CD Testing Integration

**Pipeline Testing:**
```yaml
# GitHub Actions testing example
- name: Run Tests
  run: |
    npm run test:coverage
    npm run test:e2e
- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

**Test Parallelization:**
- **Unit Tests:** [Parallel execution strategy]
- **E2E Tests:** [Browser parallelization]
- **Test Sharding:** [Test suite distribution]

**Test Reporting:**
- **JUnit XML:** [CI-compatible test result format]
- **Coverage Reports:** [Coverage data for CI dashboards]
- **Test Artifacts:** [Screenshots, videos, logs from failed tests]

#### 🌐 End-to-End Testing

**E2E Framework Setup:**
```typescript
// Cypress/Playwright configuration
const config = {
  baseUrl: 'http://localhost:3000',
  viewportWidth: 1280,
  viewportHeight: 720,
  video: true,
  screenshotOnRunFailure: true
}
```

**Page Object Patterns:**
```typescript
// Page object model example
export class LoginPage {
  visit() {
    cy.visit('/login')
  }

  fillCredentials(email: string, password: string) {
    cy.get('[data-cy=email]').type(email)
    cy.get('[data-cy=password]').type(password)
  }

  submit() {
    cy.get('[data-cy=login-button]').click()
  }
}
```

**E2E Test Categories:**
- **Critical User Journeys:** [Core app workflows]
- **Cross-browser Testing:** [Browser compatibility]
- **Mobile Testing:** [Responsive design validation]
- **Performance Testing:** [Core Web Vitals in E2E]

#### ⚡ Performance Testing

**Performance Test Setup:**
```typescript
// Performance testing example
describe('Performance Tests', () => {
  it('should load homepage within performance budget', async () => {
    const metrics = await measurePageLoad('/homepage')
    expect(metrics.LCP).toBeLessThan(2500) // Core Web Vitals
    expect(metrics.FID).toBeLessThan(100)
  })
})
```

**Load Testing:**
- **Framework:** [k6/Artillery/JMeter]
- **Test Scenarios:** [Normal load, stress testing, spike testing]
- **Performance Budgets:** [Response time and throughput targets]

#### ♿ Accessibility Testing

**A11y Testing Setup:**
```typescript
// Accessibility testing example
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('should not have accessibility violations', async () => {
  render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

**Accessibility Test Categories:**
- **Automated A11y Tests:** [jest-axe, lighthouse CI]
- **Keyboard Navigation Tests:** [Tab order, focus management]
- **Screen Reader Tests:** [ARIA label validation]
- **Color Contrast Tests:** [WCAG compliance validation]

#### 🔍 Test Debugging

**Debugging Tools:**
```typescript
// Test debugging utilities
const debugTest = (component: ReactWrapper) => {
  console.log('Component state:', component.state())
  console.log('Component props:', component.props())
  console.log('DOM output:', component.debug())
}
```

**Debug Strategies:**
- **Test Isolation:** [Running single tests for debugging]
- **Mock Debugging:** [Inspecting mock call data]
- **Snapshot Debugging:** [Understanding snapshot failures]
- **Async Test Debugging:** [Handling timing issues]

#### 📈 Test Quality Metrics

**Test Health Indicators:**
- **Test Coverage:** [Percentage by type: unit/integration/e2e]
- **Test Reliability:** [Flaky test identification and rates]
- **Test Performance:** [Test execution time trends]
- **Test Maintenance:** [Test code quality and complexity]

**Quality Improvements:**
```
Test Quality Dashboard:
├── Coverage Trend: 📈 85% → 89% (improving)
├── Flaky Test Rate: 📉 5% → 2% (improving)
├── Test Execution Time: ⚠️ 45s → 52s (degrading)
└── Test Code Quality: ✅ A grade (maintained)
```

#### 🧪 Test Data Management

**Test Data Strategies:**
```typescript
// Test data factory
class TestDataFactory {
  static createUser(overrides = {}) {
    return {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      ...overrides
    }
  }
}
```

**Data Management Patterns:**
- **Factory Pattern:** [Programmatic test data generation]
- **Fixture Files:** [Static test data management]
- **Database Seeding:** [Test database setup and cleanup]
- **Data Isolation:** [Preventing test data conflicts]

#### 🎯 Testing Best Practices

**Test Writing Guidelines:**
- **AAA Pattern:** [Arrange, Act, Assert structure]
- **Test Naming:** [Descriptive test names and conventions]
- **Test Independence:** [Isolated, independent test design]
- **Test Focus:** [Single responsibility per test]

**Common Anti-patterns:**
- **Test Interdependence:** [Tests depending on other tests]
- **Over-mocking:** [Excessive mocking reducing test value]
- **Implementation Testing:** [Testing implementation vs behavior]
- **Brittle Tests:** [Tests breaking on minor changes]

#### 🔧 Development Workflow

**Test-Driven Development:**
- **TDD Process:** [Red-Green-Refactor cycle if used]
- **Test-First Approach:** [Writing tests before implementation]
- **Refactoring Safety:** [Using tests to enable safe refactoring]

**Testing in Development:**
- **Watch Mode:** [Continuous testing during development]
- **Test Selection:** [Running subset of tests during development]
- **Test Feedback:** [Fast feedback loop optimization]

#### 🚨 Test Maintenance

**Test Health Monitoring:**
- **Flaky Test Detection:** [Identifying unreliable tests]
- **Test Performance Monitoring:** [Slow test identification]
- **Test Code Quality:** [Linting and formatting for test code]

**Test Cleanup Procedures:**
- **Obsolete Test Removal:** [Removing tests for deleted features]
- **Test Refactoring:** [Improving test maintainability]
- **Test Documentation:** [Keeping test documentation current]

#### 📚 Testing Documentation

**Test Documentation Strategy:**
- **Test Plan Documentation:** [Testing strategy and approach]
- **Test Case Documentation:** [Complex test scenario documentation]
- **Testing Guidelines:** [Team testing standards and practices]

**Knowledge Transfer:**
- **Testing Onboarding:** [How new developers learn testing practices]
- **Testing Troubleshooting:** [Common testing issues and solutions]
- **Testing Tools Training:** [Framework and tool usage guides]

Include code examples: {include_code_examples}
Include test debugging: {include_test_debugging}
Output format: {output_format}
```

### 5. Context Defaults
```json
{
  "project_name": "[auto-detect from package.json]",
  "code_location": "[provide repository/files]",
  "foundation_scan_file": "./coderef-scan-results.md",
  "maintenance_mode": false,
  "existing_documentation_file": "./coderef-testing-scan-results.md",
  "update_strategy": "Selective-updates",
  "testing_framework": "Auto-detect",
  "test_runner": "Auto-detect",
  "include_code_examples": true,
  "document_coverage": true,
  "analyze_test_patterns": true,
  "check_mocking_strategy": true,
  "document_ci_integration": true,
  "analyze_performance_testing": true,
  "check_accessibility_testing": true,
  "document_e2e_testing": true,
  "analyze_test_data": true,
  "check_test_utilities": true,
  "include_test_debugging": true,
  "document_snapshot_testing": true,
  "output_format": "Developer-focused",
  "documentation_depth": "Exhaustive",
  "testing_scope": "All"
}
```

---

This **Testing Documentation Generator** creates comprehensive testing documentation that enables agents to:
- **Understand complete testing strategy** with frameworks, patterns, and coverage requirements
- **Write new tests** following established patterns and conventions
- **Debug test failures** with documented debugging approaches and tools
- **Maintain test quality** with documented best practices and anti-patterns
- **Integrate testing into development** with documented CI/CD and workflow practices
- **Optimize test performance** with documented performance testing and monitoring
- **Ensure accessibility compliance** with documented a11y testing approaches