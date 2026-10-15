-- Run this in Supabase → SQL Editor, AFTER deploying the code from this
-- session (the /api/auth/login, /api/auth/register, /api/progress, and
-- /api/admin/* routes). Those routes use the service role key, which
-- bypasses RLS entirely — so this migration is safe to run even though it
-- removes anon access to `students` completely.
--
-- WHY THIS MATTERS: before this session, the browser's anon key could
-- read and write the `students` table directly — which includes every
-- student's email AND their login_code (effectively their password).
-- With RLS this open, anyone with your site's public anon key (visible in
-- any browser's network tab) could have listed every student's login code
-- and logged in as them. This migration closes that.

alter table students enable row level security;

-- Remove any existing permissive policies so we start from a clean slate.
drop policy if exists "Anyone can register" on students;
drop policy if exists "Public can read students" on students;                                           
drop policy if exists "Public students access" on students;

-- Intentionally NO policies are created for the anon role on `students`.
-- With RLS enabled and zero policies, the anon key can no longer select,
-- insert, update, or delete any row — every one of those now happens
-- server-side (via the service role key, which ignores RLS) through:
--   registration → POST /api/auth/register
--   login        → POST /api/auth/login
--   progress     → POST /api/progress
--   admin panel  → /api/admin/*

-- Lessons stay public-readable (just video links + resources, not
-- sensitive) — writes still only happen through /api/admin/lessons.
alter table lessons enable row level security;
drop policy if exists "Public can read lessons" on lessons;
create policy "Public can read lessons" on lessons for select using (true);

-- Submissions: students can still insert their own via the app directly
-- (lower risk — no PII is exposed by allowing inserts), but the anon key
-- cannot read anyone's submissions. Admin review goes through
-- /api/admin/submissions (service role).
alter table submissions enable row level security;
drop policy if exists "Anyone can submit" on submissions;
create policy "Anyone can submit" on submissions for insert with check (true);
