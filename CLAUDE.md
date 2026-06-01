# Santa Barbara Pilates — marketing site

> **Location update — 2026-05-31.** Both this project and the sibling
> Pilates Management App have been **moved out of iCloud Drive** to plain
> local storage. New canonical paths:
>
> - Marketing: `~/Code/CLAUDE CODE 2026/Santa Barbara Pilates/`
> - Portal: `~/Code/CLAUDE CODE 2026/Pilates Management App/`
>
> The old iCloud paths under `~/Library/Mobile Documents/com~apple~CloudDocs/`
> are obsolete and should not be edited. They'll be trashed after a few
> days of verification. **If you're reading this from the iCloud path,
> stop and reopen at `~/Code/...` — your edits there will be discarded.**
> Relative paths between the two projects (e.g. `../Pilates Management App/`)
> still resolve correctly because they were moved together as siblings.

## What this is

The public marketing site for Santa Barbara Pilates. **Live in production**
at the Netlify URL below. Domain cutover from Squarespace to Netlify is
pending Sara's approval. The separate portal app (sbp-portal-v1.html) is a
related but distinct project — see "Sibling project" below.

## Stack

- Next.js 15 App Router · React 19 · TypeScript · Tailwind v4
- Supabase (Postgres + Auth + Storage) — same project as the portal
- Resend (transactional email for lead notifications, optional)
- MDX via `next-mdx-remote/rsc` for /method, /sara, /journal long-form copy
- Deployed: Netlify (auto-deploys from GitHub `main`)
- GitHub Desktop is the working git client (user has never used CLI git)

## Key IDs and URLs

- **Supabase project**: `zcyqhmsggjlqlhoygyll`
  (`https://zcyqhmsggjlqlhoygyll.supabase.co`)
- **GitHub repo**: `github.com/craigdonen4/santa-barbara-pilates` (private)
- **Netlify live URL**: `https://astounding-otter-2f0b57.netlify.app`
- **Target production domain**: `santabarbarapilates.com`
  (currently Squarespace until DNS cutover)
- **Portal app domain (sibling)**: `sbpilatesmanagmentpro.netlify.app`

## Brand tokens (locked — do not introduce off-palette colors)

Defined in `app/globals.css` under `@theme`. Available as Tailwind utilities.

- `--color-bg` #F5F0E8 — page bg
- `--color-surface` #FDFAF5 — section bg
- `--color-surface-2` #EDE6D6 — warmer surface
- `--color-border` #E2DDD6
- `--color-text` #2C2A25 — body text + H2s
- `--color-text-2` #5C5850 — subdued
- `--color-text-3` #9A9488 — caption
- `--color-accent` #C4956A · `-dark` #9A6B42 · `-light` #F0E5D2 (clay)
- `--color-sage` #7A8C72 · `--color-sage-light` #E8EDE5
- `--color-teal` #0E5C6A — H1 headings, sampled from the peacock logo

Fonts: `--font-display` Cormorant Garamond (400/500/600/700), `--font-sans` Inter.

## Editorial voice

Editorial / calm / restrained. Architectural Digest meets a small luxury hotel.
Not "fitness studio." Short confident sentences. **No emojis. No exclamation
marks in body copy.** Sara's voice is direct and confident — not loud, not
quiet. Brand position is "Contemporary Pilates, taught with care," not
classical.

## Database schema (relevant tables)

The Supabase project has 27 tables shared with the portal. The marketing site
uses three:

- **`staff`** — instructors. Marketing reads only where `is_public = true`.
  - Columns the site uses: `first_name`, `last_name`, `slug`, `role`,
    `website_bio`, `photo_url`, `specialties[]`, `is_public`
- **`class_types`** — session catalog. Marketing reads only where
  `is_public = true`, ordered by `sort_order`.
  - Marketing-specific columns: `price_cents`, `is_public`, `sort_order`,
    `session_type` (private | duet | small_group)
- **`leads`** — contact form submissions. Marketing INSERTs only.
  - Marketing sets `source = 'website'` so Sara can filter.

RLS is enabled on those three tables. The other 24 tables have RLS disabled —
see `TODO_security.md`.

## What's done

- All 10 routes built and live: `/`, `/method`, `/sara`, `/instructors`,
  `/instructors/[slug]`, `/pricing`, `/visit`, `/journal`, `/journal/[slug]`,
  `/not-found`
- Migration `001_marketing_site.sql` applied to live Supabase project
- Sara's real row in `staff` has marketing fields filled. Margaret + Iris are
  placeholder rows with `is_public = false` (suppressed until real team
  exists). Instructors link is hidden from nav + footer (commented out).
- Photos placed: hero video, /method, /pricing, /visit, /sara composite, nav
  logo, home Visit teaser
- Lead form → Supabase → optional Resend notification — verified end-to-end
- Google Maps embed on /visit (keyless `?q=&output=embed`)

## What's deferred

See `TODO_security.md` at repo root. Summary:
1. Full RLS rollout on the other 24 tables
2. Portal auth migration from `index187.html` to `sbp-portal-v1.html`
3. Stripe `stripe-handler` edge function: webhook signature verification +
   flip `verify_jwt: true` for non-webhook paths
4. Decide whether to deploy or delete the missing `smart-service` edge
   function (referenced by portal but not deployed)
5. Replace hardcoded `APP_URL` in `stripe-handler` with env var before any
   DNS cutover affecting portal

**None of these block the marketing site launch.** All block the portal
going public.

## Sibling project — Pilates Management App / Portal

The internal portal lives at `~/Downloads/sbp-portal-v1.html` (single-file
HTML app). It uses the **same Supabase project** as the marketing site. It is
not yet public-facing. When work shifts to the portal, that project should
get its own `CLAUDE.md` documenting:
- Where the portal HTML file is
- How it's deployed (currently sbpilatesmanagmentpro.netlify.app)
- The deferred-security items above, which are its blockers

## Conventions

- **Never delete columns from existing tables** — the portal may use them.
  Migrations should be additive only.
- **Never modify the portal HTML** unless explicitly asked.
- **Never enable RLS on the other 24 tables** without an explicit plan for
  the portal's auth state — it would break the portal.
- Photos in `/public` are kept with original-case filenames; clean lowercase
  copies are made for code references (e.g. `Sara Closeup.png` →
  `sara-closeup.png`).
- Don't run destructive git operations without asking.

## How to work with this project

- Dev server: `npm run dev`
- Production build check: `npm run build`
- Seed Supabase (needs SUPABASE_SERVICE_ROLE_KEY): `npm run seed`
- Deploy: any commit pushed to `main` on GitHub auto-deploys via Netlify
