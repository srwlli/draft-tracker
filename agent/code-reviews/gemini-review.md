# Gemini Code Review (Updated)

**Code Context**: [Language/Framework: TypeScript/Next.js] [Project Type: Web Application] [Target Environment: Production]

This review reflects the codebase after recent changes, including the removal of admin tokens from URLs and the addition of input validation.

---

## 1. Code Quality & Readability

- **Rating**: ✅ **Good**
- **Summary**: The code quality is high. Recent changes have improved type safety and removed unsafe logging.
- **Findings**:
    - **(Improved)** PII in logs has been addressed by wrapping `console.log` statements in `NODE_ENV` checks (e.g., `create-draft.tsx`).
    - **(Improved)** Typing has been improved in hooks like `useRealtimeRankings.ts` by correctly using `ReturnType<typeof setTimeout>`.
    - **Structure**: The new `lib/admin-token.ts` provides a clear, centralized utility for handling the client-side admin token, which is excellent.

---

## 2. Performance Analysis

- **Rating**: ⚠️ **Needs Attention**
- **Summary**: The API performance is good due to specific optimizations, but the middleware rate-limiter remains a production concern.
- **Findings**:
    - **(Improved)** The public draft endpoint (`/api/public/drafts/[id]/route.ts`) no longer uses `SELECT *`, and now only fetches the specific columns required by the UI. This is a great performance and security improvement.
    - **(Issue)** The in-memory rate limiter in `middleware.ts` is still not production-safe and will cause memory leaks and inconsistent behavior in a serverless environment.

---

## 3. Security Audit

- **Rating**: ✅ **Good**
- **Summary**: The security posture has been dramatically improved by removing admin tokens from URLs and adding input validation.
- **Findings**:
    - **(Fixed)** The most critical vulnerability, the admin token in the URL, has been resolved. The new system using a short-lived cookie/sessionStorage (`lib/admin-token.ts`) and passing the token in the `x-admin-token` header is the correct approach.
    - **(Fixed)** API routes now correctly validate UUIDs in path parameters using Zod, preventing a class of potential injection and validation bypass issues.
    - **(Issue)** The Supabase admin client in `lib/supabase-server.ts` may still be configured insecurely (forwarding cookies by default). It should be explicitly configured to be stateless.
    - **(Issue)** The Content Security Policy (CSP) in `middleware.ts` is still likely too permissive for production.

---

## 4. Standards Compliance

- **Rating**: ⚠️ **Needs Attention**
- **Summary**: While response shapes are now consistent, a key Next.js convention is still being violated in API route handlers.
- **Findings**:
    - **(Improved)** The `user-rankings` API routes have been refactored to use the standardized `apiResponse` helpers, making the API contract consistent and predictable.
    - **(Issue)** API route handlers still incorrectly type the `params` object as a `Promise` (e.g., `{ params: Promise<{ id: string }> }`) and `await` it. In the Next.js App Router, this is a plain object and should be typed as `{ params: { id: string } }`.

---

## 5. Bug Detection

- **Rating**: ❌ **Critical Issue**
- **Summary**: While many bugs have been fixed, the critical race condition in the database for creating draft picks likely still exists.
- **Findings**:
    - **(Critical Issue)** The `create_draft_pick_atomic` SQL function has not been updated to use row-level locking (`FOR UPDATE`). This means the core race condition, where two users could draft at the exact same time and receive the same pick number, still exists.
    - **(Issue)** The Supabase client initialization in `lib/supabase.ts` will still crash the application on build or startup if the public environment variables are missing.

---

## 6. Improvement Recommendations

- **Summary**: The highest priority is now fixing the database race condition and the incorrect API route typings.
- **High Priority**:
    1.  **Fix Database Race Condition**: Update the `create_draft_pick_atomic` SQL function to use `FOR UPDATE` to ensure true atomicity.
    2.  **Fix Route Handler `params` Typing**: Correct the type signature for `params` in all API route handlers to remove the `Promise<>` wrapper.
    3.  **Fix Middleware Rate Limiter**: Replace the in-memory rate limiter with a production-safe solution or, at a minimum, add a cleanup mechanism to prevent memory leaks in development.
- **Medium Priority**:
    1.  **Harden Supabase Admin Client**: Ensure the Supabase admin client is configured to be stateless and does not persist sessions or forward cookies.
    2.  **Tighten CSP**: Review and tighten the Content Security Policy in `middleware.ts`.
    3.  **Improve `user-rankings` Validation**: Add Zod schema validation to the `POST` and `PUT` bodies for the `user-rankings` API route.
