Title: Code Review Prompt - Optimized Version
Description: Comprehensive review following prompt_guide.json framework
Version: 1.0
Category: code-review

Code Context: [Language/Framework: TypeScript, Next.js (App Router), React, Supabase] [Project Type: Real-time web app] [Target Environment: Production (Vercel/Edge)]

Section 1 — Code Quality & Readability — Rating: ⚠️ Needs Attention
- Naming and structure: Overall consistent and modular separation across `src/lib`, `src/hooks`, `src/components`, and `src/app`. However, having both root `middleware.ts` and `src/middleware.ts` is confusing and risks divergence. Next.js recognizes the root-level middleware; consolidate into a single file. Files: `middleware.ts`, `src/middleware.ts`.
- Comments and documentation: Helpful inline comments in API routes and components. Consider adding brief JSDoc to `DraftTrackerAPI` methods for arguments/returns and to clarify the response shape normalization in `src/lib/api-client.ts`.
- Console logging in client/UI code: Production console logging appears in multiple places and may leak PII (e.g., user email). Example: `src/components/create-draft.tsx:53-57`, `src/hooks/useRealtimeRankings.ts:51,63,110,113,116,119,151`. Gate logs by `NODE_ENV` or remove for production.
- Type safety improvements: Prefer `ReturnType<typeof setTimeout>` over `NodeJS.Timeout` in browser code to avoid cross-env typing issues. Example: `src/hooks/useRealtimeRankings.ts:19`.

Code snippet — safer timeout typing:
  // Before
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  // After
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

Section 2 — Performance Analysis — Rating: ✅ Good
- Parallelized data fetching: Public draft fetch performs three queries in parallel; good. File: `src/app/api/public/drafts/[id]/route.ts:14-30`.
- Over-fetching risk: Players query selects `*` plus team join; if the client only needs a subset, reduce columns to minimize payload. File: `src/app/api/public/drafts/[id]/route.ts:18-29`.
- Realtime event handling: Throttling at 100ms is sensible; avoid frequent console logs to reduce main-thread overhead in production. File: `src/hooks/useRealtimeRankings.ts:63`.
- In-memory rate limiting: The `src/middleware.ts` in-memory Map won’t work reliably across serverless instances and can leak memory under sustained traffic. Prefer a distributed limiter (e.g., Upstash, Vercel Edge Config + durable counter) if rate limiting is required.

Code snippet — narrow columns for performance:
  const playersResult = await supabase
    .from('players')
    .select(`id, first_name, last_name, position, default_rank,
             teams!players_team_id_fkey (id, team_name, abbreviation)`) // minimal set
    .order('position')
    .order('default_rank');

Section 3 — Security Audit — Rating: ⚠️ Needs Attention
- CSP policy: Current policy allows `'unsafe-eval'` and `'unsafe-inline'` which weakens XSS defenses. Tighten where possible, and consider nonces/hashes for any inline code. File: `middleware.ts:15-17`.
- Legacy header: `X-XSS-Protection` is deprecated and ignored by modern browsers; harmless but provides no benefit. File: `middleware.ts:13`.
- Admin token validation consistency: Root middleware compares plaintext token (`middleware.ts:71-73`) while API routes use `validateAdminToken` with `timingSafeEqual` (`src/lib/api-auth.ts`). Prefer a single, hardened path: rely on API-side validation and remove the plaintext compare in middleware or switch middleware to reuse `validateAdminToken` if truly needed at edge.
- Logging PII: Avoid logging emails/IDs in client-side console. File: `src/components/create-draft.tsx:53-57`.
- Environment variable exposure: `src/lib/supabase.ts` throws during import if public envs are missing (lines 8-9). This may break SSR or local previews. Prefer a runtime guard that only throws on the client when accessed, or fail gracefully with a descriptive UI error.
- Input validation: `user-rankings` POST/PUT rely on basic checks. Use Zod schemas similar to drafts API to validate types and ranges. File: `src/app/api/user-rankings/route.ts:47-51,91-99`.

Code snippet — stricter CSP (example baseline):
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; frame-ancestors 'none'; script-src 'self'; " +
    "style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; " +
    "font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co;"
  );

Code snippet — unify admin token validation in middleware:
  // Prefer delegating to API routes; if kept:
  import { validateAdminToken } from '@/lib/api-auth';
  const valid = await validateAdminToken(draftId, adminToken);
  if (!isOwner || !valid) return NextResponse.redirect(new URL(`/draft/${draftId}`, request.url));

