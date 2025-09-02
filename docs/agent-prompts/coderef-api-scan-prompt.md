## Five Elements for API Documentation Template

### 1. Categories
```
Development > API Analysis > Endpoint Documentation
Development > API Analysis > Schema Documentation
Development > API Analysis > Authentication Patterns
Development > API Analysis > Error Handling
Development > API Analysis > Real-time Connections
```

### 2. Variables
```
project_name (text) - Project identifier
code_location (text) - Repository URL or file paths
foundation_scan_file (text) - Path to coderef-foundation-scan-results.md (required)
maintenance_mode (boolean) - Update existing documentation vs create new
existing_documentation_file (text) - Path to existing API scan results (if maintenance_mode=true)
update_strategy (text) - Full-rewrite/Selective-updates/Append-changes
api_framework (text) - Express/Fastify/Next.js API/tRPC/GraphQL
explicit_parsing_instructions (boolean) - Use framework-specific parsing patterns
error_detection_enabled (boolean) - Validate inputs and cross-reference foundation scan
include_machine_readable (boolean) - Generate JSON/YAML schema alongside markdown
include_code_examples (boolean) - Include endpoint implementation code
document_middleware (boolean) - Document middleware chains and logic
analyze_rate_limiting (boolean) - Check for rate limiting implementations
check_versioning (boolean) - Analyze API versioning strategy
include_testing_examples (boolean) - Include API test examples
document_webhooks (boolean) - Document webhook implementations
analyze_real_time (boolean) - Document WebSocket/SSE endpoints
security_focus (boolean) - Deep dive on security implementations
document_api_errors (boolean) - Include actual API error response examples
include_performance_data (boolean) - Document operation performance characteristics
include_request_examples (boolean) - Show complete request/response examples
document_dependencies (boolean) - Map operation dependency chains
analyze_versioning_impact (boolean) - Document version change impacts on operations
document_security_config (boolean) - Include API security configuration details
documentation_mode (text) - discovery/detailed/comprehensive
enhanced_dependency_mapping (boolean) - Include task-oriented metadata
incremental_scanning (boolean) - Optimize for partial updates
non_standard_api_detection (boolean) - Detect client-side and unconventional APIs
generate_knowledge_catalogs (boolean) - Create centralized knowledge objects
enforce_cross_references (boolean) - Require ID-based linking between components
code_extraction_enabled (boolean) - Extract actual code snippets with source locations
enforce_terminology (boolean) - Use standardized vocabulary
formalize_realtime_schemas (boolean) - Structure real-time connection data
include_agent_notes (boolean) - Add scanning meta-information
output_format (text) - Technical/Business-friendly/Developer-focused
documentation_depth (text) - Overview/Detailed/Exhaustive
```

