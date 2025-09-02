## Five Elements for Enhanced Project Documentation & Agent Onboarding Template

### 1. Categories
```
Development > Agent Onboarding > Initial Documentation
Development > Agent Onboarding > Architecture Mapping
Development > Agent Onboarding > Code Pattern Analysis
Development > Agent Onboarding > Critical Path Discovery
Development > Agent Onboarding > Integration Point Mapping
Development > Agent Onboarding > Context Generation
```

### 2. Variables
```
code_location (text) - Repository URL or file paths
project_name (text) - Project identifier for documentation
explicit_parsing_instructions (boolean) - Use framework-specific parsing patterns
include_machine_readable (boolean) - Generate JSON schema alongside markdown
error_detection_enabled (boolean) - Validate inputs and configurations
documentation_mode (text) - discovery/detailed/comprehensive (replaces 15+ boolean variables)
incremental_scanning (boolean) - Optimize for partial codebase updates
generate_knowledge_catalogs (boolean) - Create structured knowledge files
enforce_cross_references (boolean) - Require ID-based component linking
enforce_terminology (boolean) - Use standardized architectural vocabulary
include_agent_notes (boolean) - Add scanning confidence and coverage information
time_limit (text) - Quick scan/Standard review/Deep dive/Exhaustive documentation
output_verbosity (text) - Summary only/Detailed/Exhaustive with examples
generate_artifacts (boolean) - Create persistent documentation files
agent_onboarding_mode (boolean) - Optimize for future agent handoffs
deployment_platform (text) - Vercel/Netlify/AWS/Docker/Unknown
has_database (boolean) - Check for database connections
api_style (text) - REST/GraphQL/tRPC detection
performance_budget (text) - Bundle size targets (e.g., <500kb)
security_level (text) - Basic/Standard/Enterprise requirements
maintenance_mode (boolean) - Legacy vs active development
follow_up_prompts (text) - Comma-separated list of next analysis prompts needed
documentation_quality_target (text) - Basic/Comprehensive/Expert-level detail
```

