# Discípulo — 365 dias com Deus

App web de crescimento espiritual diário: devocional personalizado, Bíblia integrada, jornada de maturidade cristã, oração, diário e muito mais.

Projeto desenvolvido como **protótipo funcional** (HTML/CSS/JS) com evolução para **React + Supabase**, pensado para portfólio e futuro MVP.

---

## Destaques

- **Devocional personalizado** — o usuário escreve como está o dia e o app monta um devocional com base no texto (detecção por palavras-chave + variantes únicas por dia)
- **Onboarding** em 3 telas (nome, explicação do devocional, meta de oração)
- **Jornada espiritual** — 5 níveis, 30 tópicos (Fundamentos → Liderança)
- **Bíblia integrada** (ACF via [bible-api.com](https://bible-api.com)), favoritos, busca por palavra e compartilhar versículo
- **Dashboard** com streak, cards de leitura/oração/missão e painel de crescimento
- **Cronômetro de oração**, diário, pedidos de oração, planos de leitura, IA simulada e reflexão noturna
- **Migração React** iniciada em `discipulo-app/` com auth Supabase (modo local sem backend)

---

## Estrutura do repositório

```
365 dias com Deus/
├── index.html          # Protótipo principal (Live Server)
├── CSS/                # Estilos
├── JS/                 # Lógica do protótipo
├── discipulo-docs/     # Documentação de produto (visão, roadmap, schema)
└── discipulo-app/      # Versão React + Vite + Supabase (em migração)
```

---

## Como rodar

### Protótipo (versão completa)

1. Abra a pasta no VS Code
2. Instale a extensão **Live Server**
3. Clique com botão direito em `index.html` → **Open with Live Server**

> Não abra via `file://` — a API da Bíblia exige servidor local.

### App React (versão em migração)

```bash
cd discipulo-app
npm install
npm run dev
```

Abra `http://localhost:5173`. Funciona em **modo local** (localStorage) sem configurar Supabase.

Para login na nuvem: copie `.env.example` → `.env`, preencha as chaves do Supabase e execute `supabase/schema.sql`.

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| Protótipo | HTML, CSS, JavaScript (vanilla) |
| App React | React 19, Vite, React Router |
| Backend (planejado) | Supabase (Auth + PostgreSQL) |
| Bíblia | bible-api.com (Almeida ACF) |
| Persistência atual | localStorage |

---

## Funcionalidades do protótipo

| Módulo | Descrição |
|--------|-----------|
| Início | Dashboard, streak, devocional colapsável |
| Jornada | 5 níveis × 6 tópicos com estudo, aplicação e desafio |
| Bíblia | Leitor, busca (livro ou toda a Bíblia), favoritos, compartilhar |
| Planos | Planos de leitura com progresso |
| IA | Respostas locais por palavras-chave |
| Diário | Anotações com histórico |
| Oração | Pedidos + cronômetro com meta diária |
| Histórico | Devocionais, reflexões e atividades |

---

## Documentação

Detalhes de produto e roadmap em [`discipulo-docs/`](discipulo-docs/):

- [Visão do produto](discipulo-docs/01-visao.md)
- [Funcionalidades](discipulo-docs/02-funcionalidades.md)
- [Arquitetura de dados](discipulo-docs/04-banco.md)
- [Roadmap](discipulo-docs/05-roadmap.md)

---

## Próximos passos (backlog)

- Concluir migração React (diário, oração, planos, IA)
- Sincronização Supabase entre dispositivos
- Deploy (Vercel)
- IA real (OpenAI) com limite free

---

## Autor

Desenvolvido por **Luanderson** — projeto de portfólio com foco em produto, UX e crescimento espiritual prático.

---

## Licença

Projeto pessoal / portfólio. Uso livre para estudo e referência.
