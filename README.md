# Santa Barbara Pilates

Marketing site. Next.js 15 App Router + Tailwind v4 + Supabase + Resend, deployed to Netlify.

## Start from zero

```bash
# 1. Install deps
npm install

# 2. Configure env
cp .env.example .env.local
#   fill in NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
#   RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL

# 3. Apply migrations in the Supabase SQL editor (in order):
#   supabase/migrations/000_bootstrap_optional.sql   (skip if staff/leads already exist)
#   supabase/migrations/001_marketing_site.sql

# 4. Seed instructors + classes
npm run seed

# 5. Dev
npm run dev
```

## Routes
- `/` Home — hero video, method snapshot, Sara intro, founders' list, visit
- `/method` MDX — `content/method.mdx`
- `/sara` MDX — `content/sara.mdx`
- `/instructors`, `/instructors/[slug]` — from Supabase `staff` where `public = true`
- `/pricing` — from Supabase `class_types` where `is_public = true`
- `/visit` — address, parking, lead form
- `/journal`, `/journal/[slug]` — empty MDX scaffold

## Editing copy
- `content/method.mdx`
- `content/sara.mdx`
- Add `content/journal/<slug>.mdx` files with `title`, `description`, `date` frontmatter

## Notes
- Brand tokens live in `app/globals.css` under `@theme` — do not introduce colors outside this palette.
- No emojis, no exclamation marks in body copy.
- Hero video: drop `public/hero-placeholder.mp4` (and `hero-placeholder.jpg` poster).
