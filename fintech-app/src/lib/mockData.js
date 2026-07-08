export const user = {
  name: "Ana Silva",
  firstName: "Ana",
  email: "ana.silva@email.com",
  cpf: "12345678901",
  pixKey: "ana.silva@email.com",
  avatarInitials: "AS"
};

export const account = {
  balance: 12847.63,
  income: 5200.0,
  expenses: 1847.32,
  savingsGoal: 15000,
  savingsCurrent: 8200
};

export const card = {
  holder: "ANA SILVA",
  number: "4532123456789012",
  expiry: "09/28",
  cvv: "•••",
  brand: "Verdex",
  blocked: false,
  limit: 5000,
  used: 1240.5
};

export const transactions = [
  {
    id: "1",
    type: "in",
    title: "Salário",
    subtitle: "Empresa Tech Ltda",
    amount: 5200.0,
    category: "renda",
    date: "2026-07-05T08:00:00"
  },
  {
    id: "2",
    type: "out",
    title: "PIX enviado",
    subtitle: "Mercado Central",
    amount: -87.4,
    category: "alimentacao",
    date: "2026-07-07T19:32:00"
  },
  {
    id: "3",
    type: "out",
    title: "Uber",
    subtitle: "Transporte",
    amount: -24.9,
    category: "transporte",
    date: "2026-07-07T14:10:00"
  },
  {
    id: "4",
    type: "in",
    title: "PIX recebido",
    subtitle: "João Mendes",
    amount: 150.0,
    category: "transferencia",
    date: "2026-07-06T11:45:00"
  },
  {
    id: "5",
    type: "out",
    title: "Netflix",
    subtitle: "Assinatura",
    amount: -55.9,
    category: "lazer",
    date: "2026-07-04T03:00:00"
  },
  {
    id: "6",
    type: "out",
    title: "Farmácia",
    subtitle: "Drogaria São Lucas",
    amount: -42.3,
    category: "saude",
    date: "2026-07-03T16:20:00"
  },
  {
    id: "7",
    type: "in",
    title: "Rendimento",
    subtitle: "Verdex Reserva",
    amount: 12.87,
    category: "investimento",
    date: "2026-07-01T00:00:00"
  },
  {
    id: "8",
    type: "out",
    title: "Restaurante",
    subtitle: "Sabor & Arte",
    amount: -98.0,
    category: "alimentacao",
    date: "2026-07-02T20:15:00"
  }
];

export const recentContacts = [
  { id: "c1", name: "João Mendes", key: "joao@email.com", initials: "JM" },
  { id: "c2", name: "Maria Costa", key: "11999887766", initials: "MC" },
  { id: "c3", name: "Pedro Lima", key: "123.456.789-00", initials: "PL" },
  { id: "c4", name: "Loja Tech", key: "loja@tech.com", initials: "LT" }
];

export const categoryLabels = {
  renda: "Renda",
  alimentacao: "Alimentação",
  transporte: "Transporte",
  transferencia: "Transferência",
  lazer: "Lazer",
  saude: "Saúde",
  investimento: "Investimento"
};

export const investments = {
  total: 8200,
  yield: 12.87,
  yieldPercent: 0.16,
  products: [
    {
      id: "inv1",
      name: "Verdex Reserva",
      type: "Renda fixa",
      amount: 5200,
      yield: 8.42,
      rate: "100% CDI",
      risk: "Baixo"
    },
    {
      id: "inv2",
      name: "CDB Banco Verdex",
      type: "CDB",
      amount: 2000,
      yield: 3.15,
      rate: "102% CDI",
      risk: "Baixo"
    },
    {
      id: "inv3",
      name: "Tesouro Selic",
      type: "Tesouro",
      amount: 1000,
      yield: 1.3,
      rate: "Selic",
      risk: "Baixo"
    }
  ]
};
