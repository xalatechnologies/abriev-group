# ABRIEV

A curated automotive marketplace — built with Next.js 15, React 19, Tailwind, Framer Motion, and React Three Fiber.

## Status

**Phase 1 — Foundations** (complete):

- Design token system surfaced as CSS variables and Tailwind theme
- Editorial typography (Manrope only) via `next/font`
- Global layout: translucent sticky header + 6-column footer
- Primitive components: `Container`, `SurfaceCard`, `GlassPanel`, `EditorialHeading`, `SectionIntro`, `Divider`, `Badge`, `Chip`, `IconButton`, `CTAButton`
- Placeholder homepage with hero + search-bar stub
- Every route in the IA scaffolded and compiling

## Scripts

```bash
pnpm install
pnpm clean      # rm -rf .next (fixes stale webpack chunks locally)
pnpm dev        # dev server
pnpm dev:clean  # clean then dev
pnpm build      # production build
pnpm start      # run prod build
pnpm lint       # lint
pnpm typecheck  # tsc --noEmit
```

## Deploying on Vercel

- **Framework preset:** Next.js (App Router).
- **Install:** `pnpm install` (enable corepack locally: `corepack enable`; Vercel can use **Install Command:** `pnpm install`).
- **Build:** `pnpm build` (default **`next build`** is fine).
- **Output:** Next default — no custom `output` in `next.config.ts`.
- **Environment variables:** copy from [`.env.example`](./.env.example). Set `AUTH_PUBLIC_ORIGIN` to your production URL (for example `https://<project>.vercel.app` or your custom domain) when using OAuth redirects.

## Structure

```
src/
  app/                         # App Router + route groups
    (marketing)/               # Home, about, services, dealers, insights, contact, legal
    (catalog)/                 # Vehicles listing + detail
    (auth)/                    # Login/register
    (dashboard)/               # User dashboard
    (flows)/                   # Listing + booking flows
    globals.css                # Design tokens + utility layer
    layout.tsx                 # Root layout w/ fonts + metadata
  components/
    ui/                        # Primitives
    layout/                    # SiteHeader, SiteFooter
    marketing/                 # Homepage building blocks
  features/                    # Feature modules (Phase 2+)
  lib/
    constants/                 # Site + nav constants
    data/                      # Mock fixtures (Phase 2+ populates)
    utils/                     # cn, helpers
  server/
    queries/                   # Repository layer — swap to Supabase/Prisma later
  types/                       # Domain types
```

## Design tokens

All color, typography, spacing, radius, and effect tokens live in [`src/app/globals.css`](src/app/globals.css) as CSS custom properties and are surfaced through Tailwind semantic classes (`bg-background`, `text-on-surface-variant`, `bg-surface-container-high`, `rounded-full`, `shadow-editorial`, …).

Never use raw hex values in components. Always reference the semantic class.

## Roadmap

- **Phase 2:** 3D hero, full `/vehicles` grid + filters, `/vehicles/[slug]` with model viewer.
- **Phase 3:** Dealers, Services, Insights, About, Contact, FAQs.
- **Phase 4:** Auth, Dashboard, Listing submission, Booking flow.
- **Phase 5:** Responsive + a11y pass, motion polish, SEO (sitemap/robots/OG), perf audit.

## Backend

Phase 1 uses typed mock fixtures in `src/lib/data` consumed via `src/server/queries`. UI never imports fixtures directly — it always goes through the queries layer, which is the swap point for Supabase or Prisma + Postgres.
