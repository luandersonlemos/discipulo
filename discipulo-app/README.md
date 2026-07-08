# Discípulo App — Fase 3

## Rodar local

```bash
cd discipulo-app
npm install
npm run dev
```

## Fase 3 — Monetização

| Feature | Status |
|---------|--------|
| Paywall Premium (R$ 29,90/mês · R$ 249,90/ano) | ✅ |
| Trial gratuito 7 dias | ✅ |
| IA ilimitada no Premium | ✅ |
| 3 planos exclusivos Premium | ✅ |
| Backup na nuvem (Premium) | ✅ |
| Exportar/importar JSON | ✅ |
| Relatórios detalhados (Premium) | ✅ `/relatorios` |
| PWA instalável | ✅ manifest + service worker |
| Stripe Checkout | ✅ scaffold (opcional) |
| React Native | 📋 Fase 3b (repo separado) |

## Páginas novas

- `/premium` — planos, trial, assinatura
- `/relatorios` — dashboard de crescimento (Premium)

## Configurar pagamentos (Stripe)

1. Crie produtos no [Stripe Dashboard](https://dashboard.stripe.com)
2. Configure secrets na Edge Function:

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_...
supabase secrets set STRIPE_MONTHLY_PRICE_ID=price_...
supabase secrets set STRIPE_ANNUAL_PRICE_ID=price_...
supabase functions deploy manage-subscription
```

Sem Stripe, o botão "Assinar" ativa Premium em **modo demo** (para testes e portfólio).

## SQL (ordem)

1. `supabase/schema.sql`
2. `supabase/schema-phase2.sql`
3. `supabase/schema-phase3.sql`

## Edge Functions

```bash
supabase functions deploy ask-ai
supabase functions deploy manage-subscription
```

## Instalar como app (PWA)

1. Abra no Chrome/Edge no celular ou desktop
2. Menu → "Instalar aplicativo" (ou banner no app)
3. Ícone na tela inicial

## Testar Premium localmente

1. Abra `/premium`
2. Clique em **Começar trial grátis** (7 dias)
3. Teste IA ilimitada, planos exclusivos e relatórios

## Deploy

```bash
npm run build
```

Vercel: aponte para `discipulo-app`, output `dist`.

## Próximo — Fase 4

- Modo Igreja
- Modo Família
- App React Native (Expo)
- Análise do diário pela IA
