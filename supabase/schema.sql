-- ============================================================================
-- Modern Excellence School — Supabase Schema
-- Run this in the SQL editor on your Supabase project.
-- ============================================================================

-- Extensions ----------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- Helper: updated_at trigger -------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- TABLES
-- ============================================================================

-- school_info: singleton row that drives the home page / footer
create table if not exists public.school_info (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  tagline text,
  motto text,
  about_short text,
  history text,
  vision text,
  mission text,
  principal_name text,
  principal_message text,
  principal_image_url text,
  logo_url text,
  hero_image_url text,
  address text,
  phone text,
  email text,
  whatsapp text,
  facebook_url text,
  instagram_url text,
  twitter_url text,
  youtube_url text,
  linkedin_url text,
  google_maps_embed text,
  stats jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- faculty
create table if not exists public.faculty (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  designation text not null,
  department text not null,
  qualification text,
  experience_years int default 0,
  bio text,
  email text,
  image_url text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_faculty_department on public.faculty (department);
create index if not exists idx_faculty_active on public.faculty (is_active);

-- events
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text,
  location text,
  category text default 'general',
  start_at timestamptz not null,
  end_at timestamptz,
  cover_image_url text,
  is_featured boolean default false,
  is_published boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_events_start on public.events (start_at desc);
create index if not exists idx_events_published on public.events (is_published);

-- announcements (used by news ticker + dashboard)
create table if not exists public.announcements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  body text,
  link_url text,
  priority int default 0, -- 0 normal, 1 important, 2 urgent
  published_at timestamptz not null default now(),
  expires_at timestamptz,
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_announcements_active on public.announcements (is_active, published_at desc);

-- gallery
create table if not exists public.gallery (
  id uuid primary key default uuid_generate_v4(),
  title text,
  caption text,
  image_url text not null,
  category text default 'campus', -- campus | events | activities | sports
  width int,
  height int,
  display_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_gallery_category on public.gallery (category);

-- admissions (inquiry form)
create table if not exists public.admissions (
  id uuid primary key default uuid_generate_v4(),
  student_name text not null,
  parent_name text not null,
  email text not null,
  phone text not null,
  grade_applying text not null,
  previous_school text,
  address text,
  message text,
  status text default 'new' check (status in ('new','contacted','enrolled','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_admissions_status on public.admissions (status, created_at desc);

-- testimonials
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  author_role text, -- e.g. "Parent of Grade 8 Student"
  author_image_url text,
  content text not null,
  rating int default 5 check (rating between 1 and 5),
  is_published boolean default true,
  display_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- newsletter subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  confirmed boolean default false,
  created_at timestamptz not null default now()
);

-- contact messages
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  handled boolean default false,
  created_at timestamptz not null default now()
);

-- admins (mirror of auth users granted admin)
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================
do $$
declare t text;
begin
  for t in
    select unnest(array[
      'school_info','faculty','events','announcements','gallery',
      'admissions','testimonials'
    ])
  loop
    execute format('drop trigger if exists trg_%I_updated on public.%I;', t, t);
    execute format(
      'create trigger trg_%I_updated before update on public.%I
       for each row execute function public.set_updated_at();', t, t);
  end loop;
end$$;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ----------------------------------------------------------------------------
-- Public read for marketing content. Writes restricted to authenticated
-- users present in `admins`. Form submissions allowed for anonymous users.
-- ============================================================================

alter table public.school_info     enable row level security;
alter table public.faculty         enable row level security;
alter table public.events          enable row level security;
alter table public.announcements   enable row level security;
alter table public.gallery         enable row level security;
alter table public.admissions      enable row level security;
alter table public.testimonials    enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admins          enable row level security;

-- helper predicate
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- READ policies (public) -----------------------------------------------------
drop policy if exists "read school_info"   on public.school_info;
create policy "read school_info" on public.school_info for select using (true);

drop policy if exists "read faculty"       on public.faculty;
create policy "read faculty" on public.faculty for select using (is_active = true);

drop policy if exists "read events"        on public.events;
create policy "read events" on public.events for select using (is_published = true);

drop policy if exists "read announcements" on public.announcements;
create policy "read announcements" on public.announcements for select
  using (is_active = true and (expires_at is null or expires_at > now()));

drop policy if exists "read gallery"       on public.gallery;
create policy "read gallery" on public.gallery for select using (true);

drop policy if exists "read testimonials"  on public.testimonials;
create policy "read testimonials" on public.testimonials for select using (is_published = true);

-- INSERT policies for public form submissions --------------------------------
drop policy if exists "insert admissions" on public.admissions;
create policy "insert admissions" on public.admissions for insert with check (true);

drop policy if exists "insert newsletter" on public.newsletter_subscribers;
create policy "insert newsletter" on public.newsletter_subscribers for insert with check (true);

drop policy if exists "insert contact" on public.contact_messages;
create policy "insert contact" on public.contact_messages for insert with check (true);

-- ADMIN policies (full access) -----------------------------------------------
do $$
declare t text;
begin
  for t in
    select unnest(array[
      'school_info','faculty','events','announcements','gallery',
      'admissions','testimonials','newsletter_subscribers','contact_messages','admins'
    ])
  loop
    execute format('drop policy if exists "admin all" on public.%I;', t);
    execute format(
      'create policy "admin all" on public.%I
        for all using (public.is_admin()) with check (public.is_admin());', t);
  end loop;
end$$;

-- ============================================================================
-- STORAGE BUCKETS (run once, idempotent)
-- ============================================================================
insert into storage.buckets (id, name, public)
values
  ('faculty',   'faculty',   true),
  ('gallery',   'gallery',   true),
  ('events',    'events',    true),
  ('school',    'school',    true)
on conflict (id) do nothing;

-- Public read access on the four buckets
drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select
  using (bucket_id in ('faculty','gallery','events','school'));

drop policy if exists "admin write media" on storage.objects;
create policy "admin write media" on storage.objects for all to authenticated
  using (public.is_admin() and bucket_id in ('faculty','gallery','events','school'))
  with check (public.is_admin() and bucket_id in ('faculty','gallery','events','school'));
