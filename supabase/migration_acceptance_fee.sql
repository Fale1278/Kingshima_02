-- Run this in Supabase → SQL Editor.
-- Safe to run even if the `students` table already exists — the ADD COLUMN
-- lines use IF NOT EXISTS so they won't fail on a second run.

-- If you don't have a students table yet, this creates one matching what
-- the app already expects (login/register/admin pages use these columns):
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  email text unique not null,
  login_code text not null,
  progress jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  application_paid boolean not null default false,
  application_fee_ref text
);

-- If the table already existed, just add the two new columns:
alter table students add column if not exists application_paid boolean not null default false;
alter table students add column if not exists application_fee_ref text;
