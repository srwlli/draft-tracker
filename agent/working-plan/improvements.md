1. Address Critical Route Handler Inconsistency 🔴 Breaking Change Detected

  Current Gap: Recent changes show routes using { params: Promise<{ id: string }> } with await params, contradicting Phase 3's correction to remove Promise typing.

  Critical Issue: The system now has mixed patterns - some routes await params (recently changed files) while Phase 3 established the correct non-Promise pattern.

  Add to Phase 5 Tasks:
  Route Handler Consistency Fix:
  - [ ] Audit ALL route handlers for consistent params typing
  - [ ] Standardize to Next.js App Router correct pattern:
    ```typescript
    // CORRECT (Phase 3 established)
    { params }: { params: { id: string } }
    const { id } = params  // No await

    // INCORRECT (recent changes reverted this)
    { params }: { params: Promise<{ id: string }> }
    const { id } = await params  // Should not await
  - Update recently modified files:
    - src/app/api/drafts/[id]/route.ts
    - src/app/api/drafts/[id]/picks/route.ts
    - src/app/api/drafts/[id]/picks/[pickId]/route.ts
    - src/app/api/public/drafts/[id]/route.ts
  - Create TypeScript integration test to prevent regression

  **Why Critical**: Mixed patterns create maintenance confusion and potential runtime issues. Phase 3 specifically addressed this.

  ### 2. **Implement Production-Grade Logging Strategy** 📊 **Security vs. Observability Balance**

  **Current Gap**: Plan removes all console logs but doesn't provide alternative for production debugging of security issues.

  **Risk**: Removing all logs could make security incidents harder to diagnose in production.

  **Add to Tasks**:
  ```markdown
  Structured Logging Implementation:
  - [ ] Create secure logging utility that filters PII:
    ```typescript
    // src/lib/logger.ts
    interface LogContext {
      userId?: string;
      draftId?: string;
      action?: string;
      error?: string;
      duration?: number;
    }

    export const logger = {
      security: (message: string, context: LogContext) => {
        if (process.env.NODE_ENV === 'production') {
          // Use structured logging service (e.g., Vercel Analytics, Sentry)
          console.log(JSON.stringify({
            level: 'security',
            message,
            timestamp: new Date().toISOString(),
            ...sanitizeContext(context) // Remove PII
          }));
        } else {
          console.log(`[SECURITY] ${message}`, context);
        }
      }
    };
  - Replace console.error with structured logging in security-critical areas:
    - Admin token validation failures
    - CSP violations
    - Rate limiting triggers
    - Database constraint violations
  - Implement log aggregation for production monitoring
  - Create security incident detection from log patterns

  **Why Important**: Security monitoring requires observability without exposing sensitive information.

  ### 3. **Add CSP Implementation with Staged Deployment** 🚀 **Risk Mitigation**

  **Current Gap**: Plan proposes aggressive CSP tightening without staged rollout strategy for a live production system.

  **Risk**: Immediate CSP enforcement could break real-time functionality for live users during drafts.

  **Add to Tasks**:
  ```markdown
  Staged CSP Deployment Strategy:
  - [ ] Phase 1: Implement CSP in report-only mode first:
    ```typescript
    // middleware.ts - Initial deployment
    response.headers.set(
      'Content-Security-Policy-Report-Only',
      "default-src 'self'; " +
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co; " +
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " + // Monitor violations first
      "frame-ancestors 'none';"
    );
  - Phase 2: Monitor CSP violations for 48-72 hours in production
  - Phase 3: Adjust policies based on real usage patterns:
  // Example: Allow specific nonces for dynamic scripts if needed
  const nonce = crypto.randomBytes(16).toString('base64');
  response.headers.set('x-nonce', nonce);
  - Phase 4: Enforce final CSP after validation
  - Add CSP violation monitoring endpoint:
  // src/app/api/csp-violations/route.ts
  export async function POST(request: Request) {
    const violation = await request.json();
    logger.security('CSP Violation', {
      directive: violation['violated-directive'],
      blockedUri: violation['blocked-uri']
    });
    return new Response('OK');
  }

  Validation Requirements:
  - Test WebSocket connections work with new CSP
  - Verify Supabase real-time subscriptions function correctly
  - Confirm admin/viewer page functionality intact
  - Test on staging with realistic user traffic patterns

  **Why Critical**: Live production system requires careful rollout of security changes to prevent service disruption.

  ## Additional Phase 5 Enhancements

  ### **Security Testing Framework**
  ```markdown
  - [ ] Create automated security header testing:
    ```typescript
    // tests/security-headers.test.ts
    test('Security headers present on all routes', async () => {
      const routes = ['/api/drafts', '/draft/test-id'];
      for (const route of routes) {
        const response = await fetch(route);
        expect(response.headers.get('x-content-type-options')).toBe('nosniff');
        expect(response.headers.get('x-frame-options')).toBe('DENY');
      }
    });

  ### **Performance Monitoring**
  ```markdown
  - [ ] Add security header performance metrics
  - [ ] Monitor middleware processing time after changes
  - [ ] Track real-time connection success rates

  Updated Time Estimate

  Original: 1-2 hoursWith Improvements: 3-4 hours

  The additional scope ensures:
  1. Consistency across all route handlers
  2. Production safety with staged CSP deployment
  3. Observability without security risks

  These improvements align with enterprise-grade standards and protect the live production system from security changes that could disrupt the draft experience.

