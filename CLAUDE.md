# dog-shelter-website Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-10-17

## Active Technologies

- TypeScript (strict mode) with Astro 5.x, React 18.x islands, Tailwind CSS 4.x,
  shadcn/ui, Decap CMS (git-gateway via Netlify Identity), framer-motion,
  deployed on Cloudflare Pages (`@astrojs/cloudflare` adapter, Sharp image service)

## Project Structure

This is a single flat Astro app — not a backend/frontend split:

```text
src/
  components/   # Astro + React (islands) components
  content/      # dogs/blog/testimonials Markdown collections (CMS-managed)
  hooks/        # shared React hooks (e.g. useFormSubmit)
  layouts/      # main.astro page shell
  lib/          # small framework-agnostic helpers
  pages/        # Astro routes, incl. pages/api/* server endpoints
  utils/        # form/data validation
  content.config.ts  # Zod schemas for content collections
public/
  admin/        # Decap CMS admin UI + config.yml (source of truth)
  config.yml    # generated copy, not committed — see cms:config script
tests/
  e2e/          # Playwright
```

Unit/component tests (Vitest) live next to the code they cover
(`*.test.ts(x)`), not under `tests/`.

## Commands

pnpm run dev; pnpm run build; pnpm run lint; pnpm run typecheck; pnpm test; pnpm run test:e2e

## Code Style

TypeScript (strict mode) with Astro 5.x: follow standard conventions.

## Recent Changes

- Fixed dog detail pages rendering raw Markdown instead of compiled HTML
- Wired up Netlify Identity for the Decap CMS git-gateway backend
- Hardened /api/newsletter input validation and added basic rate limiting

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
