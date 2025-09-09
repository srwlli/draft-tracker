# Synthesized Code Review - Draft Tracker

**Code Context**: [Language/Framework: TypeScript/Next.js] [Project Type: Real-time Web App] [Target Environment: Production]

This report combines findings from multiple code reviews to provide a single, comprehensive set of recommendations.

---

## 1. Code Quality & Readability

- **Rating**: ⚠️ **Needs Attention**
- **Summary**: The codebase is well-structured and generally follows conventions, but several issues impact maintainability and production safety.
- **Findings**:
    - **Naming & Structure**: Good modular structure (`/lib`, `/hooks`, etc.). However, the presence of both a root `middleware.ts` and `src/middleware.ts` is confusing and should be consolidated to the root, which is what Next.js uses.
    - **Logging**: Production `console.log` statements are present in client-side code (e.g., `create-draft.tsx`, `useRealtimeRankings.ts`), which can leak sensitive information like user emails and degrade performance. All user-facing logs should be removed or gated by `NODE_ENV`.
    - **Clarity**: Magic numbers are used in `middleware.ts` for rate limiting. These should be extracted into named constants for clarity.
    - **Documentation**: While some inline comments are helpful, most components and API hooks lack JSDoc comments explaining their purpose, props, and return values, increasing the cognitive load for new developers.
    - **Typing**: The use of `NodeJS.Timeout` in browser-specific React hooks (`useRealtimeRankings.ts`) is not ideal. Prefer using `ReturnType<typeof setTimeout>` for better cross-environment type safety.

---

## 2. Performance Analysis

- **Rating**: ❌ **Critical Issue**
- **Summary**: While some performance optimizations are well-implemented, a critical memory leak exists in the middleware that will cause issues under load.
- **Findings**:
    - **(Critical) Memory Leak**: The in-memory `Map` used for rate limiting in `middleware.ts` will grow indefinitely as new users make requests, as there is no cleanup mechanism for expired entries. This will lead to a memory leak and server degradation. A distributed solution (e.g., Redis, Upstash) is recommended for production, but an immediate fix is to add a `setInterval` to periodically purge stale IP addresses.
    - **Over-fetching**: The public draft API (`/api/public/drafts/[id]`) uses `SELECT *` to fetch player data. This is inefficient and should be narrowed to only the columns required by the client to reduce payload size.
    - **Client-Side Rendering**: The `PlayerRankings` component lacks `useMemo` for expensive sorting operations, potentially causing unnecessary re-renders on every state change.
    - **Image Optimization**: The project does not use the built-in `next/image` component, missing out on automatic, critical performance optimizations like lazy loading, resizing, and modern format conversion (WebP).

---

## 3. Security Audit

- **Rating**: ❌ **Critical Issue**
- **Summary**: Multiple critical security vulnerabilities were found that require immediate attention, including improper handling of admin credentials and insecure database client configuration.
- **Findings**:
    - **(Critical) Insecure Admin Client**: The Supabase service role client in `supabase-server.ts` is configured incorrectly. It forwards user cookies, which is unnecessary and dangerous for a service-role client, and does not disable session persistence. This could lead to unintended privilege escalation. It should be configured to be stateless.
    - **(Critical) Admin Token in URL**: The `admin_token` is passed directly in the URL for admin pages. This is a major security risk, as URLs are logged in browser history, server logs, and referrer headers. The token should be passed via a secure, short-lived cookie or stateful mechanism, not the URL.
    - **(High) Missing Input Validation**: API routes, particularly `user-rankings`, lack schema-based validation (e.g., with Zod). Route parameters like `draftId` are not validated to ensure they are in UUID format, creating a potential vector for injection or unexpected errors.
    - **(Medium) Weak Content Security Policy (CSP)**: The current CSP in `middleware.ts` allows `'unsafe-eval'` and `'unsafe-inline'`, significantly weakening XSS protection. This policy should be tightened to be as restrictive as possible.
    - **(Low) Inconsistent Token Validation**: Admin tokens are validated differently in the middleware (plaintext comparison) versus in the API routes (`timingSafeEqual`). This should be consolidated to a single, secure validation method.

---

