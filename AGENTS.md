# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router (routes, layouts, and `api/**/route.ts`).
- `src/components` (+ `ui/`): Reusable React components (PascalCase files).
- `src/lib`, `src/hooks`, `src/contexts`, `src/types`: Shared logic, hooks, context, and TypeScript types.
- `public`: Static assets. `middleware.ts`: security and routing middleware.
- `supabase/`: Supabase config; SQL helpers at repo root (`01_*.sql`, etc.).
- `.env.local`: Local config (copy from `.env.example`). Never commit secrets.

## Build, Test, and Development Commands
- `npm run dev` — Start Next.js dev server (Turbopack).
- `npm run build` — Production build.
- `npm run start` — Start production server.
- `npm run lint` — ESLint checks using `next/core-web-vitals` + TypeScript.

## Coding Style & Naming Conventions
- TypeScript + React 19 functional components.
- Naming: Components `PascalCase.tsx`, hooks `useThing.ts`, utils `camelCase.ts`.
- Co-locate component styles/assets when practical; place shared helpers in `src/lib`.
- Follow ESLint guidance; prefer named exports for reuse.

## Testing Guidelines
- Tests are not yet configured. When adding tests, prefer Vitest + React Testing Library.
- Name tests `*.test.ts`/`*.test.tsx`; co-locate near source or under `src/**/__tests__`.
- Aim for high-value integration tests on critical flows (draft sync, auth, API).

## Commit & Pull Request Guidelines
- Commits: short, imperative, and scoped (e.g., "draft: fix pick ordering").
- PRs: include a summary, reasoning, screenshots for UI, and linked issues.
- Keep PRs focused; run `npm run lint` locally; note any breaking changes or migrations.

## Security & Configuration Tips
- Keep Supabase service-role keys server-side only; never expose in client code.
- Use `.env.local` for secrets; rotate if leaked. Validate inputs on API routes.
- Maintain CSP/rate limiting in `middleware.ts` when adding routes or auth flows.

## Agent-Specific Instructions
- Keep diffs minimal and focused; avoid unrelated formatting churn.
- Place new modules in the directories above; update README when behavior changes.
- If adopting Spec-Driven Development, create `specs/NNN-feature/` and branch `NNN-key-words` per feature.
