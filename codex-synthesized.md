# Synthesized Code Review — Draft Tracker Application

Sources: claude-review.md, gemini-review.md, codex-review.mf

Code Context: [TypeScript, React, Next.js (App Router), Supabase] [Real‑time web app] [Target: Production]

## Summary of Common Themes (All Three Reviews)
- Solid foundation: clear App Router structure, modular code, and strong TypeScript usage.
- Rate limiting concern: in‑memory Map in `src/middleware.ts` is unsuitable for production and risks memory leaks; replace with distributed limiter or remove.
- Security needs attention: avoid admin token in URLs, unify/harden validation, tighten headers/CSP, improve env handling.
- Documentation and clarity: add JSDoc/comments for public APIs, hooks, and complex components.
- Consistent error handling: standardize API/UI error patterns and response shapes.
- Testing gap: add unit, integration, and e2e tests to increase confidence.

## Code Quality & Readability
- Organization/naming: Good modular layout across `src/app`, `src/lib`, `src/hooks`, `src/components`; consistent naming. Reduce duplication between `middleware.ts` (root) and `src/middleware.ts`.
- Docs: Add concise JSDoc and prop explanations for public APIs (`lib/api-client.ts`) and complex hooks (`useRealtimeRankings`).
- Maintainability: Extract helpers to reduce cognitive load in `api/drafts/[id]/picks` route and in realtime ranking update switch-case.
- Client logging: Remove/gate console logging (avoid PII like emails) with `NODE_ENV` checks.

## Performance Analysis
- Efficient fetching: Parallel queries in public draft endpoint are good. Narrow player/teams select list to required columns to reduce payload.
- Realtime updates: 100ms throttle is reasonable; add memoization for derived lists/sorts; avoid noisy logs in production.
- Rate limiter: In‑memory Map will leak under load and is ineffective in serverless/multi‑instance environments. Prefer a distributed limiter or platform feature; if retained for dev, add cleanup.
- Client workload: Large client‑side filtering/sorting may bottleneck on very large datasets; consider pagination/server filtering when needed.

## Security Audit
- Admin access: Do not place `admin_token` in URLs; use header or secure, short‑lived cookie. Unify validation path and rely on server/API checks (`timingSafeEqual`).
- Headers/CSP: Tighten CSP (avoid `'unsafe-inline'`/`'unsafe-eval'` where possible), remove deprecated `X‑XSS‑Protection`, keep other headers.
- Supabase admin client: Configure service‑role client without cookie/session persistence; avoid passing/reading cookies for admin client.
- Validation: Add UUID validation for route params; extend Zod schemas to `user-rankings` POST/PUT. Consider CSRF protections for state‑changing actions.
- Env handling: Avoid import‑time crashes in `lib/supabase.ts` when env vars are missing; fail gracefully and surface a clear UI error in dev.

## Standards & Conventions
- Next.js handlers: Correct `params` typing (object, not Promise) and remove unnecessary `await`. Standardize API responses (prefer `{ data }` + structured errors via `apiResponse`).
- Next.js UX: Consider `error.tsx`/`loading.tsx` where helpful.
- TypeScript ergonomics: Use `ReturnType<typeof setTimeout>` in browser code; reduce `as unknown as` by mapping to DTOs.

## Bugs & Edge Cases
- Rate limiter memory leak and non‑determinism across instances.
- Concurrency: Fallback pick‑number logic can race; implement/verify atomic SQL function with row‑level lock to assign `pick_number` safely and prevent duplicates.
- Realtime dedup: Time‑window dedup may miss slow updates; use a more robust keying or server timestamps with a small cache.
- Polling fallback: Pause polling when tab is hidden (Page Visibility API).

## Prioritized Recommendations
- High (now)
  - Replace/remove in‑memory rate limiter; if kept for dev, add cleanup and instance caps.
  - Move admin token out of URL; rely on header/cookie and server validation; remove plaintext compare from middleware.
  - Fix route handler params typing; standardize API responses; add UUID validation for route params.
  - Implement/verify atomic draft pick SQL with locking; remove redundant duplicate pre‑check.
  - Tighten CSP and remove deprecated headers.
- Medium (this week)
  - Add Zod validation to `user-rankings` POST/PUT; unify structured error handling/logging.
  - Memoize/simplify realtime hook; narrow DB selects; gate/remove client logs containing PII.
  - TS ergonomics: `ReturnType<typeof setTimeout>`, reduce casting.
- Low (next sprint)
  - Add JSDoc/comments to public APIs/hooks/components.
  - Add Next.js `error.tsx`/`loading.tsx`; consider `next/image` and bundle analysis.

## Testing Plan
- Unit: `lib/api-responses.ts`, utility helpers.
- Integration: API routes (`drafts`, `user-rankings`, `picks`) with auth/validation and error paths; response shape consistency.
- E2E: Create draft → admin access (token via header/cookie) → draft/undraft flow; verify security headers/CSP on pages.
- Realtime: Simulate ranking updates to validate throttling/dedup and subscription lifecycle.

