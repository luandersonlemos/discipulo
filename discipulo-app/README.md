# Discípulo App (React + Supabase)

App React com migração gradual do protótipo HTML.

## Rodar agora (modo local)

Sem Supabase, o app usa **localStorage** no navegador (mesmos dados do protótipo).

```bash
cd discipulo-app
npm install
npm run dev
```

Abra `http://localhost:5173` — o onboarding aparece na primeira vez.

## Configurar Supabase (opcional)

1. Crie projeto em [supabase.com](https://supabase.com)
2. `copy .env.example .env` e preencha URL + anon key
3. Execute `supabase/schema.sql` no SQL Editor
4. Reinicie `npm run dev` — login com e-mail passa a funcionar

## O que já foi migrado

- Onboarding (3 telas)
- Home / dashboard (streak, cards, crescimento)
- Devocional personalizado + "Agora não"
- Jornada espiritual (5 níveis)
- Leitor da Bíblia (ACF via bible-api.com)

## Próximo

- Diário, oração, planos, IA, favoritos e busca na Bíblia
- Sincronização Supabase dos dados locais