### 3. Statics
```
Static Name: framework_parsing_patterns
Content: "Use framework-specific patterns for comprehensive codebase analysis: React (function\s+\w+\(|const\s+\w+\s*=\s*\(|export\s+(default\s+)?function), Next.js (pages/|app/|middleware\.ts|next\.config\.js), Node.js (require\(|import\s+.*from|module\.exports|exports\.), Database (mongoose\.|prisma\.|sequelize\.|knex\.|supabase\.), Testing (describe\(|it\(|test\(|expect\(), Config (\.env|config\.|settings\.|\.(json|yaml)$). Apply these patterns systematically across all project files for complete component discovery."

Static Name: input_validation_logic
Content: "PRE-PROCESSING VALIDATION: 1) Verify {code_location} is accessible and contains valid project files, 2) Validate {project_name} can be auto-detected from package.json or provided explicitly, 3) Check framework detection accuracy using parsing patterns, 4) Validate boolean variables have explicit values, 5) Flag incomplete or misconfigured inputs with correction suggestions, 6) Ensure all required directories and files are accessible before proceeding."

Static Name: machine_readable_schema
Content: "Generate structured JSON output alongside markdown: project_metadata (name, framework, version, type), component_inventory (files, purposes, relationships), critical_file_mappings (paths, roles, dependencies), integration_catalog (services, APIs, databases), pattern_definitions (naming, organization, architecture), health_metrics (scores, coverage, technical_debt). Structure enables programmatic agent access and cross-referencing."

Static Name: documentation_mode_logic
Content: "DOCUMENTATION MODE PROCESSING: If discovery mode: focus on high-level architecture, key components, and critical paths only. If detailed mode: include comprehensive analysis, code patterns, and integration details. If comprehensive mode: generate exhaustive documentation with examples, technical debt analysis, and complete artifact generation. Mode determines scope automatically without individual boolean management."

Static Name: incremental_scanning_optimization
Content: "INCREMENTAL SCANNING LOGIC: 1) Compare file modification timestamps against last scan, 2) Detect component signature changes (exports, imports, dependencies), 3) Identify new/modified/deleted files and components, 4) Skip unchanged files for efficiency, 5) Generate change summary with architectural impact analysis, 6) Update only affected documentation sections, 7) Preserve accurate existing documentation, 8) Flag significant architectural changes for review."

Static Name: centralized_knowledge_catalogs
Content: "Generate canonical knowledge objects: components.json (component inventory with metadata and relationships), patterns.json (coding pattern catalog with examples), integrations.json (external service mapping with configurations), workflows.json (critical path documentation with dependencies). These catalogs enable programmatic access and prevent documentation duplication across scans."

Static Name: cross_reference_requirements
Content: "Implement ID-based linking system: Assign unique IDs to components (component-{name}), files (file-{path-slug}), patterns (pattern-{type}-{name}), integrations (integration-{service}). Reference these IDs across documentation sections for connected knowledge graph navigation. Include backlinks and related component references for comprehensive context."

Static Name: terminology_enforcement
Content: "Standardize vocabulary throughout documentation: Component types (Page-Component, Layout-Component, Utility-Component, Business-Component), Architecture patterns (Client-Server, Server-Side-Rendering, Static-Site-Generation, Single-Page-Application), Data patterns (State-Management, Data-Fetching, Caching-Strategy, Real-Time-Updates), Framework terms (React-Component, Next-Page, Node-Module, Express-Route), File types (Configuration-File, Entry-Point, Utility-Module, Test-File)."

Static Name: agent_notes_section
Content: "Include scanning meta-information: Framework detection confidence levels (High/Medium/Low with reasoning), Coverage gaps identified during analysis (missing files, incomplete patterns), Complex architectural areas requiring deeper investigation, Parsing challenges encountered during analysis, Incomplete or missing documentation areas, Architectural assumptions made during scanning, Recommendations for follow-up specialized scans."

Static Name: agent_onboarding_objectives
Content: "Create comprehensive codebase documentation for agent handoffs, identify all critical files and their purposes, map component relationships and data flows, extract coding conventions and patterns, document integration points and external dependencies, generate persistent knowledge artifacts, prepare context for specialized follow-up analysis"

Static Name: critical_file_identification
Content: "Identify and document: main entry points (index files, app roots), configuration files (package.json, env configs, build configs), core business logic files, shared utilities and constants, API route definitions, database models and schemas, authentication/authorization logic, component libraries and design systems, state management setup, routing configurations"

Static Name: code_pattern_analysis
Content: "Extract and document: naming conventions, file organization patterns, component architecture (HOC/render props/hooks), state management patterns, API calling patterns, error handling approaches, testing patterns, styling methodologies, data validation patterns, authentication flows, authorization patterns, performance optimization techniques"

Static Name: integration_mapping
Content: "Document all external connections: third-party APIs and their usage, database connections and query patterns, authentication providers (OAuth, SAML, etc), payment processors, email services, file storage services, CDN configurations, monitoring and analytics services, deployment platforms, CI/CD integrations, environment-specific configurations"

Static Name: data_flow_documentation
Content: "Map data movement through application: user input validation and processing, API request/response cycles, database query patterns, state updates and propagation, component prop drilling, context/store usage, side effect management, caching strategies, real-time data handling, error propagation patterns"

Static Name: agent_handoff_context
Content: "Generate context for future agents: key architectural decisions and rationale, complex business logic explanations, known technical debt areas, performance bottlenecks identified, security considerations and implementations, testing strategies and gaps, deployment processes and requirements, common development workflows, troubleshooting guides for frequent issues"

Static Name: documentation_artifacts
Content: "Generate persistent documentation files: CODEBASE_OVERVIEW.md with architecture summary, AGENT_CONTEXT.md with key findings for future agents, CRITICAL_PATHS.md mapping important workflows, INTEGRATION_GUIDE.md for external services, CONVENTIONS.md for coding standards, COMPONENT_MAP.md for UI architecture, API_DOCUMENTATION.md for backend patterns"

Static Name: framework_deep_analysis
Content: "Framework-specific deep dive: Next.js (pages vs app router, middleware, API routes), React (component patterns, hooks usage, context patterns), Vue (composition vs options API, store patterns), Angular (modules, services, guards), Node.js (middleware patterns, error handling), database patterns (ORM usage, query optimization), styling approaches (CSS-in-JS, utility frameworks)"

Static Name: technical_debt_assessment
Content: "Identify maintenance concerns: code complexity hotspots, outdated patterns or anti-patterns, missing error boundaries, performance bottlenecks, security vulnerabilities, accessibility gaps, testing coverage holes, documentation gaps, dependency risks, scalability limitations, code duplication patterns"

Static Name: onboarding_checklist
Content: "Agent onboarding requirements: understand project purpose and domain, identify key stakeholders and decision makers, locate critical business logic, understand data models and relationships, map user journeys and workflows, identify testing strategies, understand deployment and release processes, locate documentation and knowledge bases, understand development workflows and tools"

Static Name: project_classification
Content: "Detect project category: E-commerce (cart/checkout/payment), SaaS (subscription/billing/tenant), CMS (content models/editors), Dashboard (charts/metrics/real-time), Mobile-first (touch/gestures), Enterprise (SSO/audit/compliance), Portfolio/Marketing (animations/SEO), Internal tool (admin/crud)"

Static Name: health_scoring
Content: "Calculate scores based on: Code Quality (linting/formatting/structure), Security Rating (vulnerabilities/auth/encryption), Performance Grade (bundle/vitals/optimization), Test Coverage (unit/integration/e2e), Maintainability Index (complexity/documentation/dependencies), Accessibility Score (WCAG/ARIA/semantics)"
```

