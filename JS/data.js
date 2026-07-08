const devotionals = [
    {
        title: "Permaneça na Palavra",
        verse: "João 8:31-32",
        minutes: 8,
        summary: "Jesus define discipulado verdadeiro como permanência na Palavra. Não basta ouvir — é preciso continuar.",
        context: "Jesus falava com judeus que creram nele. O contexto é maturidade espiritual, não apenas decisão inicial.",
        text: "Jesus disse que aquele que permanece na sua palavra é verdadeiramente seu discípulo. A fé não é sustentada apenas por emoção, mas por permanência.",
        application: "Hoje, não trate a Palavra como um pensamento bonito. Trate como direção. Leia, medite e ajuste uma atitude concreta.",
        prayer: "Senhor, firma meu coração na tua Palavra. Que eu não seja apenas ouvinte, mas praticante da verdade.",
        challenge: "Separe 10 minutos hoje para ler João 8 e anote uma verdade que confrontou você."
    },
    {
        title: "O chamado continua",
        verse: "Isaías 6:8",
        minutes: 7,
        summary: "Isaías responde com disponibilidade quando Deus pergunta quem enviar. O chamado exige prontidão.",
        context: "Isaías acabara de ver a glória de Deus no templo. A resposta veio depois do encontro, não antes.",
        text: "Isaías ouviu a voz do Senhor perguntando quem iria. A resposta dele foi disponibilidade: Eis-me aqui, envia-me a mim.",
        application: "Deus não procura apenas talento. Procura disponibilidade. Hoje, esteja atento a uma oportunidade simples de obedecer.",
        prayer: "Senhor, tira de mim a desculpa e coloca em mim prontidão. Usa minha vida onde eu estiver.",
        challenge: "Faça uma ação prática de serviço hoje sem precisar ser visto."
    },
    {
        title: "A fé precisa de prática",
        verse: "Tiago 1:22",
        minutes: 8,
        summary: "Tiago confronta quem ouve a Palavra mas não pratica. Fé madura se revela em obediência.",
        context: "A carta de Tiago foi escrita para cristãos dispersos, enfrentando provações e tentação de viver só de aparência.",
        text: "Tiago ensina que não devemos ser apenas ouvintes da Palavra, enganando a nós mesmos, mas praticantes.",
        application: "A maturidade espiritual não aparece no tanto que você sabe, mas no tanto que você obedece.",
        prayer: "Deus, ajuda-me a transformar conhecimento em obediência e discurso em prática.",
        challenge: "Escolha uma instrução bíblica que você já sabe e pratique hoje intencionalmente."
    }
];

const plans = [
    {
        id: "joao-7",
        title: "7 dias no Evangelho de João",
        days: 7,
        category: "evangelho",
        description: "Uma jornada para conhecer mais profundamente a pessoa de Jesus.",
        readings: ["João 1", "João 2", "João 3", "João 4", "João 5", "João 6", "João 7"]
    },
    {
        id: "oracao-5",
        title: "5 dias fortalecendo a oração",
        days: 5,
        category: "oracao",
        description: "Um plano simples para desenvolver constância na vida de oração.",
        readings: ["Mateus 6:5-15", "Lucas 11:1-13", "Filipenses 4:6-7", "1 Tessalonicenses 5:16-18", "Tiago 5:16"]
    },
    {
        id: "identidade-10",
        title: "10 dias sobre identidade em Cristo",
        days: 10,
        category: "tematico",
        description: "Um caminho para entender quem você é em Deus.",
        readings: [
            "Efésios 1:3-14", "Romanos 8:1-17", "2 Coríntios 5:17-21", "Gálatas 2:20",
            "Colossenses 3:1-4", "1 Pedro 2:9-10", "João 1:12", "Salmo 139:13-16",
            "Jeremias 1:5", "Efésios 2:10"
        ]
    },
    {
        id: "ansiedade-7",
        title: "7 dias vencendo a ansiedade",
        days: 7,
        category: "tematico",
        description: "Passagens bíblicas para confiar em Deus nos momentos de preocupação.",
        readings: [
            "Filipenses 4:6-7", "Mateus 6:25-34", "1 Pedro 5:7", "Salmo 23",
            "Isaías 41:10", "Salmo 46", "Romanos 8:28"
        ]
    },
    {
        id: "casamento-5",
        title: "5 dias fortalecendo o casamento",
        days: 5,
        category: "tematico",
        description: "Princípios bíblicos para amor, perdão e união no lar.",
        readings: [
            "Efésios 5:22-33", "1 Coríntios 13:4-7", "Colossenses 3:12-14",
            "Eclesiastes 4:9-12", "1 Pedro 4:8"
        ]
    },
    {
        id: "evangelismo-7",
        title: "7 dias vivendo o evangelismo",
        days: 7,
        category: "tematico",
        description: "Despertar o coração para compartilhar Cristo no dia a dia.",
        readings: [
            "Mateus 28:18-20", "Atos 1:8", "Romanos 1:16", "Marcos 16:15",
            "2 Coríntios 5:18-20", "1 Pedro 3:15", "João 4:35-38"
        ]
    },
    {
        id: "lideranca-14",
        title: "14 dias — Liderança cristã",
        days: 14,
        category: "premium",
        isPremium: true,
        description: "Formação para quem serve, lidera pequenos grupos ou ministérios.",
        readings: [
            "Marcos 10:42-45", "1 Pedro 5:1-4", "Atos 20:28", "Tito 1:7-9",
            "Neemias 1-2", "Josué 1:1-9", "1 Timóteo 3:1-13", "Efésios 4:11-16",
            "Salmo 78:70-72", "Provérbios 27:23", "Lucas 22:24-27", "2 Timóteo 2:2",
            "1 Coríntios 12:4-11", "Miquéias 6:8"
        ]
    },
    {
        id: "profecia-7",
        title: "7 dias — Dons e direção de Deus",
        days: 7,
        category: "premium",
        isPremium: true,
        description: "Estudo sobre ouvir a voz de Deus e discernir Sua direção.",
        readings: [
            "João 10:1-5", "1 Coríntios 14:1", "Atos 2:17-21", "Joel 2:28-29",
            "1 Samuel 3:1-10", "Romanos 12:6-8", "Apocalipse 3:20"
        ]
    },
    {
        id: "jejum-10",
        title: "10 dias — Jejum e oração",
        days: 10,
        category: "premium",
        isPremium: true,
        description: "Jornada intensa de consagração, jejum e busca pela presença de Deus.",
        readings: [
            "Mateus 6:16-18", "Isaías 58:6-11", "Joel 2:12-13", "Daniel 10:2-3",
            "Atos 13:2-3", "Esdras 8:21-23", "Neemias 1:4", "Lucas 4:1-2",
            "2 Crônicas 7:14", "Salmo 35:13"
        ]
    }
];
