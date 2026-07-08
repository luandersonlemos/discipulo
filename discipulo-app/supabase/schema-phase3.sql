-- Discípulo — Fase 3 (execute após schema-phase2.sql)

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

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own" on public.subscriptions
  for select using (auth.uid() = user_id);

create policy "subscriptions_insert_own" on public.subscriptions
  for insert with check (auth.uid() = user_id);

create policy "subscriptions_update_own" on public.subscriptions
  for update using (auth.uid() = user_id);

-- Backups exportados (premium)
create table if not exists public.data_backups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  backup_data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.data_backups enable row level security;

create policy "backups_all_own" on public.data_backups
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