### 4. Formula Template
```
**ENHANCED CODEBASE DOCUMENTATION & AGENT ONBOARDING SCANNER**
Generate comprehensive documentation for {project_name} at {code_location} to onboard future agents.

Agent onboarding mode: {agent_onboarding_mode}
Documentation mode: {documentation_mode}
Time allocation: {time_limit}
Documentation target: {documentation_quality_target}
Generate artifacts: {generate_artifacts}

**Phase 1: Pre-Processing Validation**
{static:input_validation_logic}
Error detection enabled: {error_detection_enabled}

**Phase 2: Framework Pattern Detection**
{static:framework_parsing_patterns}
Explicit parsing instructions: {explicit_parsing_instructions}

**Phase 3: Documentation Mode Processing**
{static:documentation_mode_logic}
Documentation mode: {documentation_mode}

**Phase 4: Project Foundation & Purpose**
INITIALIZE comprehensive codebase documentation for agent onboarding.
{static:agent_onboarding_objectives}
{static:onboarding_checklist}
- Project name: {project_name}
- Maintenance status: {maintenance_mode}
If maintenance_mode=true and incremental_scanning=true: {static:incremental_scanning_optimization}

**Phase 5: Critical File & Component Mapping**
IDENTIFY critical files and components using systematic patterns.
{static:critical_file_identification}

**Phase 6: Code Pattern & Convention Analysis**
EXTRACT coding patterns and conventions from codebase analysis.
{static:code_pattern_analysis}

**Phase 7: Framework-Specific Deep Dive**
ANALYZE framework-specific patterns and architectural decisions.
{static:framework_deep_analysis}
Framework deep analysis based on {documentation_mode}

**Phase 8: Data Flow & Architecture Mapping**
MAP data flow and architecture patterns comprehensively.
{static:data_flow_documentation}

**Phase 9: Integration Points & External Dependencies**
DOCUMENT integration points and external service connections.
{static:integration_mapping}
- Deployment platform: {deployment_platform}
- Database present: {has_database}
- API style: {api_style}

**Phase 10: Technical Debt & Maintenance Assessment**
ASSESS technical debt and maintenance requirements.
{static:technical_debt_assessment}
Security level: {security_level}
Performance budget: {performance_budget}

**Phase 11: Agent Context Generation**
GENERATE context artifacts for future agent handoffs.
{static:agent_handoff_context}

**Phase 12: Documentation Artifact Creation**
CREATE persistent documentation artifacts and classifications.
{static:documentation_artifacts}
{static:project_classification}

**Phase 13: Health Scoring & Follow-up Planning**
CALCULATE project health metrics and recommend next steps.
{static:health_scoring}

**Output Required:**

Generate complete documentation file: coderef-foundation-scan-results.md
{static:machine_readable_schema}
Include machine-readable schema: {include_machine_readable}
{static:centralized_knowledge_catalogs}
Generate knowledge catalogs: {generate_knowledge_catalogs}
{static:cross_reference_requirements}
Enforce cross-references: {enforce_cross_references}
{static:terminology_enforcement}
Enforce terminology: {enforce_terminology}
{static:agent_notes_section}
Include agent notes: {include_agent_notes}

### 📚 ENHANCED AGENT ONBOARDING DOCUMENTATION

#### 🎯 Project Overview
- **Project Name:** {project_name}
- **Purpose & Domain:** [Business purpose and target users]
- **Project Type:** [Auto-detected category from {static:project_classification}]
- **Complexity Level:** [Simple/Moderate/Complex/Enterprise]
- **Development Stage:** [Prototype/Active/Maintenance/Legacy]
- **Key Stakeholders:** [Identified decision makers and domain experts]
- **Documentation Mode:** {documentation_mode}
- **Framework Detection Confidence:** [High/Medium/Low with reasoning if {include_agent_notes}]

#### 🏗️ Architecture Deep Dive
- **Framework & Version:** [Detailed framework analysis using {static:framework_parsing_patterns}]
- **Architecture Pattern:** [MVC/Component-based/Microservices/etc]
- **Key Technologies:** [Complete tech stack with versions]
- **Project Structure:** [Detailed folder organization with purposes]
- **Entry Points:** [All application entry points with flow explanations]
- **Design System:** [Component library and styling approach]

#### 🔗 Critical File Map (ID-Referenced if {enforce_cross_references})
**Core Business Logic:**
- [file-{slug}]: [Purpose and key functions]
- [file-{slug}]: [Purpose and key functions]

**Configuration Files:**
- [file-{slug}]: [What it configures and critical settings]

**Integration Points:**
- [integration-{service}]: [External service connections and patterns]

**Shared Utilities:**
- [component-{name}]: [Reusable functions and constants]

#### 📋 Component Relationship Map
[Visual representation of component dependencies and data flow]
- **Parent Components:** [Top-level containers with component-{id} references]
- **Shared Components:** [Reusable UI elements with cross-references]  
- **Data Flow:** [How data moves between components]

#### 🔧 Development Patterns & Conventions (Standardized Terminology if {enforce_terminology})
**Naming Conventions:**
- Files: [Pattern explanation with examples]
- Page-Components: [Pattern explanation with examples]
- Utility-Components: [Pattern explanation with examples]
- Business-Components: [Pattern explanation with examples]

**Code Organization:**
- [Pattern description with examples based on {documentation_mode}]

**Common Patterns:**
- [pattern-{type}-{name}]: [Frequently used patterns with examples]

#### 🌊 Data Flow Documentation
**State-Management:**
- [Approach used and key patterns]
- [Global state structure]
- [Local state patterns]

**Data-Fetching Patterns:**
- [Request/response patterns and conventions]
- [Error handling approaches]
- [Authentication flow]

**Caching-Strategy:**
- [Query patterns and data modeling if {has_database}]
- [ORM/query builder usage]

#### 🔌 External Integration Guide
**Third-Party Services:**
- [integration-{service}]: [Purpose, configuration, usage patterns]

**APIs:**
- [integration-{api}]: [Endpoints used, authentication, data formats]

**Infrastructure:**
- [Platform]: [Configuration and deployment details]

#### ⚠️ Critical Knowledge for Agents
**Must-Know Areas:**
1. [Critical business logic that agents must understand]
2. [Key constraints and limitations]
3. [Security-sensitive areas requiring careful handling]
4. [Complex workflows requiring special attention]

**Common Pitfalls:**
1. [Known issues agents should avoid]
2. [Complex areas requiring extra attention]
3. [Performance bottlenecks to be aware of]

**Development Workflow:**
- [How to run the application locally]
- [Testing procedures and commands]
- [Deployment process and requirements]
- [Code review and quality standards]

#### 📈 Technical Debt & Improvement Areas
**High Priority:**
- [Critical issues requiring immediate attention]

**Medium Priority:**
- [Important improvements for future iterations]

**Low Priority:**
- [Nice-to-have optimizations]

#### 🤖 Agent Scanning Notes (if {include_agent_notes})
**Detection Confidence:**
- Framework detection: [High/Medium/Low with reasoning]
- Component mapping: [Coverage percentage and gaps identified]
- Pattern extraction: [Parsing challenges encountered]

**Coverage Analysis:**
- [Files/areas that couldn't be fully analyzed]
- [Ambiguous implementations requiring clarification]
- [Recommendations for follow-up specialized scans]

#### 🎯 Recommended Follow-up Analysis
Based on findings and {documentation_mode}, run these specialized prompts next:
{follow_up_prompts}

**Suggested Next Steps:**
- coderef-api-scan-prompt.md [if API endpoints detected]
- coderef-auth-scan-prompt.md [if authentication system found]
- coderef-testing-scan-prompt.md [if test coverage gaps identified]
- [additional prompts based on project type and discoveries]

#### 📋 Generated Documentation Artifacts
**Agent Context Files Created:** (if {generate_artifacts})
- CODEBASE_OVERVIEW.md
- AGENT_CONTEXT.md  
- CRITICAL_PATHS.md
- INTEGRATION_GUIDE.md
- CONVENTIONS.md
- COMPONENT_MAP.md

**Knowledge Catalogs Generated:** (if {generate_knowledge_catalogs})
- components.json
- patterns.json
- integrations.json
- workflows.json

#### 🏥 Project Health Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 **Overall Health Score: [X.X/10]**
├─ 🔒 Security Rating: [A-F] ([XX/100])
├─ ⚡ Performance Grade: [1-100]
├─ 🧪 Test Coverage: [XX%]
├─ 📦 Bundle Health: [✅/⚠️/❌] ([size vs {performance_budget}])
├─ 🔧 Maintainability Index: [X/10]
├─ 📚 Documentation Quality: [A-F]
└─ ♿ Accessibility Score: [A-F]

Documentation mode: {documentation_mode}
Output detail level: {output_verbosity}
```