---

 Centralize Security Header Definitions. Instead of defining the headers directly inside the middleware, the plan could be improved by adding a task to create a dedicated utility function (e.g., in
      src/lib/security.ts) that returns an object containing all the security headers. The middleware would then simply call this function. This centralizes the header logic, making it easier to manage, update, and
      test independently.


   2. Automate the Test Plan. The current test plan relies on manual checks. A key improvement would be to automate it. The plan should include adding an integration test that fetches a page and asserts that the
      Content-Security-Policy header is present and correctly configured. For the PII logs, a CI check could be added to the pipeline that fails the build if console.log is found in the production output, providing a
      much stronger guarantee.


   3. Add an Investigation Step for the CSP. The task to tighten the Content-Security-Policy by removing 'unsafe-inline' can be very tricky with modern UI libraries. The plan should include a specific preliminary
      task: "Investigate if shadcn/ui or its dependencies (Radix UI) require style-src: 'unsafe-inline' for dynamically positioned elements like tooltips or dialogs." This de-risks the task by identifying potential
      blockers upfront and informing the decision to either allow it or plan for a more complex nonce-based implementation.

---

 Nonce‑based CSP with env‑aware rollout                                                                                                                                                                                                    
      - Replace generic “tighten CSP” with a concrete plan:                                                                                                                                                                                   
      - Generate a per‑request nonce in middleware; attach it to `Content-Security-Policy: script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'` (keep style inline only if needed).                                          
      - Pass the nonce to pages (e.g., via a header or request attribute) and apply it to any `<script>` that needs it (Next’s `next/script` supports `nonce`).                                                                               
      - Keep a `Report-Only` CSP for the first rollout (`Content-Security-Policy-Report-Only`) and add `report-to`/`report-uri` so violations are captured before enforcing.                                                                  
      - Provide exact prod CSP example, including Supabase endpoints:                                                                                                                                                                         
        - `default-src 'self'; frame-ancestors 'none'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://              
  *.supabase.co;`                                                                                                                                                                                                                             
      - Dev mode may retain `'unsafe-eval'` for React Fast Refresh; gate with `NODE_ENV`.                                                                                                                                                     
                                                                                                                                                                                                                                              
  - Add modern security headers with clear guardrails                                                                                                                                                                                         
      - Strict‑Transport‑Security (HSTS) for HTTPS deployments:                                                                                                                                                                               
      - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (only when always on HTTPS).                                                                                                                                
  - Cross‑Origin policies (conditionally, with caveats):                                                                                                                                                                                      
      - `Cross-Origin-Opener-Policy: same-origin`                                                                                                                                                                                             
      - `Cross-Origin-Embedder-Policy: require-corp` (test carefully; can break third‑party embeds)                                                                                                                                           
      - `Cross-Origin-Resource-Policy: same-site`                                                                                                                                                                                             
  -                                                                                                                                                                                                                                           
  Keep frame-ancestors 'none' as the authoritative anti‑framing control (consider removing X-Frame-Options redundancy or set to SAMEORIGIN if needed for legacy).                                                                             
  -                                                                                                                                                                                                                                           
  Document when to disable COEP/COOP if any third‑party scripts or embeds break.                                                                                                                                                              
  -                                                                                                                                                                                                                                           
  Make verification concrete and automated                                                                                                                                                                                                    
      - Add specific checks to the Test Plan and CI:                                                                                                                                                                                          
      - curl examples:                                                                                                                                                                                                                        
        - `curl -I https://app.example.com/ | grep -Ei 'content-security-policy|strict-transport-security|permissions-policy|referrer-policy|x-content-type-options|cross-origin'`                                                            
      - Playwright test asserting headers exist on a representative page and an API route.                                                                                                                                                    
      - Add a temporary `Content-Security-Policy-Report-Only` in staging and collect reports via a simple endpoint (or a service like Report URI) before switching to enforce.                                                                
  - Explicitly list which public endpoint columns are returned in the plan (e.g., players: id, name, position, default_rank, teams(id, team_name, abbreviation)), and verify via an integration test that extra columns aren’t exposed.   