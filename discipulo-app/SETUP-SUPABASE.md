# Configurar Supabase — Discípulo (15 min)

App em produção: https://discipulo-lyart.vercel.app/

---

## Passo 1 — Criar projeto no Supabase

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard)
2. **New project**
3. Nome: `discipulo`
4. Senha do banco: guarde em local seguro
5. Região: **South America (São Paulo)** se disponível
6. Aguarde ~2 minutos

---

## Passo 2 — Rodar o banco de dados

1. No painel: **SQL Editor** → **New query**
2. Abra o arquivo `discipulo-app/supabase/schema-full.sql` deste repositório
3. Copie **todo** o conteúdo e cole no editor
4. Clique **Run** (ou Ctrl+Enter)
5. Deve aparecer: *Success. No rows returned*

Verifique em **Table Editor** se existem tabelas: `profiles`, `journal_entries`, `ai_conversations`, etc.

---

## Passo 3 — Configurar autenticação

1. **Authentication** → **Providers** → **Email**
   - Deixe **Enable Email** ligado
2. **Authentication** → **Providers** → **Email** → desligue **Confirm email** (para testes mais rápidos)
   - Ou mantenha ligado e confirme o e-mail ao cadastrar
3. (Opcional) **URL Configuration**:
   - **Site URL:** `https://discipulo-lyart.vercel.app`
   - **Redirect URLs:** adicione `https://discipulo-lyart.vercel.app/**`

---

## Passo 4 — Copiar chaves para a Vercel

1. Supabase → **Project Settings** → **API**
2. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

3. Vercel → projeto **discipulo** → **Settings** → **Environment Variables**
4. Adicione as duas variáveis (Production, Preview, Development)
5. **Deployments** → último deploy → **⋯** → **Redeploy**

---

## Passo 5 — Testar login

1. Abra https://discipulo-lyart.vercel.app/login
2. **Criar conta** com seu e-mail
3. O banner "Modo local" deve **sumir**
4. Em Configurações → **Sincronizar agora**
5. No Supabase → **Table Editor** → `profiles` → deve aparecer seu usuário

---

## Passo 6 — IA real (opcional)

### 6a. Deploy das Edge Functions

No terminal (com [Supabase CLI](https://supabase.com/docs/guides/cli) instalado):

```bash
cd discipulo-app
supabase login
supabase link --project-ref SEU_PROJECT_REF
```

O `project-ref` está na URL do painel: `https://supabase.com/dashboard/project/XXXXX`

```bash
supabase secrets set OPENAI_API_KEY=sk-sua-chave-aqui
supabase functions deploy ask-ai
supabase functions deploy generate-devotional
supabase functions deploy manage-subscription
```

### 6b. Testar IA e devocional personalizado

1. Faça login no app
2. Ao abrir o app, escreva como está seu dia → aguarde "Montando seu devocional..."
3. O devocional deve ser único para o que você escreveu (com Supabase + OpenAI configurados)
4. Aba **IA** → converse com perguntas de acompanhamento
5. Deve aparecer: *Fonte: IA real (OpenAI)*

---

## Passo 7 — Desenvolvimento local (opcional)

```bash
cd discipulo-app
copy .env.example .env
```

Preencha `.env` com as mesmas chaves do passo 4. **Nunca commite o `.env`.**

```bash
npm run dev
```

---

## Checklist final

- [ ] `schema-full.sql` executado sem erro
- [ ] Variáveis na Vercel configuradas + redeploy
- [ ] Cadastro/login funcionando
- [ ] Sincronização salva dados no Supabase
- [ ] (Opcional) IA real com Edge Function

## Problemas comuns

| Problema | Solução |
|----------|---------|
| Ainda mostra "Modo local" | Redeploy na Vercel após adicionar env vars |
| Erro ao criar conta | Desative "Confirm email" ou confirme o link no e-mail |
| IA não funciona | Precisa login + Edge Functions `ask-ai` e `generate-devotional` deployadas |
| Devocional ainda parece genérico | Deploy `generate-devotional` + `OPENAI_API_KEY` no Supabase |
| Dados não sincronizam | Login obrigatório; clique Sincronizar em Configurações |