### 3. Statics
```
Static Name: framework_parsing_patterns
Content: "Use framework-specific patterns to detect API components: Express (app\.(get|post|put|delete)\(), Supabase (\.from\(\)\.(select|insert|update|delete)\(), GraphQL (type\s+\w+\s*{|Query\s*{|Mutation\s*{), Next.js API (export\s+(default\s+)?function\s+handler), FastAPI (@app\.(get|post|put|delete)), tRPC (\.(query|mutation)\(), Socket.io (io\.(on|emit)), WebSocket (new WebSocket|ws://). Apply these patterns systematically to ensure complete API component discovery."

Static Name: input_validation_logic
Content: "PRE-PROCESSING VALIDATION: 1) Verify {foundation_scan_file} exists and is readable, 2) Cross-reference {api_framework} with detected code patterns in codebase, 3) If maintenance_mode=true, validate {existing_documentation_file} exists, 4) Check update_strategy compatibility with existing documentation format, 5) Flag mismatched configurations and provide correction suggestions, 6) Validate all boolean variables have explicit values, 7) Ensure foundation scan context is loaded before proceeding with API analysis."

Static Name: foundation_context_integration
Content: "First read the foundation scan results from {foundation_scan_file} to understand: overall project architecture, established coding patterns, security requirements, deployment platform, database schema, authentication strategy, and integration points. Use this context to ensure API documentation aligns with project conventions and architectural decisions."

Static Name: maintenance_mode_instructions
Content: "If maintenance_mode=true: Read existing documentation from {existing_documentation_file}, compare current API implementation with documented APIs, identify changes (new/modified/deleted endpoints), update only changed sections using {update_strategy}, preserve accurate existing documentation, highlight what has changed since last scan. If incremental_scanning=true, apply {static:incremental_scanning_optimization} for efficient updates."

Static Name: api_discovery_tasks
Content: "Locate all API route files, identify endpoint definitions, catalog HTTP methods used, map URL patterns and parameters, discover middleware chains, identify authentication requirements, find request/response types, locate validation schemas, identify error handling patterns"

Static Name: endpoint_documentation_requirements
Content: "For each endpoint document: HTTP method and full URL path, required authentication (none/bearer/session/api-key), request body schema with required/optional fields, query parameters and path parameters, response schema for success cases, error response formats and status codes, rate limiting rules if present, middleware applied to endpoint"

Static Name: authentication_analysis
Content: "Document authentication patterns: authentication middleware implementation, token validation logic, session management approach, API key handling, OAuth/JWT token flows, refresh token mechanisms, role-based access control, permission checking logic, security headers applied"

Static Name: error_handling_patterns
Content: "Document error handling: global error middleware, custom error classes, error response formatting, validation error handling, database error handling, external API error handling, logging and monitoring integration, user-friendly error messages, error recovery patterns"

Static Name: real_time_analysis
Content: "Document real-time features using formalized schemas: WebSocket endpoint implementations, Socket.io configurations, Server-Sent Events setup, real-time data broadcasting, connection management, authentication for real-time connections, message queuing patterns, scaling considerations for real-time features. Apply {static:formalized_realtime_schemas} structure for consistency."

Static Name: api_testing_patterns
Content: "Document API testing: test file locations and naming, request/response mocking patterns, authentication testing approaches, endpoint testing examples, integration test patterns, performance testing setup, API contract testing, error scenario testing"

Static Name: api_security_checklist
Content: "Security analysis: input validation and sanitization, SQL injection prevention, XSS protection measures, CORS configuration, CSRF protection, rate limiting implementation, API key security, sensitive data handling, audit logging, encryption in transit"

Static Name: api_error_response_patterns
Content: "Document actual API error responses: PostgrestError object structure and fields, HTTP status codes for different failure types, authentication error responses, validation error formats, rate limiting error messages, network timeout errors, database constraint violation errors, real error examples from each operation type with exact error codes and messages"

Static Name: api_performance_documentation
Content: "Document API operation performance: query execution time ranges, real-time subscription latency measurements, rate limiting thresholds per operation type, connection establishment times, polling interval performance impact, mobile vs desktop performance characteristics, performance benchmarks and baselines"

Static Name: api_request_response_examples
Content: "Document complete API operation examples: full request payloads with real data values, complete response objects with all fields populated, edge case request scenarios, successful response examples, error response examples, nested object examples, array response examples, authentication header examples"

Static Name: enhanced_dependency_mapping
Content: "Document API operation dependencies with task-oriented metadata: operation sequencing requirements with execution order constraints, data consistency requirements between operations, prerequisite API calls for complex workflows, circular dependency identification with resolution strategies, transaction boundaries and rollback procedures, state dependencies with data flow diagrams, prerequisite validation requirements, dependency chains for debugging scenarios, workflow orchestration patterns."

Static Name: incremental_scanning_optimization
Content: "INCREMENTAL SCANNING LOGIC: 1) Compare file modification timestamps against last scan, 2) Detect endpoint signature changes (parameters, return types), 3) Identify new/modified/deleted API components, 4) Skip unchanged files for efficiency, 5) Generate change summary with before/after comparisons, 6) Update only affected documentation sections, 7) Preserve accurate existing documentation, 8) Flag potential breaking changes for review."

Static Name: non_standard_api_patterns
Content: "Detect unconventional API architectures: Client-side database operations (Supabase .from().select(), Firebase queries), WebSocket connection management (Socket.io events, native WebSocket handlers), Server-sent event implementations (EventSource, streaming responses), GraphQL subscriptions, tRPC procedure calls, Serverless function APIs, Edge function endpoints, Real-time database triggers, Client-side state synchronization patterns."

Static Name: api_dependency_mapping
Content: "Document API operation dependencies: operation sequencing requirements, data consistency requirements between operations, which operations must be called before others, circular dependency identification, transaction boundaries, state dependencies, prerequisite validation requirements"

Static Name: api_versioning_impact_analysis
Content: "Document API versioning effects: client library version change impacts on operations, database schema change effects on API calls, breaking vs non-breaking operation changes, backward compatibility requirements, deprecation handling in operations, migration paths for version updates"

Static Name: centralized_knowledge_catalogs
Content: "Generate canonical knowledge objects: errors.json (API error response catalog with codes, messages, and resolution steps), auth_patterns.json (authentication method reference with implementation details), schemas.json (request/response schema definitions with validation rules), endpoints.json (structured endpoint inventory with metadata). These catalogs enable programmatic access and prevent documentation duplication."

Static Name: cross_reference_requirements
Content: "Implement ID-based linking system: Assign unique IDs to endpoints (api-endpoint-{method}-{path-slug}), schemas (schema-{name}), errors (error-{code}), middleware (middleware-{name}). Reference these IDs across documentation sections for connected knowledge graph navigation. Include backlinks and related component references."

Static Name: code_extraction_commands
Content: "EXTRACT actual code with source locations: Complete function implementations with file:line references, Real error response objects from codebase, Actual middleware chain implementations, Live schema validation code, Working request/response examples from tests, Implementation patterns with exact syntax, Configuration objects with real values."

Static Name: terminology_enforcement
Content: "Standardize vocabulary throughout documentation: Auth types (Bearer-Token, Session-Cookie, API-Key, OAuth2-Bearer), Error categories (ValidationError, AuthenticationError, AuthorizationError, NotFoundError, ServerError), HTTP methods (GET, POST, PUT, DELETE, PATCH), Response codes (200-OK, 201-Created, 400-BadRequest, 401-Unauthorized, 403-Forbidden, 404-NotFound, 500-InternalServerError), Data types (string, number, boolean, array, object, null)."

Static Name: formalized_realtime_schemas
Content: "Structure real-time documentation as: {protocol: 'WebSocket'|'SSE'|'Socket.io', endpoint: 'connection_url', authentication: {method, requirements}, channels: [{name, purpose, data_schema}], events: [{name, direction, payload_schema, triggers}], connection_management: {lifecycle, reconnection, error_handling}, scaling_considerations: {concurrent_connections, resource_usage}}."

Static Name: agent_notes_section
Content: "Include scanning meta-information: Coverage gaps identified during analysis, Ambiguous implementations requiring clarification, Framework detection confidence levels (High/Medium/Low), Parsing challenges encountered, Incomplete or missing documentation areas, Recommendations for improved code organization, Integration complexity assessments."

Static Name: api_security_configuration
Content: "Document API security configuration: connection security settings, SSL/TLS configuration, API key usage patterns per operation, CORS policy configuration, security header implementations, authentication token configuration, rate limiting configuration per endpoint"

Static Name: versioning_and_evolution
Content: "API evolution patterns: versioning strategy (URL/header/query), backward compatibility approach, deprecation notices and timelines, migration guides for version changes, breaking change management, API documentation maintenance, client SDK versioning"
```

