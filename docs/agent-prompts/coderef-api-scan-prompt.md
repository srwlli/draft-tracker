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
foundation_scan_file (text) - Path to coderef-scan-results.md (required)
maintenance_mode (boolean) - Update existing documentation vs create new
existing_documentation_file (text) - Path to existing API scan results (if maintenance_mode=true)
update_strategy (text) - Full-rewrite/Selective-updates/Append-changes
api_framework (text) - Express/Fastify/Next.js API/tRPC/GraphQL
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
output_format (text) - Technical/Business-friendly/Developer-focused
documentation_depth (text) - Overview/Detailed/Exhaustive
```

### 3. Statics
```
Static Name: foundation_context_integration
Content: "First read the foundation scan results from {foundation_scan_file} to understand: overall project architecture, established coding patterns, security requirements, deployment platform, database schema, authentication strategy, and integration points. Use this context to ensure API documentation aligns with project conventions and architectural decisions."

Static Name: maintenance_mode_instructions
Content: "If maintenance_mode=true: Read existing documentation from {existing_documentation_file}, compare current API implementation with documented APIs, identify changes (new/modified/deleted endpoints), update only changed sections using {update_strategy}, preserve accurate existing documentation, highlight what has changed since last scan."

Static Name: api_discovery_tasks
Content: "Locate all API route files, identify endpoint definitions, catalog HTTP methods used, map URL patterns and parameters, discover middleware chains, identify authentication requirements, find request/response types, locate validation schemas, identify error handling patterns"

Static Name: endpoint_documentation_requirements
Content: "For each endpoint document: HTTP method and full URL path, required authentication (none/bearer/session/api-key), request body schema with required/optional fields, query parameters and path parameters, response schema for success cases, error response formats and status codes, rate limiting rules if present, middleware applied to endpoint"

Static Name: authentication_analysis
Content: "Document authentication patterns: authentication middleware implementation, token validation logic, session management approach, API key handling, OAuth/JWT token flows, refresh token mechanisms, role-based access control, permission checking logic, security headers applied"

Static Name: error_handling_patterns
Content: "Document error handling: global error middleware, custom error classes, error response formatting, validation error handling, database error handling, external API error handling, logging and monitoring integration, user-friendly error messages, error recovery patterns"

Static Name: real_time_analysis
Content: "Document real-time features: WebSocket endpoint implementations, Socket.io configurations, Server-Sent Events setup, real-time data broadcasting, connection management, authentication for real-time connections, message queuing patterns, scaling considerations for real-time features"

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

Static Name: api_dependency_mapping
Content: "Document API operation dependencies: operation sequencing requirements, data consistency requirements between operations, which operations must be called before others, circular dependency identification, transaction boundaries, state dependencies, prerequisite validation requirements"

Static Name: api_versioning_impact_analysis
Content: "Document API versioning effects: client library version change impacts on operations, database schema change effects on API calls, breaking vs non-breaking operation changes, backward compatibility requirements, deprecation handling in operations, migration paths for version updates"

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

**Phase 1: Foundation Context Integration**
{static:foundation_context_integration}

**Phase 2: Maintenance Mode Processing** 
{static:maintenance_mode_instructions}
Update strategy: {update_strategy}
Existing documentation: {existing_documentation_file}

**Phase 3: API Discovery & Inventory**
{static:api_discovery_tasks}

**Phase 4: Endpoint Documentation**
{static:endpoint_documentation_requirements}
{static:api_request_response_examples}
Include code examples: {include_code_examples}
Include request examples: {include_request_examples}
Document middleware: {document_middleware}
Document API errors: {document_api_errors}

**Phase 5: Authentication & Security Analysis**
{static:authentication_analysis}
{static:api_security_checklist}
{static:api_security_configuration}
Document security config: {document_security_config}

**Phase 6: Error Handling Documentation**
{static:error_handling_patterns}
{static:api_error_response_patterns}

**Phase 7: Real-time & Advanced Features**
{static:real_time_analysis}
Analyze real-time endpoints: {analyze_real_time}
Document webhooks: {document_webhooks}

**Phase 8: API Testing & Quality**
{static:api_testing_patterns}
Include testing examples: {include_testing_examples}

**Phase 9: Performance & Monitoring**
{static:api_performance_documentation}
Include performance data: {include_performance_data}
Analyze rate limiting: {analyze_rate_limiting}

**Phase 10: API Dependencies & Evolution**
{static:api_dependency_mapping}
{static:api_versioning_impact_analysis}
Document dependencies: {document_dependencies}
Analyze versioning impact: {analyze_versioning_impact}

**Phase 11: Versioning & Evolution Strategy**
{static:versioning_and_evolution}
Check versioning: {check_versioning}

**Output Required:**

Generate complete documentation file: coderef-api-scan-results.md

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
  "foundation_scan_file": "./coderef-scan-results.md",
  "maintenance_mode": false,
  "existing_documentation_file": "./coderef-api-scan-results.md",
  "update_strategy": "Selective-updates",
  "api_framework": "Auto-detect",
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