-- 001_marketing_site.sql
-- Santa Barbara Pilates — marketing site, additive schema changes.
--
-- Scope: only the columns and RLS policies the marketing site needs.
-- The other 24 tables (members, payments, bookings, sessions, etc.)
-- intentionally remain with RLS disabled and are not touched here.
-- See TODO_security.md at the repo root for deferred work.
--
-- This migration is idempotent and safe to re-run.

-- ============================================================
-- class_types: marketing-facing additions
-- (Portal already uses class_types as the session-type catalog.
--  We extend it; we do not create a parallel table.)
-- ============================================================
alter table public.class_types
  add column if not exists price_cents int,
  add column if not exists is_public boolean not null default false,
  add column if not exists sort_order int not null default 0,
  add column if not exists session_type text;

-- session_type check (nullable allowed; constrained when present)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'class_types_session_type_check'
  ) then
    alter table public.class_types
      add constraint class_types_session_type_check
      check (session_type is null or session_type in ('private','duet','small_group'));
  end if;
end $$;

create index if not exists class_types_public_sort_idx
  on public.class_types (is_public, sort_order)
  where is_public = true;

-- ============================================================
-- staff: marketing-facing additions
-- Reuses the existing specialties[] column for credentials.
-- No certifications column is added.
-- ============================================================
alter table public.staff
  add column if not exists is_public boolean not null default false,
  add column if not exists slug text,
  add column if not exists website_bio text;

create unique index if not exists staff_slug_unique
  on public.staff (slug)
  where slug is not null;

-- ============================================================
-- leads: no schema changes. Existing columns are sufficient
-- (first_name NOT NULL, last_name, email, phone, source default 'Walk-In',
-- notes, status default 'New', archived default false, etc.).
-- ============================================================

-- ============================================================
-- RLS — SCOPED TO THE THREE MARKETING TABLES ONLY.
-- The other 24 tables remain with RLS disabled. Deliberate.
-- See TODO_security.md.
-- ============================================================

-- staff
alter table public.staff enable row level security;

drop policy if exists "staff anon public read" on public.staff;
create policy "staff anon public read"
  on public.staff for select
  to anon
  using (is_public = true);

drop policy if exists "staff authenticated read all" on public.staff;
create policy "staff authenticated read all"
  on public.staff for select
  to authenticated
  using (true);

-- class_types
alter table public.class_types enable row level security;

drop policy if exists "class_types anon public read" on public.class_types;
create policy "class_types anon public read"
  on public.class_types for select
  to anon
  using (is_public = true);

drop policy if exists "class_types authenticated read all" on public.class_types;
create policy "class_types authenticated read all"
  on public.class_types for select
  to authenticated
  using (true);

-- leads
alter table public.leads enable row level security;

drop policy if exists "leads anon insert" on public.leads;
create policy "leads anon insert"
  on public.leads for insert
  to anon
  with check (true);

drop policy if exists "leads authenticated all" on public.leads;
create policy "leads authenticated all"
  on public.leads for all
  to authenticated
  using (true)
  with check (true);
