-- Discípulo — schema inicial (Supabase)
-- Execute no SQL Editor do painel Supabase

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default 'Discípulo',
  email text,
  avatar_url text,
  onboarding_completed boolean not null default false,
  streak_current int not null default 0,
  streak_longest int not null default 0,
  last_active_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  bible_version text not null default 'acf',
  prayer_daily_goal_minutes int not null default 15,
  notifications_enabled boolean not null default true,
  theme text not null default 'dark',
  updated_at timestamptz not null default now()
);

create table if not exists public.devotional_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  completed_date date not null,
  moment_id text,
  user_text text,
  skipped boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, completed_date)
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  entry_date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.prayer_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  session_date date not null,
  duration_seconds int not null,
  created_at timestamptz not null default now()
);

create table if not exists public.spiritual_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  topic_id text not null,
  completed_at date not null,
  unique (user_id, topic_id)
);

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.devotional_completions enable row level security;
alter table public.journal_entries enable row level security;
alter table public.prayer_requests enable row level security;
alter table public.prayer_sessions enable row level security;
alter table public.spiritual_progress enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "settings_all_own" on public.user_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "devotional_all_own" on public.devotional_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "journal_all_own" on public.journal_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "prayer_all_own" on public.prayer_requests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "sessions_all_own" on public.prayer_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "spiritual_all_own" on public.spiritual_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'Discípulo'),
    new.email
  );

  insert into public.user_settings (user_id)
  values (new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