Section 4 — Standards Compliance — Rating: ⚠️ Needs Attention
- Next.js route handler params: Handlers type `params` as a Promise and `await` it. In Next.js App Router, `params` is a plain object. Adjust typing and remove `await`. Files: 
  - `src/app/api/public/drafts/[id]/route.ts:5-10`
  - `src/app/api/drafts/[id]/route.ts:6-11`
  - `src/app/api/drafts/[id]/picks/route.ts:5-12`
  - `src/app/api/drafts/[id]/picks/[pickId]/route.ts:5-12`
- API response shape: Some endpoints return raw arrays (`user-rankings`) while others use the `{ data }` wrapper (`apiResponse`). Standardize responses for consistency and easier client handling. File: `src/app/api/user-rankings/route.ts:31,72,119`.
- Middleware duplication: Keep only root `middleware.ts` per Next.js convention; remove or merge `src/middleware.ts` if rate limiting is required.

Code snippet — correct handler params typing:
  // Before
  export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  }
  // After
  export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  }

Section 5 — Bug Detection — Rating: ⚠️ Needs Attention
- Import-time crash risk: `src/lib/supabase.ts` throws on missing env vars at import (`lines 8-9`). If a page or hook imports `supabase` in environments missing envs, the app crashes before rendering. Mitigate by lazy-initializing or gating on `typeof window !== 'undefined'` and showing a user-facing error when misconfigured.
- Dead or misleading code: `src/middleware.ts` is likely not applied by Next.js; only the root `middleware.ts` runs. This can lead to a false sense of rate limiting.
- Security check duplication: Admin token and ownership checks appear in both middleware and API, risking divergence. Prefer server/API checks as the source of truth.

Code snippet — safe Supabase client init:
  export const supabase = (() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Missing Supabase env vars');
      }
      // Optionally return a stub or throw only when actually used
    }
    return createBrowserClient(url as string, key as string, { realtime: { params: { eventsPerSecond: 10 }}});
  })();

Section 6 — Improvement Recommendations
- High: Consolidate middleware and harden CSP (4–6 hours)
  - Merge `src/middleware.ts` logic as needed into root `middleware.ts` or remove the src file. Replace plaintext admin token compare with `validateAdminToken` or rely solely on API checks. Tighten CSP by removing `'unsafe-eval'`/`'unsafe-inline'` where possible, or introduce nonces.
- High: Fix route handler param typing and standardize API responses (2–3 hours)
  - Update all App Router handlers to use `{ params: { id: string } }` and remove `await`. Adopt `apiResponse.success/error` consistently in `user-rankings` routes for uniformity.
- Medium: Add schema validation to `user-rankings` (POST/PUT) (1–2 hours)
  - Use Zod to validate `player_id`, `custom_rank`, `position` similar to `createDraftSchema`.
- Medium: Reduce logging and protect PII (1 hour)
  - Wrap console logs with `if (process.env.NODE_ENV === 'development')` or remove; avoid logging user identifiers in client.
- Medium: Narrow DB selects in public draft endpoint (1 hour)
  - Select only required columns for players/teams to reduce payload and strengthen privacy.
- Low: Minor TS ergonomics (30–45 minutes)
  - Use `ReturnType<typeof setTimeout>`; reduce `as unknown as` casts by mapping payloads to typed DTOs.

Testing Recommendations
- Add API route tests (integration) for `user-rankings` and draft pick routes to verify correct status codes, validation failures, and response shapes.
- Add security header middleware test to assert CSP and other headers on representative pages.
- Add a small e2e flow (Playwright) covering draft creation -> admin page navigation guarded by token.

Selected Code Fix Examples
- Zod validation for user-rankings POST:
  import { z } from 'zod';
  const rankingSchema = z.object({
    player_id: z.number().int().positive(),
    custom_rank: z.number().int().positive(),
    position: z.string().min(1),
  });
  const body = await request.json();
  const parsed = rankingSchema.safeParse(body);
  if (!parsed.success) return apiResponse.error(parsed.error.issues[0].message, 400);

- Standardize GET user-rankings response shape:
  const { data, error } = await query.order('custom_rank');
  if (error) return apiError.serverError();
  return apiResponse.success(data);

- Remove Promise typing from params in route handlers:
  export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    // ...
  }

Estimated Implementation Time
- Total: ~8–12 hours across security, API consistency, and cleanup.

Recognition of Good Practices
- Clear separation of concerns in APIs, hooks, and UI components.
- Parallelized DB queries and non-blocking real-time updates with throttling.
- Use of `timingSafeEqual` for admin token verification in server utilities is a solid security choice.

