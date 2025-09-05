Testing scaffold (Vitest + Playwright) with a few “golden path” E2E specs (create draft → make picks → real-time sync).

React error boundary at app root + draft page boundary.

Zod schemas → OpenAPI generation for REST routes (or co-locate route zod + typed client).

CI (GitHub Actions): lint, typecheck, unit, integration, E2E, preview deploy.

Basic RUM (Vercel Analytics or minimal web-vitals capture) + error tracking.

A11y lint + Axe CI check on critical pages.

Bundle guardrails: analyze, fail CI on >X kB increases.

Route-level code-splitting for admin vs viewer surfaces.

SEO pass: title/description, canonical, structured data for public draft pages.

Analytics events: draft_created, pick_made, pick_undone, connection_state_changed.