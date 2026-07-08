-- ============================================================
-- Discípulo — Schema completo (Fases 1 + 2 + 3)
-- Cole TUDO no SQL Editor do Supabase e clique em RUN
-- ============================================================

-- FASE 1
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

-- FASE 2 — colunas extras
alter table public.user_settings
  add column if not exists morning_reminder_time time default '07:00',
  add column if not exists evening_reminder_time time default '21:00',
  add column if not exists streak_reminder_enabled boolean not null default true;

alter table public.profiles
  add column if not exists subscription_tier text not null default 'free';

create table if not exists public.challenge_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  response_date date not null,
  challenge_text text,
  result text not null check (result in ('yes', 'partial', 'no')),
  created_at timestamptz not null default now(),
  unique (user_id, response_date)
);

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  conversation_date date not null default current_date,
  question text not null,
  answer text not null,
  devotional_title text,
  verse_reference text,
  tokens_used int default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.favorite_verses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  reference text not null,
  verse_text text not null,
  created_at timestamptz not null default now(),
  unique (user_id, reference)
);

create table if not exists public.user_reading_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  plan_id text not null,
  plan_data jsonb not null,
  started_at date not null,
  completed_days jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.bible_chapters_read (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  book text not null,
  chapter int not null,
  read_at date not null default current_date,
  unique (user_id, book, chapter)
);

create table if not exists public.user_app_state (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- FASE 3
alter table public.profiles
  add column if not exists trial_ends_at timestamptz,
  add column if not exists premium_expires_at timestamptz,
  add column if not exists trial_used boolean not null default false;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  provider text not null default 'manual',
  provider_subscription_id text,
  status text not null default 'active' check (status in ('active', 'canceled', 'past_due', 'trialing')),
  plan text not null default 'monthly' check (plan in ('monthly', 'annual')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

create table if not exists public.data_backups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  backup_data jsonb not null,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.devotional_completions enable row level security;
alter table public.journal_entries enable row level security;
alter table public.prayer_requests enable row level security;
alter table public.prayer_sessions enable row level security;
alter table public.spiritual_progress enable row level security;
alter table public.challenge_responses enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.favorite_verses enable row level security;
alter table public.user_reading_plans enable row level security;
alter table public.bible_chapters_read enable row level security;
alter table public.user_app_state enable row level security;
alter table public.subscriptions enable row level security;
alter table public.data_backups enable row level security;

-- Policies (idempotentes)
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "settings_all_own" on public.user_settings;
create policy "settings_all_own" on public.user_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "devotional_all_own" on public.devotional_completions;
drop policy if exists "journal_all_own" on public.journal_entries;
drop policy if exists "prayer_all_own" on public.prayer_requests;
drop policy if exists "sessions_all_own" on public.prayer_sessions;
drop policy if exists "spiritual_all_own" on public.spiritual_progress;
create policy "devotional_all_own" on public.devotional_completions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "journal_all_own" on public.journal_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "prayer_all_own" on public.prayer_requests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions_all_own" on public.prayer_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "spiritual_all_own" on public.spiritual_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "challenge_all_own" on public.challenge_responses;
drop policy if exists "ai_all_own" on public.ai_conversations;
drop policy if exists "favorites_all_own" on public.favorite_verses;
drop policy if exists "reading_plan_all_own" on public.user_reading_plans;
drop policy if exists "bible_read_all_own" on public.bible_chapters_read;
drop policy if exists "app_state_all_own" on public.user_app_state;
create policy "challenge_all_own" on public.challenge_responses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "ai_all_own" on public.ai_conversations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "favorites_all_own" on public.favorite_verses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "reading_plan_all_own" on public.user_reading_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "bible_read_all_own" on public.bible_chapters_read for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "app_state_all_own" on public.user_app_state for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "subscriptions_select_own" on public.subscriptions;
drop policy if exists "subscriptions_insert_own" on public.subscriptions;
drop policy if exists "subscriptions_update_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions for select using (auth.uid() = user_id);
create policy "subscriptions_insert_own" on public.subscriptions for insert with check (auth.uid() = user_id);
create policy "subscriptions_update_own" on public.subscriptions for update using (auth.uid() = user_id);

drop policy if exists "backups_all_own" on public.data_backups;
create policy "backups_all_own" on public.data_backups for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Trigger: criar perfil ao cadastrar
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
  )
  on conflict (id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
