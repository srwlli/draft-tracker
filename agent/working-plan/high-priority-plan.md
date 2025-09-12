# High-Priority Working Plan — Admin Cookie, CSP Nonce, Supabase Admin Client

Scope
- Address three high-priority items from codex-synthesized-review.md:
  1) Server-set HttpOnly admin cookie and API validation via cookie
  2) Edge-safe nonce generation + CSP enforcement path
  3) Supabase admin client statelessness (no cookie persistence/forwarding)

Outcomes
- Admin token never exposed to JS or URLs; privileged API routes validate via HttpOnly cookie.
- CSP strengthened with a safe, Edge-compatible nonce and a measured path to enforcement.
- Admin (service-role) Supabase client operates statelessly and does not touch user cookies.

Plan

1) Server-Set Admin Cookie (HttpOnly)
- Tasks
  - Update `POST /api/drafts` to set `Set-Cookie: dt_admin_{draftId}={token}; Path=/; Max-Age=43200; HttpOnly; Secure; SameSite=Strict` and stop returning `admin_token` in the JSON body (or gate it to dev only).
  - Update admin-only API routes to validate via HttpOnly cookie instead of `x-admin-token` header:
    - `POST /api/drafts/[id]/picks`
    - `DELETE /api/drafts/[id]/picks/[pickId]`
    - Read cookie `dt_admin_{id}` from `request.cookies` and validate with `validateAdminToken`.
  - Update client `api.admin` methods and admin page to stop passing `adminToken` from the browser.
  - Keep temporary header support (read header OR cookie) during the transition; remove header once verified.
- Files
  - `src/app/api/drafts/route.ts` (set cookie on create)
  - `src/app/api/drafts/[id]/picks/route.ts`, `src/app/api/drafts/[id]/picks/[pickId]/route.ts` (cookie-based validation)
  - `src/lib/api-client.ts` (remove adminToken param from `admin.*` methods)
  - `src/app/draft/[draftId]/admin/page.tsx` (stop reading/forwarding token)
  - Docs: brief note in `README.md`
- Acceptance
  - Creating a draft sets the HttpOnly cookie and no token appears in JSON or URL.
  - Admin actions succeed with only the cookie present; removing cookie yields 403/401.
  - Client code compiles and no longer references `adminToken`.
- Test
  - E2E: create → admin → draft/undraft; verify no `admin_token` in JSON and no token in URL.
  - Negative: clear cookie → admin action returns 401/403.

2) Edge-Safe Nonce + CSP Migration
- Tasks
  - Replace `Buffer` in `middleware.ts` nonce generation with a Web-safe base64 implementation (Web Crypto + `btoa` fallback).
  - Keep `Content-Security-Policy-Report-Only` enabled in production; log/report violations (optional: add `/api/csp-violations`).
  - Document a follow-up to remove `'unsafe-inline'` for `script-src` and move to strict nonce enforcement once reports are clean.
- Files
  - `middleware.ts`
  - (Optional) `src/app/api/csp-violations/route.ts`
- Acceptance
  - Headers include an Edge-safe nonce in Report-Only CSP.
  - No Edge runtime errors from `Buffer`.
- Test
  - curl/DevTools: verify `Content-Security-Policy-Report-Only` in prod/staging; confirm no runtime errors.

3) Supabase Admin Client Statelessness
- Tasks
  - Update `createServerSupabaseAdminClient` to operate statelessly:
    - Provide no-op cookie adapter (don’t read or write user cookies).
    - Ensure it uses `SUPABASE_SERVICE_ROLE_KEY` and does not persist sessions.
  - Document RLS expectations and that service-role bypasses RLS for admin operations.
- Files
  - `src/lib/supabase-server.ts`
  - Docs: short note in `README.md`
- Acceptance
  - Admin operations do not rely on user cookies; no auth state mutation via admin client.
- Test
  - Integration: admin endpoints continue to work; inspect logs to confirm no cookie access from admin client path.

Timeline (Estimate ~5–8 hours)
- Cookie + API validation shift: 3–4h
- Edge-safe nonce replacement + docs: 1–2h
- Supabase admin client hardening + docs: 1–2h

Risk & Rollback
- Roll out cookie validation in parallel with header validation; remove header support only after verification.
- Keep CSP changes Report-Only until clean, then consider enforcing nonce CSP in a separate change.

CI/Verification Hooks (optional follow-up)
- Add a Playwright test to assert security headers on a page and an API route.
- Add a basic `/api/csp-violations` endpoint to receive reports in staging.
