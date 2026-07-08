# Discípulo — Arquitetura de Dados

## Stack recomendada

| Camada | Tecnologia | Motivo |
|--------|------------|--------|
| Front-end web | React + Vite | Componentização, ecossistema |
| Mobile | React Native (Expo) | Compartilha lógica com web |
| Backend / DB | Supabase | Auth, PostgreSQL, realtime, storage |
| IA | OpenAI API (gpt-4o-mini) | Custo/qualidade; trocar motor sem mudar UI |
| Hospedagem web | Vercel | Deploy simples do React |
| Pagamentos | Stripe ou RevenueCat | Assinatura Premium |

## Estado atual vs futuro

| Hoje (protótipo) | Produção |
|------------------|----------|
| LocalStorage | Supabase PostgreSQL |
| Sem usuário | Auth (email, Google, Apple) |
| Dados no aparelho | Sincronização em nuvem |
| IA simulada | OpenAI com contexto |

---

## Diagrama de entidades

```
users
  ├── reading_plans (plano ativo)
  ├── devotional_completions
  ├── journal_entries
  ├── prayer_requests
  ├── ai_conversations
  ├── spiritual_goals
  ├── challenge_responses
  ├── prayer_sessions (cronômetro)
  └── user_settings

plans (catálogo)
devotionals (conteúdo por dia)
spiritual_journey_levels
churches (modo igreja)
subscriptions (premium)
```

---

## Tabelas detalhadas

### `users`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | Supabase auth.users.id |
| name | text | Nome exibido |
| email | text | E-mail |
| avatar_url | text | Foto |
| created_at | timestamptz | |
| streak_current | int | Dias consecutivos atuais |
| streak_longest | int | Maior sequência |
| last_active_date | date | Último dia de atividade |
| onboarding_completed | boolean | |
| church_id | uuid FK | Nullable — modo igreja |
| subscription_tier | enum | free, premium |

---

### `user_settings`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| user_id | uuid PK FK | |
| bible_version | text | NVI, ACF |
| morning_reminder_time | time | |
| evening_reminder_time | time | |
| prayer_daily_goal_minutes | int | Default 15 |
| notifications_enabled | boolean | |
| theme | enum | light, dark, system |

---

### `plans` (catálogo de planos)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | text PK | ex: joao-7 |
| title | text | |
| description | text | |
| days | int | Duração |
| category | text | evangelho, oracao, tematico |
| is_premium | boolean | |
| church_id | uuid FK | Nullable — plano exclusivo da igreja |

---

### `plan_days` (conteúdo de cada dia do plano)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| plan_id | text FK | |
| day_number | int | 1, 2, 3... |
| bible_book | text | João |
| bible_chapter | int | 5 |
| devotional_id | uuid FK | Nullable |

---

### `devotionals`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| title | text | |
| verse_reference | text | João 8:31-32 |
| bible_text | text | Texto bíblico |
| summary | text | Resumo / Entenda |
| context | text | Contexto histórico |
| application | text | Aplicação prática |
| prayer | text | Oração guiada |
| challenge | text | Desafio do dia |
| estimated_minutes | int | 8 |
| life_moment_tags | text[] | ansiedade, casamento... |

---

### `user_reading_plans` (plano ativo do usuário)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| plan_id | text FK | |
| started_at | date | |
| current_day | int | |
| completed_at | date | Nullable |
| is_active | boolean | |

---

### `devotional_completions`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| completed_date | date | UNIQUE(user_id, completed_date) |
| plan_id | text FK | |
| day_number | int | |
| devotional_id | uuid FK | |

---

### `challenge_responses` (reflexão noturna)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| date | date | |
| challenge_text | text | Desafio do dia |
| completed | enum | yes, no, partial |
| notes | text | Nullable |
| created_at | timestamptz | |

---

### `journal_entries`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| date | date | |
| content | text | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

---

### `prayer_requests`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| text | text | |
| created_at | timestamptz | |
| answered | boolean | Default false |
| answered_at | timestamptz | Nullable |
| is_shared | boolean | Modo igreja/grupo |

---

### `prayer_sessions` (cronômetro)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| date | date | |
| duration_seconds | int | |
| created_at | timestamptz | |

---

### `ai_conversations`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| date | date | |
| question | text | |
| answer | text | |
| devotional_id | uuid FK | Contexto |
| bible_reference | text | Nullable |
| tokens_used | int | Controle de custo |
| created_at | timestamptz | |

---

### `spiritual_journey_progress`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| level | int | 1–5 |
| topic_id | text | salvacao, fe, oracao... |
| completed_at | timestamptz | |

---

### `spiritual_goals`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| type | enum | bible_full, prayer_hours, evangelism |
| target_value | int | |
| current_value | int | |
| created_at | timestamptz | |

---

### `favorite_verses`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| book | text | |
| chapter | int | |
| verse_start | int | |
| verse_end | int | Nullable |
| text | text | |
| created_at | timestamptz | |

---

### `churches` (Fase 3)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| name | text | |
| code | text UNIQUE | VERBO2026 |
| pastor_user_id | uuid FK | |
| created_at | timestamptz | |

---

### `subscriptions`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| user_id | uuid FK | |
| stripe_subscription_id | text | |
| status | enum | active, canceled, past_due |
| current_period_end | timestamptz | |
| plan | enum | monthly, annual |

---

## Mapeamento LocalStorage → Supabase

| LocalStorage (protótipo) | Tabela (produção) |
|--------------------------|-------------------|
| `completedDays` | `devotional_completions` |
| `journals` | `journal_entries` |
| `prayers` | `prayer_requests` |
| `currentPlan` | `user_reading_plans` |
| `aiHistory` | `ai_conversations` |

---

## Regras de negócio importantes

### Streak (sequência)
1. Usuário conclui devocional → `devotional_completions` insere registro
2. Se `last_active_date` = ontem → `streak_current++`
3. Se `last_active_date` < ontem → `streak_current = 1`
4. Atualizar `streak_longest` se necessário

### Limite de IA (free)
- Contar `ai_conversations` onde `date = hoje` e `user.subscription_tier = free`
- Limite: 5/dia
- Premium: sem limite

### Row Level Security (Supabase)
- Todas as tabelas de usuário: `user_id = auth.uid()`
- Tabelas de catálogo (`plans`, `devotionals`): leitura pública
- `churches`: pastor vê dados agregados do grupo

---

## API da IA — contrato (para trocar simulação por real)

```typescript
// Interface que o front-end usa hoje e continuará usando

interface AiRequest {
  question: string;
  context: {
    devotionalTitle: string;
    verse: string;
    application: string;
    bibleChapter?: string;
  };
  style?: 'simple' | 'pastoral' | 'deep';
}

interface AiResponse {
  answer: string;
  tokensUsed?: number;
}
```

**Implementação MVP:** função local `askAi()` com respostas pré-prontas.

**Implementação produção:** Edge Function no Supabase chama OpenAI, injeta contexto do devocional + linha editorial no system prompt.

---

## System prompt da IA (rascunho)

```
Você é um assistente bíblico do app Discípulo.
Linha editorial: evangélica, pentecostal/contemporânea, fiel às Escrituras.
Responda em português brasileiro, linguagem acessível.
Baseie-se no contexto do devocional fornecido.
Não invente versículos. Se não souber, diga com humildade.
Foque em aplicação prática e edificação.
```
