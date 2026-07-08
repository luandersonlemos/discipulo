# Discípulo — Mapa de Telas e Fluxos

## Fluxo principal (primeiro acesso)

```
Splash
  ↓
Onboarding (3 telas)
  ↓
Cadastro / Login
  ↓
Escolher plano de leitura
  ↓
Home (dashboard)
```

---

## 1. Splash

**Objetivo:** Identidade visual + carregamento inicial

- Logo Discípulo
- Versículo ou frase da marca
- Verifica sessão (logado → Home; não logado → Onboarding)

---

## 2. Onboarding (3 telas)

| Tela | Conteúdo |
|------|----------|
| 1 | "Seu companheiro de crescimento espiritual" — ilustração |
| 2 | "Leia, pratique, cresça" — devocional + desafio + streak |
| 3 | "Tire dúvidas com IA" — pergunte sobre a Bíblia |

Botão final: **Começar**

---

## 3. Autenticação

### Login
- E-mail + senha
- Continuar com Google
- Continuar com Apple
- Link: Criar conta
- Link: Esqueci minha senha

### Cadastro
- Nome
- E-mail
- Senha
- (Opcional) Como nos conheceu?

### Esqueci senha
- E-mail → link de recuperação

---

## 4. Escolher plano (primeiro acesso)

- Lista de planos disponíveis
- Card por plano: título, duração, descrição
- Botão: **Iniciar este plano**
- Link: Pular por agora

---

## 5. Home — Dashboard ⭐ (tela central)

**Esta tela substitui a home atual do protótipo.**

```
┌─────────────────────────────────────┐
│ Bom dia, Luanderson          🔥 47  │
├─────────────────────────────────────┤
│ 📖 Leitura de hoje                  │
│ João 5 · 7 min          [Iniciar →] │
├─────────────────────────────────────┤
│ 🙏 Oração                           │
│ Ontem: 12 min · Meta: 15 min        │
├─────────────────────────────────────┤
│ 🎯 Missão do dia                    │
│ Ore por uma pessoa específica       │
├─────────────────────────────────────┤
│ 💬 Ontem Deus falou:                │
│ "Preciso confiar mais."             │
├─────────────────────────────────────┤
│ 📈 Seu crescimento                  │
│ Bíblia 18% · Respondidos: 17        │
└─────────────────────────────────────┘
```

**Ações:**
- Toque em "Leitura de hoje" → Tela Devocional
- Toque em Oração → Tela Oração / Cronômetro
- Toque em Missão → Detalhe do desafio
- Toque em crescimento → Tela Perfil / Metas

---

## 6. Devocional (fluxo completo)

```
Leitura bíblica
  ↓
Entenda (resumo)
  ↓
Contexto
  ↓
Aplicação
  ↓
Oração
  ↓
Desafio
  ↓
[Concluir devocional]
  ↓
(Opcional) Perguntar à IA sobre este texto
```

### Subtelas do devocional

| Seção | Conteúdo |
|-------|----------|
| Leitura | Texto bíblico completo (capítulo do plano) |
| Entenda | Resumo em linguagem simples |
| Contexto | Histórico, autor, audiência |
| Aplicação | O que muda hoje na vida prática |
| Oração | Oração guiada baseada no texto |
| Desafio | Ação concreta para o dia |

Botão fixo no final: **Concluir devocional**

---

## 7. Reflexão noturna (push ou card na home à noite)

```
Como foi seu dia?

Você conseguiu viver o desafio de hoje?

○ Sim, consegui
○ Ainda não
○ Parcialmente

[Campo opcional: O que aconteceu?]

[Salvar]
```

---

## 8. IA — Pergunte

```
┌─────────────────────────────────────┐
│ 💬 Pergunte sobre o devocional      │
│                                     │
│ Contexto: João 5 (devocional hoje)  │
│                                     │
│ [________________________]          │
│ [Perguntar]                         │
├─────────────────────────────────────┤
│ 🤖 Resposta                         │
│ (texto da IA)                       │
├─────────────────────────────────────┤
│ Sugestões rápidas:                  │
│ • O que significa...?               │
│ • Como aplico no casamento?         │
│ • Explique o contexto               │
└─────────────────────────────────────┘
```

Premium: contador "3/5 perguntas hoje" no plano free.

---

## 9. Planos

- Plano ativo (destaque no topo)
- Barra de progresso
- Lista de outros planos
- Planos temáticos (Fase 2)
- Planos Premium (bloqueados com ícone ⭐)

---

## 10. Jornada espiritual (Fase 2)

```
Nível 1 — Fundamentos          [████░░] 4/6
  ✔ Salvação
  ✔ Fé
  ✔ Oração
  ○ Bíblia
  ○ Espírito Santo
  ○ Igreja

Nível 2 — Santificação         🔒
```

---

## 11. Diário espiritual

- Campo de texto: "O que Deus falou comigo hoje?"
- Botão Salvar
- Lista de entradas anteriores (mais recente primeiro)
- Toque em entrada → ver completa

---

## 12. Pedidos de oração

- Input: novo pedido
- Lista: pedidos ativos
- Botão em cada item: **Respondida ✔**
- Aba ou filtro: Respondidas
- Contador: "17 pedidos respondidos"

---

## 13. Oração — cronômetro (Fase 2)

- Cronômetro grande (00:00)
- Iniciar / Pausar / Finalizar
- Meta do dia: 15 min
- Histórico da semana

---

## 14. Bíblia

- Seletor: Livro → Capítulo
- Texto bíblico
- Ações: favoritar versículo, compartilhar, perguntar à IA

---

## 15. Histórico

- Devocionais concluídos (por data)
- Anotações do diário
- Perguntas à IA
- Desafios cumpridos / não cumpridos

---

## 16. Perfil

- Nome, foto, e-mail
- Sequência atual 🔥
- Metas espirituais
- Plano ativo
- Versículos favoritos
- Configurações
- Premium (upgrade)

---

## 17. Configurações

- Notificações (manhã / noite)
- Versão da Bíblia
- Meta de oração diária
- Tema (claro / escuro)
- Conta e privacidade
- Sair

---

## 18. Premium / Paywall

- Comparação Free vs Premium
- Preço mensal e anual
- Botão assinar
- Restaurar compra

---

## 19. Modo Igreja (Fase 3)

- Inserir código da igreja
- Dashboard da igreja: plano, desafios, pedidos coletivos
- Mensagem do pastor

---

## Navegação principal (bottom tab bar)

Proposta para o app mobile:

```
🏠 Início    📖 Bíblia    💬 IA    📔 Diário    👤 Perfil
```

No protópio web atual (top tabs):

```
Início | Planos | IA | Diário | Oração | Histórico
```

**Migração sugerida para produção:**

| Protótipo atual | App final |
|-----------------|-----------|
| Início | Home (dashboard) |
| Planos | Dentro de Início + aba dedicada |
| IA | Aba IA |
| Diário | Aba Diário |
| Oração | Dentro de Início + Perfil |
| Histórico | Dentro de Perfil |

---

## Wireframe ASCII — fluxo diário ideal

```
Manhã                          Noite
  │                              │
  ▼                              ▼
Abre app                    Notificação
  │                              │
  ▼                              ▼
Home                        Reflexão
  │                         "Viveu o desafio?"
  ▼                              │
Devocional                       ▼
  │                         Salva + atualiza
  ▼                         streak/desafio
Conclui
  │
  ▼
(Opcional) IA
```
