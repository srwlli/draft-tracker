## Five Elements for Component Library Documentation Template

### 1. Categories
```
Development > Component Analysis > UI Component Inventory
Development > Component Analysis > Component Architecture
Development > Component Analysis > Props & Interface Documentation
Development > Component Analysis > Styling & Theming
Development > Component Analysis > Accessibility Implementation
Development > Component Analysis > Usage Patterns
```

### 2. Variables
```
project_name (text) - Project identifier
code_location (text) - Repository URL or file paths
foundation_scan_file (text) - Path to coderef-scan-results.md (required)
maintenance_mode (boolean) - Update existing documentation vs create new
existing_documentation_file (text) - Path to existing component scan results (if maintenance_mode=true)
update_strategy (text) - Full-rewrite/Selective-updates/Append-changes
ui_framework (text) - React/Vue/Angular/Svelte/Solid
styling_approach (text) - CSS-in-JS/Tailwind/SCSS/Styled-components
include_code_examples (boolean) - Include component implementation code
document_props (boolean) - Document all props with types and examples
analyze_composition (boolean) - Analyze component composition patterns
check_accessibility (boolean) - Document accessibility implementations
document_theming (boolean) - Document theming and design tokens
include_usage_examples (boolean) - Include component usage examples
analyze_state_patterns (boolean) - Document state management within components
check_performance (boolean) - Analyze component performance patterns
document_testing (boolean) - Document component testing approaches
output_format (text) - Technical/Design-system/Developer-focused
documentation_depth (text) - Overview/Detailed/Exhaustive
component_scope (text) - All/Shared-only/Page-specific
```

### 3. Statics
```
Static Name: component_discovery_tasks
Content: "Locate all component files, identify component types (functional/class/HOC), catalog component hierarchy, map component dependencies, find shared/reusable components, identify page-specific components, discover component composition patterns, locate styling implementations, find prop interfaces and types"

Static Name: component_documentation_requirements
Content: "For each component document: component name and file location, component type and architecture pattern, complete props interface with types, default prop values, required vs optional props, event handlers and callbacks, styling approach and class names, accessibility features implemented, usage examples with different prop combinations"

Static Name: composition_analysis
Content: "Document composition patterns: higher-order components (HOCs), render props patterns, compound components, composition vs inheritance, slot/children patterns, provider/consumer relationships, component wrapping strategies, component extension patterns, polymorphic component implementations"

Static Name: styling_documentation
Content: "Document styling approach: CSS methodology used (BEM/SMACSS/Atomic), component styling patterns, theme integration, CSS variables and design tokens, responsive design patterns, animation and transition implementations, conditional styling logic, style composition and overrides"

Static Name: accessibility_implementation
Content: "Document accessibility features: ARIA labels and roles, keyboard navigation support, focus management, screen reader optimizations, color contrast compliance, semantic HTML usage, accessibility testing approaches, WCAG compliance level, assistive technology support"

Static Name: state_management_patterns
Content: "Document component state: local state patterns (useState/data/reactive), state lifting strategies, state sharing between components, state persistence approaches, derived state calculations, state validation patterns, state debugging and dev tools, state performance optimizations"

Static Name: event_handling_patterns
Content: "Document event handling: event handler naming conventions, event delegation patterns, custom event creation, event bubbling/capturing usage, async event handling, event validation and sanitization, event debugging approaches, performance considerations for events"

Static Name: testing_documentation
Content: "Document component testing: test file locations and naming, unit testing patterns, integration testing approaches, accessibility testing methods, visual regression testing, snapshot testing usage, mock patterns for components, test data factories, performance testing for components"

Static Name: design_system_integration
Content: "Document design system: design token usage, component variants and sizes, spacing and layout patterns, typography implementation, color palette integration, icon system usage, breakpoint and responsive patterns, brand consistency implementation"
```