### 5. Context Defaults
```json
{
  "code_location": "[provide repository/files]",
  "project_name": "[auto-detect from package.json]",
  "explicit_parsing_instructions": true,
  "include_machine_readable": false,
  "error_detection_enabled": true,
  "documentation_mode": "comprehensive",
  "incremental_scanning": false,
  "generate_knowledge_catalogs": false,
  "enforce_cross_references": true,
  "enforce_terminology": true,
  "include_agent_notes": false,
  "time_limit": "Deep dive - 20+ minute comprehensive documentation",
  "output_verbosity": "Exhaustive with code examples and detailed explanations",
  "generate_artifacts": true,
  "agent_onboarding_mode": true,
  "deployment_platform": "Auto-detect",
  "has_database": true,
  "api_style": "Auto-detect", 
  "performance_budget": "<500kb for initial load",
  "security_level": "Standard",
  "maintenance_mode": false,
  "follow_up_prompts": "coderef-api-scan-prompt.md, coderef-auth-scan-prompt.md, coderef-testing-scan-prompt.md",
  "documentation_quality_target": "Expert-level for agent onboarding"
}
```

---

This **Enhanced Codebase Documentation & Agent Onboarding Scanner** now provides:
- **Framework-specific parsing patterns** for accurate component detection across diverse codebases
- **Input validation and error detection** for reliable scanning and configuration validation
- **Machine-readable JSON output** for programmatic agent access and cross-referencing
- **Simplified documentation modes** replacing 15+ boolean variables with discovery/detailed/comprehensive
- **Incremental scanning optimization** for efficient updates of large codebases
- **Centralized knowledge catalogs** for structured data access and reuse
- **Cross-referencing system** for connected knowledge graph navigation
- **Terminology enforcement** for consistent architectural vocabulary
- **Agent notes integration** for scanning confidence and coverage gap reporting
- **Command-based language** throughout phases for direct agent instruction
- **Comprehensive agent onboarding** with persistent documentation artifacts
- **Critical file mapping** for immediate codebase understanding
- **Code pattern extraction** for maintaining consistency
- **Data flow documentation** for understanding application logic
- **Integration point mapping** for external dependency awareness
- **Framework-specific analysis** for technology-focused insights
- **Agent handoff context** for seamless knowledge transfer
- **Follow-up prompt planning** for specialized deep-dive analysis
- **Technical debt assessment** for maintenance planning
- **Health scoring system** for objective quality assessment