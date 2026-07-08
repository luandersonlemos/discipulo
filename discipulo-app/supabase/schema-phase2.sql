-- Discípulo — Fase 2 (execute após schema.sql)

-- Configurações extras
alter table public.user_settings
  add column if not exists morning_reminder_time time default '07:00',
  add column if not exists evening_reminder_time time default '21:00',
  add column if not exists streak_reminder_enabled boolean not null default true;

-- Tier de assinatura no perfil
alter table public.profiles
  add column if not exists subscription_tier text not null default 'free';

-- Reflexões noturnas
create table if not exists public.challenge_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  response_date date not null,
  challenge_text text,
  result text not null check (result in ('yes', 'partial', 'no')),
  created_at timestamptz not null default now(),
  unique (user_id, response_date)
);

-- Conversas com IA
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

-- Versículos favoritos
create table if not exists public.favorite_verses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  reference text not null,
  verse_text text not null,
  created_at timestamptz not null default now(),
  unique (user_id, reference)
);

-- Plano de leitura ativo
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

-- Capítulos lidos (progresso bíblico)
create table if not exists public.bible_chapters_read (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  book text not null,
  chapter int not null,
  read_at date not null default current_date,
  unique (user_id, book, chapter)
);

-- Estado local extra (momentos, onboarding flags etc.)
create table if not exists public.user_app_state (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.challenge_responses enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.favorite_verses enable row level security;
alter table public.user_reading_plans enable row level security;
alter table public.bible_chapters_read enable row level security;
alter table public.user_app_state enable row level security;

create policy "challenge_all_own" on public.challenge_responses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "ai_all_own" on public.ai_conversations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "favorites_all_own" on public.favorite_verses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "reading_plan_all_own" on public.user_reading_plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "bible_read_all_own" on public.bible_chapters_read
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "app_state_all_own" on public.user_app_state
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
