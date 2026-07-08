# Verdex

Banco digital minimalista — projeto de portfólio.

**Paleta:** preto + verde (`#00E676`)

## Rodar localmente

```bash
cd fintech-app
npm install
npm run dev
```

Abre em [http://localhost:5174](http://localhost:5174)

## Telas

- Splash e login (mock)
- Home com saldo, atalhos, gráfico de gastos e meta financeira
- Extrato com filtros, resumo visual e detalhe da transação
- PIX com envio, QR Code para receber e copiar chave
- Investimentos com carteira e produtos simulados
- Cartão virtual com bloqueio/desbloqueio
- Perfil

## Deploy (Vercel)

Conectado ao repositório [luandersonlemos/discipulo](https://github.com/luandersonlemos/discipulo) — cada push na `main` que alterar `fintech-app/` faz deploy automático.

**Produção:** https://fintech-app-nine-tan.vercel.app

```bash
cd fintech-app
npm run build
```

## Stack

React 19 · Vite 6 · React Router 7 · CSS custom
