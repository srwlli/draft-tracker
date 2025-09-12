Title: Code Review Prompt - Optimized Version (Run 2)
Description: Structured review generated per prompt_guide.json after Phases 1–5
Version: 1.1
Category: code-review

Code Context: [Language/Framework: TypeScript, Next.js (App Router), React, Supabase] [Project Type: Real-time web app] [Target Environment: Production (Vercel/Edge)]

Section 1 — Code Quality & Readability — Rating: ✅ Good
- Structure: Consolidated middleware to root; admin flow split into viewer vs tokenless admin page. Clear separation across `src/app`, `src/lib`, `src/hooks`, `src/components`.
- Naming/Docs: Helper `admin-token.ts` is clear; consider brief JSDoc for `setAdminToken/getAdminToken/clearAdminToken` and `applyDevRateLimit`. Files: `src/lib/admin-token.ts`, `middleware.ts`.
- Logging: PII logs gated to dev in dashboard/create flows and realtime hooks. Files: `src/app/(auth)/dashboard/page.tsx`, `src/components/create-draft.tsx`, `src/hooks/useRealtimeRankings.ts`.
- Consistency: API response shapes standardized for user rankings; UUID validation added across handlers.

Section 2 — Performance Analysis — Rating: ✅ Good
- Narrowed payload: Public players query now selects only needed columns. File: `src/app/api/public/drafts/[id]/route.ts:18-31`.
- Realtime: Throttle and dedup present; dev logs gated to reduce noise. File: `src/hooks/useRealtimeRankings.ts:47-76, 140-169`.
- Middleware: Dev-only limiter isolated and cleaned; avoids production overhead. File: `middleware.ts`.
- Opportunity: Consider pagination/server-side filtering on very large player sets as scale grows.

Section 3 — Security Audit — Rating: ⚠️ Needs Attention
- Admin token handling: Token moved from URL to client cookie + header (better). Still client-set cookie (non-HttpOnly) is extractable if XSS occurs. Improve by setting token server-side as `HttpOnly; Secure; SameSite=Strict` via an API response on draft creation, and reading only on server to forward as header when needed.
- CSP: Enforced CSP removes `'unsafe-eval'`; Report-Only CSP with nonce added in prod—good. Still allowing `'unsafe-inline'` for scripts/styles in enforced policy. Plan to migrate to full nonce for scripts and remove inline usage. File: `middleware.ts: setSecurityHeaders`.
- Nonce generation in middleware uses `Buffer` which may not exist on Edge runtimes. Replace with Web Crypto base64 (e.g., `btoa(String.fromCharCode(...))`) or `crypto.randomUUID()`-based nonce. File: `middleware.ts: generateNonce`.
- Headers: HSTS/COOP/CORP applied in prod. COEP intentionally disabled—document third-party impacts if enabling later.

Section 4 — Standards Compliance — Rating: ✅ Good
- Next.js params: Updated to awaited Promise-style per runtime; warnings resolved. Files: API route handlers under `src/app/api/.../route.ts`.
- Response envelopes: `apiResponse`/`apiError` used consistently for `user-rankings` routes. Consider extending to all routes over time for uniformity.
- Types: Browser timer types corrected with `ReturnType<typeof setTimeout>`.

Section 5 — Bug Detection — Rating: ⚠️ Needs Attention
- Edge compatibility risk: `middleware.ts` references `Buffer` for nonce; not available in Edge runtime and can error. Replace with Web-safe base64. File: `middleware.ts: generateNonce`.
- Supabase client env crash potential remains: `src/lib/supabase.ts` still throws at import if env vars are missing, which can break SSR. Consider lazy init and user-facing error in dev.
- Admin cookie fallback: Now uses sessionStorage backup—good. Add a small admin-token manual entry UI as safety (new device/no cookie) to reduce dead ends.

Section 6 — Improvement Recommendations
- High
  - Server-set Admin Token Cookie (2–3h): Issue a `Set-Cookie` from the draft creation API with `HttpOnly; Secure; SameSite=Strict; Path=/draft/{id}` and refactor client to stop setting token in JS. Improves resilience to XSS.
  - Middleware Nonce (Edge-safe) (0.5–1h): Replace `Buffer` with Web Crypto base64 and pass nonce to any inline/next scripts if/when enforced.
  - Enforce Nonce CSP (2–4h): Audit/remove inline scripts and migrate to `script-src 'self' 'nonce-...'` enforcement (drop `'unsafe-inline'`). Roll out via `Report-Only` first.
- Medium
  - Supabase client init guard (1–2h): Lazy init or dev-only warning instead of import-time throw in `src/lib/supabase.ts`.
  - Public endpoint DTOs (1–2h): Define explicit DTOs to avoid `as unknown as` casts in realtime hooks; trim unused fields further if possible.
  - CI header test + Axe (2–3h): Add a Playwright header assertion test and a basic Axe a11y check on key pages.
- Low
  - Add JSDoc to helpers (`admin-token.ts`, middleware helpers) (0.5h).
  - Document COOP/COEP risks in README and phase notes (0.5h).

Selected Code Fix Examples
- Edge-safe nonce in middleware:
  // Before
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Buffer.from(bytes).toString('base64');
  // After
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
  const nonce = typeof btoa === 'function' ? btoa(bin) : Buffer.from(bin, 'binary').toString('base64');

- Server-set admin cookie (pseudo):
  // In POST /api/drafts
  const response = apiResponse.success({ ...draft, admin_token: undefined }, 201);
  response.headers.set('Set-Cookie', `dt_admin_${draft.id}=${adminToken}; Path=/; Max-Age=43200; HttpOnly; Secure; SameSite=Strict`);
  return response;

Testing Recommendations
- Headers: Assert CSP/HSTS/Permissions/Referrer/X-Content-Type-Options present on page and API route.
- Admin flow: E2E create → admin navigate → draft/undraft; verify no URL token, header contains x-admin-token.
- Concurrency: Two parallel picks on same player → 201/409; different players → sequential pick numbers.

Estimates (major items)
- Admin cookie server-set: 2–3h
- Nonce (Edge-safe) + enforce plan: 2.5–5h total
- Supabase init guard: 1–2h