### 4. Formula Template
```
**COMPREHENSIVE COMPONENT LIBRARY DOCUMENTATION GENERATOR**
Create exhaustive component documentation for {project_name} at {code_location}.

Project: {project_name}
UI Framework: {ui_framework}
Styling Approach: {styling_approach}
Component Scope: {component_scope}
Documentation depth: {documentation_depth}

**Phase 1: Component Discovery & Inventory**
{static:component_discovery_tasks}

**Phase 2: Component Documentation Standards**
{static:component_documentation_requirements}
Document props: {document_props}
Include code examples: {include_code_examples}

**Phase 3: Composition & Architecture Analysis**
{static:composition_analysis}
Analyze composition: {analyze_composition}

**Phase 4: Styling & Design System Documentation**
{static:styling_documentation}
{static:design_system_integration}
Document theming: {document_theming}

**Phase 5: State Management Documentation**
{static:state_management_patterns}
Analyze state patterns: {analyze_state_patterns}

**Phase 6: Event Handling Documentation**
{static:event_handling_patterns}

**Phase 7: Accessibility Implementation**
{static:accessibility_implementation}
Check accessibility: {check_accessibility}

**Phase 8: Testing & Quality Documentation**
{static:testing_documentation}
Document testing: {document_testing}
Check performance: {check_performance}

**Output Required:**

Generate complete documentation file: coderef-component-scan-results.md

### 🧩 COMPONENT LIBRARY DOCUMENTATION

#### 🎯 Component Library Overview
- **Project:** {project_name}
- **UI Framework:** [Detected framework and version]
- **Component Count:** [Total number of components]
- **Styling Approach:** [CSS-in-JS/Tailwind/SCSS/etc]
- **Design System:** [Present/Custom/Third-party]
- **Component Types:** [Functional/Class/Mixed]

#### 📦 Component Inventory

**Shared/Reusable Components:**
- **Button** (`/components/Button.tsx`) - [Description]
- **Input** (`/components/Input.tsx`) - [Description]
- **Modal** (`/components/Modal.tsx`) - [Description]

**Page-Specific Components:**
- **LoginForm** (`/pages/auth/LoginForm.tsx`) - [Description]
- **Dashboard** (`/pages/dashboard/Dashboard.tsx`) - [Description]

**Layout Components:**
- **Header** (`/components/layout/Header.tsx`) - [Description]
- **Sidebar** (`/components/layout/Sidebar.tsx`) - [Description]

#### 🔧 Detailed Component Documentation

**[For each component, provide:]**

##### Button Component
- **File Location:** `/components/Button.tsx`
- **Component Type:** [Functional/Class/Forwardref]
- **Purpose:** [What this component does]

**Props Interface:**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger'  // Required
  size?: 'sm' | 'md' | 'lg'                    // Optional, default: 'md'
  disabled?: boolean                           // Optional, default: false
  loading?: boolean                            // Optional, default: false
  onClick?: (event: MouseEvent) => void        // Optional
  children: React.ReactNode                    // Required
}
```

**Default Props:**
```typescript
{
  size: 'md',
  disabled: false,
  loading: false
}
```

**Event Handlers:**
- `onClick` - [Handler description and usage]
- `onFocus` - [Handler description and usage]

**Styling Implementation:**
- **Approach:** [Tailwind classes/styled-components/CSS modules]
- **Theme Integration:** [How it uses design tokens]
- **Variants:** [Different visual styles available]

**Accessibility Features:**
- **ARIA Labels:** [aria-label, aria-describedby implementations]
- **Keyboard Support:** [Enter/Space key handling]
- **Focus Management:** [Focus ring and states]
- **Screen Reader:** [Announcements and descriptions]

**Usage Examples:**
```jsx
// Basic usage
<Button variant="primary" onClick={handleClick}>
  Save Changes
</Button>

// Loading state
<Button variant="secondary" loading disabled>
  Processing...
</Button>

// With custom styling
<Button variant="danger" size="lg">
  Delete Account
</Button>
```

