# Discípulo — Roadmap

## Visão geral das fases

```
FASE 0 ✅ Protótipo HTML       (concluído)
FASE 1 → MVP lançável          (2–4 semanas)
FASE 2 → Retenção e áudio      (4–8 semanas)
FASE 3 → Escala e monetização  (8–16 semanas)
FASE 4 → Modo igreja e família (contínuo)
```

---

## FASE 0 — Protótipo ✅ Concluído

**Objetivo:** Validar a ideia visualmente, sem backend.

- [x] Devocional diário
- [x] Sequência de leitura (streak)
- [x] Diário espiritual
- [x] Pedidos de oração
- [x] Planos de leitura (básico)
- [x] IA simulada
- [x] Histórico básico
- [x] Documentação do produto (`discipulo-docs/`)

**Aprendizado:** O protótipo prova o conceito. Agora precisa de arquitetura antes de crescer.

---

## FASE 1 — MVP (2–4 semanas)

**Objetivo:** App usável por beta testers reais, com login e sincronização.

**Promessa entregue:** "Seu companheiro diário de crescimento espiritual."

### Semana 1 — Fundação
- [ ] Definir nome final e identidade visual (logo, cores, fonte)
- [ ] Setup do projeto React + Vite
- [ ] Setup Supabase (auth + database)
- [ ] Migrar schema do banco (tabelas core)
- [ ] Login: e-mail + Google

### Semana 2 — Core
- [ ] Home redesenhada (dashboard de caminhada)
- [ ] Fluxo completo do devocional (6 seções)
- [ ] Bíblia integrada (1 versão: NVI ou ACF)
- [ ] Planos de leitura com progresso
- [ ] Migrar dados do protótipo para estrutura React

### Semana 3 — Engajamento
- [ ] Diário espiritual (com histórico)
- [ ] Pedidos de oração (com respondida)
- [ ] IA: manter simulação local, mas com interface `AiRequest/AiResponse` pronta para API
- [ ] Histórico unificado

### Semana 4 — Polish e beta
- [ ] Onboarding (3 telas)
- [ ] Notificação matinal (web push ou lembrete)
- [ ] Testes com 10–20 beta testers
- [ ] Correções de UX
- [ ] Deploy (Vercel + domínio)

### Critério de sucesso da Fase 1
- Beta tester abre o app 5+ dias na primeira semana
- Dados sincronizam entre dispositivos
- Nenhum dado perdido ao trocar de celular

---

## FASE 2 — Retenção (4–8 semanas)

**Objetivo:** Features que fazem o usuário sentir falta do app.

### Prioridade alta
- [ ] Reflexão noturna ("Viveu o desafio?")
- [ ] Dashboard de crescimento (% Bíblia, pedidos respondidos)
- [ ] Jornada espiritual — Nível 1 (Fundamentos)
- [ ] Cronômetro de oração + meta diária
- [ ] IA real (OpenAI) substituindo simulação
- [ ] Limite free: 5 perguntas/dia

### Prioridade média
- [ ] Áudio do devocional (TTS ou gravação)
- [ ] Planos temáticos (ansiedade, casamento, evangelismo)
- [ ] Notificações inteligentes (streak em risco)
- [ ] Favoritar versículos
- [ ] Modo offline (capítulos baixados)

### Critério de sucesso da Fase 2
- Streak médio > 14 dias entre usuários ativos
- 30%+ dos usuários usam IA pelo menos 1x/semana
- 20%+ respondem reflexão noturna

---

## FASE 3 — Monetização (8–16 semanas)

**Objetivo:** Sustentabilidade financeira.

- [ ] Paywall Premium (R$ 19–39/mês)
- [ ] IA ilimitada no Premium
- [ ] Planos exclusivos Premium
- [ ] Backup em nuvem
- [ ] Relatórios de progresso detalhados
- [ ] App React Native (iOS + Android)
- [ ] Trial gratuito de 7 dias

### Critério de sucesso da Fase 3
- 5%+ conversão free → premium
- App publicado na App Store e Google Play
- MRR suficiente para cobrir custos de IA + infra

---

## FASE 4 — Escala (contínuo)

**Objetivo:** Plataforma, não apenas app.

- [ ] Modo Igreja (código, plano coletivo, painel do pastor)
- [ ] Modo Família
- [ ] Modo Evangelismo (metas de conversão)
- [ ] Análise do diário pela IA
- [ ] Grupos pequenos / desafios entre amigos
- [ ] Múltiplos idiomas
- [ ] API pública para integrações

---

## Decisões pendentes (resolver na Fase 1)

| Decisão | Opções | Recomendação |
|---------|--------|--------------|
| Nome final | Discípulo, Caminho, Raiz, 365 com Deus | **Discípulo** (curto, memorável, missão clara) |
| Versão da Bíblia | NVI, ACF, NAA | **NVI** (mais acessível) + ACF depois |
| Framework mobile | React Native, Flutter | **React Native (Expo)** — compartilha lógica com web |
| Provedor de IA | OpenAI, Anthropic, Gemini | **OpenAI gpt-4o-mini** — custo baixo, qualidade boa |
| Pagamentos BR | Stripe, Mercado Pago, RevenueCat | **RevenueCat** — simplifica iOS + Android |
| Hospedagem | Vercel, Netlify | **Vercel** |

---

## O que fazer AGORA (próximos 3 dias)

### Dia 1 — Identidade
1. Escolher nome definitivo
2. Definir paleta de cores (sugestão: tons terrosos + dourado suave — crescimento, raiz, luz)
3. Escolher fonte (sugestão: Inter ou Plus Jakarta Sans)
4. Esboçar logo simples (pode ser tipográfico no início)

### Dia 2 — Design
1. Desenhar a nova Home (dashboard) no Figma ou papel
2. Desenhar fluxo do devocional completo (6 telas)
3. Validar com 2–3 pessoas do público-alvo

### Dia 3 — Tecnologia
1. Criar repositório Git
2. `npm create vite@latest discipulo-app -- --template react`
3. Criar projeto no Supabase
4. Configurar auth básico
5. Primeira tela: Login

**Só depois disso voltamos a programar funcionalidades.**

---

## Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Retrabalho por falta de arquitetura | Documentação feita antes de escalar código ✅ |
| Custo alto da IA | Limite free + gpt-4o-mini + cache de respostas comuns |
| Baixa retenção | Foco em streak + reflexão noturna + jornada espiritual |
| Conflito teológico na IA | System prompt com linha editorial clara |
| Dados presos no aparelho | Login + Supabase desde o MVP |
| Escopo grande demais | MVP enxuto: 6 features core, resto nas fases 2–4 |

---

## Comparativo: protótipo vs MVP

| Feature | Protótipo | MVP Fase 1 |
|---------|-----------|------------|
| Login | ❌ | ✅ |
| Sincronização | ❌ | ✅ |
| Home dashboard | Parcial | ✅ Completa |
| Devocional 6 seções | 4 seções | ✅ 6 seções |
| Bíblia integrada | ❌ | ✅ |
| IA | Simulada | Simulada (API-ready) |
| Diário | ✅ | ✅ |
| Oração | ✅ | ✅ |
| Planos | Parcial | ✅ |
| Mobile app | ❌ | ❌ (Fase 3) |
| Premium | ❌ | ❌ (Fase 3) |