### 4. Formula Template
```
**COMPREHENSIVE API DOCUMENTATION GENERATOR**
Create or update exhaustive API documentation for {project_name} at {code_location}.

Project: {project_name}
Foundation context: {foundation_scan_file}
Maintenance mode: {maintenance_mode}
API Framework: {api_framework}
Documentation depth: {documentation_depth}
Security focus: {security_focus}

**Phase 1: Pre-Processing Validation**
{static:input_validation_logic}
Error detection enabled: {error_detection_enabled}

**Phase 2: Framework Pattern Detection**
{static:framework_parsing_patterns}
Explicit parsing instructions: {explicit_parsing_instructions}

**Phase 3: Foundation Context Integration**
{static:foundation_context_integration}

**Phase 4: Maintenance Mode Processing** 
{static:maintenance_mode_instructions}
Update strategy: {update_strategy}
Existing documentation: {existing_documentation_file}

**Phase 5: API Discovery & Inventory**
SCAN codebase for API endpoints using framework-specific patterns.
{static:api_discovery_tasks}
{static:non_standard_api_patterns}
Non-standard API detection: {non_standard_api_detection}

**Phase 6: Endpoint Documentation**
EXTRACT endpoint definitions and parameters with complete documentation.
{static:endpoint_documentation_requirements}
{static:api_request_response_examples}
Include code examples: {include_code_examples}
Include request examples: {include_request_examples}
Document middleware: {document_middleware}
Document API errors: {document_api_errors}

**Phase 7: Authentication & Security Analysis**
ANALYZE authentication and authorization patterns comprehensively.
{static:authentication_analysis}
{static:api_security_checklist}
{static:api_security_configuration}
Document security config: {document_security_config}

**Phase 8: Error Handling Documentation**
DOCUMENT error handling patterns and response structures.
{static:error_handling_patterns}
{static:api_error_response_patterns}

**Phase 9: Real-time & Advanced Features**
STRUCTURE real-time connections using formalized schemas.
{static:real_time_analysis}
{static:formalized_realtime_schemas}
Formalize realtime schemas: {formalize_realtime_schemas}
Analyze real-time endpoints: {analyze_real_time}
Document webhooks: {document_webhooks}

**Phase 10: API Testing & Quality**
{static:api_testing_patterns}
Include testing examples: {include_testing_examples}

**Phase 11: Performance & Monitoring**
{static:api_performance_documentation}
Include performance data: {include_performance_data}
Analyze rate limiting: {analyze_rate_limiting}

**Phase 12: API Dependencies & Evolution**
{static:enhanced_dependency_mapping}
{static:api_versioning_impact_analysis}
Enhanced dependency mapping: {enhanced_dependency_mapping}
Document dependencies: {document_dependencies}
Analyze versioning impact: {analyze_versioning_impact}

**Phase 13: Versioning & Evolution Strategy**
{static:versioning_and_evolution}
Check versioning: {check_versioning}

**Output Required:**

Generate complete documentation file: coderef-api-scan-results.md
{static:centralized_knowledge_catalogs}
Generate knowledge catalogs: {generate_knowledge_catalogs}
{static:cross_reference_requirements}
Enforce cross-references: {enforce_cross_references}
{static:code_extraction_commands}
Code extraction enabled: {code_extraction_enabled}
Include machine-readable schema: {include_machine_readable}
{static:terminology_enforcement}
Enforce terminology: {enforce_terminology}
{static:agent_notes_section}
Include agent notes: {include_agent_notes}

### 📡 API DOCUMENTATION

#### 🎯 API Overview
- **Project:** {project_name}
- **API Framework:** [Detected framework and version]
- **Base URL:** [API base URL/domain]
- **API Style:** [REST/GraphQL/tRPC/Hybrid]
- **Version Strategy:** [URL/Header/Query parameter versioning]
- **Documentation:** [OpenAPI/Swagger/Custom docs location]

#### 🛣️ Endpoint Inventory

**Public Endpoints:**
```
GET    /api/endpoint    - Description
POST   /api/endpoint    - Description
PUT    /api/endpoint    - Description
DELETE /api/endpoint    - Description
```

**Protected Endpoints:**
```
GET    /api/protected   - Description [Auth: Bearer token]
POST   /api/admin       - Description [Auth: Admin role]
```

**Real-time Endpoints:**
```
WS     /api/socket      - WebSocket connection
SSE    /api/stream      - Server-sent events
```

#### 📋 Detailed Endpoint Documentation

**[For each endpoint, provide:]**

##### GET /api/example/{id}
- **Purpose:** [What this endpoint does]
- **Authentication:** [Required auth method]
- **Path Parameters:**
  - `id` (string, required) - [Description]
- **Query Parameters:**
  - `include` (string, optional) - [Description]
- **Request Headers:**
  - `Authorization: Bearer <token>` (required)
- **Response Schema:**
```json
{
  "id": "string",
  "name": "string",
  "data": "object"
}
```
- **Error Responses:**
  - `400` - Bad Request: [When this occurs]
  - `401` - Unauthorized: [Auth failure details]
  - `404` - Not Found: [Resource not found]
- **Rate Limiting:** [X requests per minute]
- **Code Location:** [File path and function name]
- **Middleware Applied:** [List of middleware functions]

#### 🔐 Authentication & Authorization

**Authentication Methods:**
- [Method 1]: [Implementation details and usage]
- [Method 2]: [Implementation details and usage]

**Authorization Patterns:**
- **Role-based:** [Implementation and roles]
- **Permission-based:** [Permission system details]
- **Resource-based:** [Ownership/access patterns]

**Security Implementation:**
- **Token Management:** [JWT/session approach]
- **Middleware Chain:** [Auth middleware order and logic]
- **Security Headers:** [Implemented headers]

#### 🔄 Request/Response Patterns

**Standard Response Format:**
```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "errors": array
}
```

**Pagination Pattern:**
```json
{
  "data": array,
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "hasNext": boolean
  }
}
```

**Error Response Format:**
```json
{
  "error": {
    "code": string,
    "message": string,
    "details": object
  }
}
```

#### 🛡️ Security Implementation

**Input Validation:**
- [Validation library used]
- [Validation patterns and rules]
- [Sanitization approaches]

**Security Measures:**
- **CORS Configuration:** [Settings and restrictions]
- **Rate Limiting:** [Implementation and limits]
- **Input Sanitization:** [XSS/injection prevention]
- **Audit Logging:** [Security event logging]

#### ⚡ Real-time Features

**WebSocket Implementation:**
- **Connection Endpoint:** [WS URL and auth]
- **Event Types:** [Available events and payloads]
- **Connection Management:** [Authentication and lifecycle]

**Server-Sent Events:**
- **Stream Endpoints:** [SSE URLs and data types]
- **Event Formats:** [Event structure and types]

#### 🧪 API Testing

**Test File Locations:**
- [Path to API tests]
- [Test naming conventions]

**Testing Patterns:**
- **Unit Tests:** [Endpoint testing approach]
- **Integration Tests:** [Full flow testing]
- **Authentication Tests:** [Security testing patterns]

**Mock Patterns:**
- [How external APIs are mocked]
- [Test data factories used]

#### 📈 Performance & Monitoring

**Performance Considerations:**
- **Caching:** [Caching strategies implemented]
- **Database Queries:** [Optimization patterns]
- **Response Times:** [Performance targets]

**Monitoring Setup:**
- **Logging:** [Request/response logging]
- **Metrics:** [Performance metrics tracked]
- **Error Tracking:** [Error monitoring tools]

#### 🔧 Development Workflow

**Local Development:**
- **Setup Commands:** [How to start API locally]
- **Environment Variables:** [Required configuration]
- **Database Setup:** [Local database requirements]

**Code Organization:**
- **Route Organization:** [File structure patterns]
- **Controller Patterns:** [Business logic organization]
- **Service Layer:** [Business logic abstraction]

#### 📚 API Evolution

**Versioning Strategy:**
- [How versions are managed]
- [Backward compatibility approach]
- [Deprecation process]

**Change Management:**
- [How breaking changes are handled]
- [Client notification process]
- [Migration documentation]

Include code examples: {include_code_examples}
Output format: {output_format}
```