**Composition Patterns:**
- [How this component composes with others]
- [Compound component usage if applicable]
- [Render prop patterns if used]

#### 🎨 Styling & Theming Architecture

**Design Token System:**
- **Colors:** [Color palette and usage]
- **Typography:** [Font scales and weights]
- **Spacing:** [Spacing scale system]
- **Breakpoints:** [Responsive breakpoints]

**Theme Implementation:**
- **Theme Provider:** [How theming is implemented]
- **CSS Variables:** [Custom properties used]
- **Dark Mode:** [Dark theme implementation]

**Styling Patterns:**
- **Global Styles:** [Base styles and resets]
- **Component Styles:** [Scoping and organization]
- **Utility Classes:** [Utility-first patterns if used]

#### 🔄 State Management Patterns

**Local State:**
- **useState Patterns:** [Common state patterns]
- **useReducer Usage:** [Complex state management]
- **Custom Hooks:** [Reusable state logic]

**Global State:**
- **Context Usage:** [How components connect to context]
- **Store Integration:** [Redux/Zustand/etc integration]
- **State Subscription:** [How components subscribe to updates]

**State Lifting:**
- [Patterns for lifting state to parent components]
- [Communication between sibling components]

#### 🔗 Component Relationships

**Component Hierarchy:**
```
App
├── Layout
│   ├── Header
│   │   ├── Navigation
│   │   └── UserMenu
│   └── Sidebar
└── Pages
    ├── Dashboard
    │   ├── MetricCard
    │   └── Chart
    └── Settings
```

**Data Flow:**
- [How data flows between parent and child components]
- [Prop drilling patterns and alternatives]
- [Event bubbling and communication]

#### 🧪 Component Testing

**Testing Approach:**
- **Unit Tests:** [Individual component testing]
- **Integration Tests:** [Component interaction testing]
- **Accessibility Tests:** [A11y testing patterns]
- **Visual Tests:** [Snapshot/visual regression testing]

**Testing Utilities:**
- [Testing libraries used (React Testing Library, etc)]
- [Custom testing utilities and helpers]
- [Mock patterns for component dependencies]

#### 🚀 Performance Considerations

**Optimization Patterns:**
- **Memoization:** [React.memo, useMemo, useCallback usage]
- **Lazy Loading:** [Dynamic imports and code splitting]
- **Virtual Scrolling:** [Large list optimizations]
- **Bundle Size:** [Component-level bundle analysis]

#### 📚 Development Guidelines

**Component Creation:**
- [File naming conventions]
- [Directory structure patterns]
- [Code organization within components]

**Best Practices:**
- [Component design principles]
- [Prop design guidelines]
- [Performance considerations]
- [Accessibility requirements]

**Code Review Checklist:**
- [What to check when reviewing component code]
- [Common anti-patterns to avoid]
- [Quality standards expected]

Include code examples: {include_code_examples}
Include usage examples: {include_usage_examples}
Output format: {output_format}
```

### 5. Context Defaults
```json
{
  "project_name": "[auto-detect from package.json]",
  "code_location": "[provide repository/files]",
  "ui_framework": "Auto-detect",
  "styling_approach": "Auto-detect",
  "include_code_examples": true,
  "document_props": true,
  "analyze_composition": true,
  "check_accessibility": true,
  "document_theming": true,
  "include_usage_examples": true,
  "analyze_state_patterns": true,
  "check_performance": true,
  "document_testing": true,
  "output_format": "Developer-focused",
  "documentation_depth": "Exhaustive",
  "component_scope": "All"
}
```

---

This **Component Library Documentation Generator** creates comprehensive component documentation that enables agents to:
- **Understand all UI components** with complete props and usage patterns
- **Modify existing components** with full context of styling and behavior
- **Create new components** following established patterns and conventions
- **Maintain accessibility standards** with documented A11y implementations
- **Debug component issues** with complete state and event documentation
- **Optimize component performance** using documented optimization patterns
- **Follow design system** with complete theming and styling documentation