## 4. Standards Compliance & Best Practices

- **Rating**: ⚠️ **Needs Attention**
- **Summary**: The project follows many Next.js conventions but deviates on several key points, including API implementation and error handling.
- **Findings**:
    - **(High) Incorrect Route Handler Typing**: API route handlers incorrectly type the `params` object as a `Promise` and `await` it. In the Next.js App Router, `params` is a plain object, not a promise. This needs to be corrected across all relevant API routes.
    - **Inconsistent API Responses**: Some API endpoints (e.g., `user-rankings`) return raw arrays, while others use a standardized `{ data }` wrapper. All API responses should be standardized for predictable client-side handling.
    - **Missing Framework Features**: The project does not use Next.js conventions like `error.tsx` and `loading.tsx` for handling component-level errors and loading states, relying instead on a custom `ErrorBoundary` and manual loading states.

---

## 5. Bug Detection

- **Rating**: ❌ **Critical Issue**
- **Summary**: A critical race condition exists in the core draft pick logic, which could lead to data corruption during a draft.
- **Findings**:
    - **(Critical) Draft Pick Race Condition**: The fallback logic in the `POST /api/drafts/[id]/picks` route (for when the atomic SQL function is not found) is not atomic. It first queries for the latest pick number and then inserts a new one. If two users draft simultaneously, they could both receive the same pick number, corrupting the draft order. The `create_draft_pick_atomic` SQL function itself should be hardened with row-level locking (`FOR UPDATE`) to be truly atomic.
    - **(High) App Crash on Missing Env Vars**: The Supabase client in `src/lib/supabase.ts` throws an error at import time if environment variables are missing. This will crash the entire application during the build process or on startup if not configured correctly. Initialization should be deferred or handled more gracefully.
    - **Inefficient Polling**: The `usePollingFallback` hook continues to poll every 5 seconds even when the browser tab is in the background, consuming unnecessary resources. It should use the Page Visibility API to pause when the tab is not visible.

---

## 6. Prioritized Improvement Recommendations

### **High Priority (Immediate Action Required)**
1.  **Fix Database Race Condition**: Rewrite the `create_draft_pick_atomic` SQL function to use a `FOR UPDATE` lock, ensuring true atomicity and preventing duplicate pick numbers.
2.  **Secure Supabase Admin Client**: Reconfigure the service role client in `supabase-server.ts` with `persistSession: false` and `autoRefreshToken: false` to prevent security risks.
3.  **Fix Middleware Memory Leak**: Implement a cleanup mechanism (`setInterval`) for the in-memory rate limiter or switch to a production-grade distributed solution.
4.  **Remove Admin Token from URL**: Refactor the application to pass the admin token via a secure cookie or session storage instead of the URL.
5.  **Fix API Route `params` Typing**: Correct the type signature for `params` in all Next.js API route handlers, removing the `Promise<>` wrapper and `await`.
6.  **Add Missing Input Validation**: Implement Zod schema validation for all API inputs, especially for route parameters (UUIDs) and the `user-rankings` endpoint.

### **Medium Priority (Should be addressed this week)**
7.  **Consolidate Middleware & Harden CSP**: Merge the duplicate `middleware.ts` files and tighten the Content Security Policy to remove `'unsafe-eval'` and `'unsafe-inline'`.
8.  **Standardize API Responses**: Ensure all API endpoints return a consistent JSON shape (e.g., `{ data: ... }` or `{ error: ... }`).
9.  **Remove PII from Logs**: Remove all `console.log` statements from client-side code that could expose user data in production.
10. **Prevent App Crash on Startup**: Refactor the Supabase client initialization to be resilient to missing environment variables.

### **Low Priority (Good for next sprint)**
11. **Adopt `next/image`**: Replace all standard `<img>` tags with the `next/image` component for performance.
12. **Add Comprehensive Testing**: Introduce a testing strategy covering unit (utils, hooks), integration (API routes), and E2E (user flows).
13. **Improve Documentation**: Add JSDoc comments to all components, hooks, and API client methods.
14. **Use Framework-Native Error/Loading UI**: Adopt `error.tsx` and `loading.tsx` files for better integration with the Next.js App Router.