### 5. Context Defaults
```json
{
  "project_name": "[auto-detect from package.json]",
  "code_location": "[provide repository/files]",
  "foundation_scan_file": "./coderef-foundation-scan-results.md",
  "maintenance_mode": false,
  "existing_documentation_file": "./coderef-api-scan-results.md",
  "update_strategy": "Selective-updates",
  "api_framework": "Auto-detect",
  "explicit_parsing_instructions": true,
  "error_detection_enabled": true,
  "include_machine_readable": false,
  "include_code_examples": true,
  "document_middleware": true,
  "analyze_rate_limiting": true,
  "check_versioning": true,
  "include_testing_examples": true,
  "document_webhooks": true,
  "analyze_real_time": true,
  "security_focus": true,
  "document_api_errors": true,
  "include_performance_data": true,
  "include_request_examples": true,
  "document_dependencies": true,
  "analyze_versioning_impact": true,
  "document_security_config": true,
  "output_format": "Developer-focused",
  "documentation_mode": "comprehensive",
  "enhanced_dependency_mapping": true,
  "incremental_scanning": false,
  "non_standard_api_detection": true,
  "generate_knowledge_catalogs": false,
  "enforce_cross_references": true,
  "code_extraction_enabled": true,
  "enforce_terminology": true,
  "formalize_realtime_schemas": true,
  "include_agent_notes": false,
  "documentation_depth": "Exhaustive"
}
```

---

This **API Documentation Generator** creates comprehensive API documentation that enables agents to:
- **Understand all endpoints** with complete implementation details
- **Work with authentication** patterns and security implementations  
- **Modify existing APIs** with full context of request/response patterns
- **Add new endpoints** following established conventions
- **Debug API issues** with complete error handling documentation
- **Test API changes** using documented testing patterns
- **Maintain API security** with documented security measures