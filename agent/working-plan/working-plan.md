# Working Plan — High Priority Fixes

Synthesized from codex-synthesized.md (Claude, Gemini, Codex).

## Scope
Focus on production blockers and high-impact fixes: rate limiting, admin access security, API correctness, atomic draft picks, and security headers.

## Owner/Roles
- Lead: Core maintainer
- Reviewer: Security-minded reviewer
- QA: Self-check + manual verification

## Checklist (High Priority)

1) Rate Limiting: Replace/remove in-memory limiter
- [ ] Remove `src/middleware.ts` (in-memory Map limiter is not production-safe)
- [ ] Decide limiter approach for prod (e.g., Upstash, platform edge solution) and document
- [ ] If keeping a dev-only limiter, add cleanup to evict expired entries each window
- [ ] Ensure only root `middleware.ts` remains authoritative

Acceptance:
- [ ] No duplicate middleware; no memory growth under load; consistent behavior across instances

2) Admin Token Handling: Remove from URL; centralize validation
- [ ] Change navigation after draft creation to avoid embedding `admin_token` in URL (update `src/components/create-draft.tsx`)
- [ ] Choose mechanism to store token for admin UI: secure, short-lived cookie preferred (alt: sessionStorage for client-only)
- [ ] Update admin UI to read token from chosen mechanism and send `x-admin-token` header for actions
- [ ] Remove plaintext token comparison in root `middleware.ts`; rely on server/API validation (`validateAdminToken`)

Acceptance:
- [ ] Admin routes function without token in URL; invalid/missing token blocks actions; no PII/token in browser history/referrers

3) Next.js Route Handlers: Fix params typing and standardize responses
- [ ] Update handlers to use `{ params: { id: string } }` (no Promise/await) in:
  - [ ] `src/app/api/public/drafts/[id]/route.ts`
  - [ ] `src/app/api/drafts/[id]/route.ts`
  - [ ] `src/app/api/drafts/[id]/picks/route.ts`
  - [ ] `src/app/api/drafts/[id]/picks/[pickId]/route.ts`
- [ ] Add UUID validation for `id` (and `pickId` where applicable) via Zod
- [ ] Standardize `user-rankings` GET/POST/PUT to use `apiResponse.success/error`

Acceptance:
- [ ] All handlers compile with corrected typings; invalid UUIDs return 400; responses consistently wrap `{ data }` or structured error

4) Atomic Draft Picks: Concurrency-safe creation
- [ ] Implement or verify `create_draft_pick_atomic` SQL with row-level lock and unique pick numbering
- [ ] Remove redundant pre-insert duplicate check in route handler; handle duplicate via function error mapping
- [ ] Keep DELETE pick endpoint consistent and validated

Acceptance:
- [ ] Concurrent draft tests produce sequential unique `pick_number` values; duplicates are rejected with 409/conflict

5) Security Headers/CSP
- [ ] Tighten CSP in root `middleware.ts` (remove `'unsafe-eval'`, minimize `'unsafe-inline'`, add `frame-ancestors 'none'`)
- [ ] Remove deprecated `X-XSS-Protection` header
- [ ] Keep/refine `Permissions-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options`

Acceptance:
- [ ] Headers present on representative routes; no regressions in app rendering; CSP audited for needed sources only

## Nice-to-haves (adjacent, small)
- [ ] Narrow columns in public players query to needed fields
- [ ] Gate/remove client console logs; avoid PII
- [ ] Use `ReturnType<typeof setTimeout>` in browser code

## Test Plan (High Priority Only)
- [ ] E2E: Create draft → admin view (token via cookie/header) → draft/undraft; validate authorization behavior
- [ ] Integration: API routes return standardized shapes; invalid UUIDs → 400; unauthorized → 401/403; conflicts → 409
- [ ] Manual: Confirm CSP/headers on page responses; no token in URL or referrer

## Timeline (Estimate ~8–12 hours)
1) Rate limiting cleanup: 1–2h
2) Admin token removal and wiring: 3–4h
3) Route handler typing + UUID validation + response standardization: 2–3h
4) Atomic pick verification and handler cleanup: 2–3h
5) CSP tightening: 1h

