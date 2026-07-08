const spiritualLevels = [
    {
        level: 1,
        title: "Fundamentos",
        description: "A base de toda caminhada com Cristo. Antes de crescer, é preciso firmar o alicerce.",
        topics: [
            {
                id: "salvacao",
                title: "Salvação",
                verse: "João 3:16",
                summary: "Deus amou o mundo e enviou Jesus para que todo aquele que crer tenha vida eterna.",
                study: "Salvação não é merecimento humano, mas graça recebida pela fé em Cristo. Jesus morreu pelos nossos pecados e ressuscitou para nos dar vida nova. Nascer de novo é deixar de viver só para si e passar a viver para Deus.",
                application: "A salvação não é um evento esquecido no passado — é uma relação viva. Hoje, agradeça a Deus pela vida que você tem nele e reafirme sua fé.",
                challenge: "Ore em voz baixa: 'Senhor, obrigado por me salvar. Quero viver para ti hoje.'"
            },
            {
                id: "fe",
                title: "Fé",
                verse: "Hebreus 11:1",
                summary: "Fé é a certeza das coisas que se esperam e a convicção de fatos que não se veem.",
                study: "Fé bíblica não é otimismo. É confiar em Deus mesmo quando as circunstâncias contradizem. A fé cresce quando ouvimos a Palavra e damos passos de obediência, mesmo sem ver o resultado completo.",
                application: "Onde você tem vivido mais pelo medo do que pela fé? Identifique uma área e dê um passo de confiança hoje.",
                challenge: "Escreva uma promessa bíblica e leia em voz alta três vezes ao longo do dia."
            },
            {
                id: "oracao",
                title: "Oração",
                verse: "Mateus 6:6",
                summary: "Jesus ensina a orar em secreto, com sinceridade, diante do Pai que vê o coração.",
                study: "Oração é diálogo com Deus — adoração, confissão, gratidão e petição. Não é performance religiosa. O Pai conhece sua necessidade antes de você pedir, mas deseja seu coração.",
                application: "Separe um momento hoje sem celular. Ore com honestidade, não com frases decoradas.",
                challenge: "Ore 5 minutos usando o cronômetro da aba Oração."
            },
            {
                id: "biblia",
                title: "Bíblia",
                verse: "2 Timóteo 3:16",
                summary: "Toda Escritura é inspirada por Deus e útil para ensinar, corrigir e treinar na justiça.",
                study: "A Bíblia não é apenas informação antiga — é a Palavra viva que forma caráter. Ler sem obedecer engana; ler e praticar transforma. Constância vale mais que volume.",
                application: "Não leia por obrigação. Leia para encontrar direção. Aplique uma verdade hoje.",
                challenge: "Leia um capítulo ou um trecho curto e anote uma verdade para praticar."
            },
            {
                id: "espirito-santo",
                title: "Espírito Santo",
                verse: "Atos 1:8",
                summary: "Recebereis poder quando o Espírito Santo descer sobre vós, para serem testemunhas.",
                study: "O Espírito Santo não é força impessoal — é Deus presente no crente, guiando, consolando, convencendo do pecado e capacitando para obedecer. A vida cristã não foi feita para ser vivida na própria força.",
                application: "Antes de uma decisão hoje, pare e peça: 'Espírito Santo, guia-me.'",
                challenge: "Ore pedindo um coração sensível à direção do Espírito ao longo do dia."
            },
            {
                id: "igreja",
                title: "Igreja",
                verse: "Hebreus 10:24-25",
                summary: "Não deixemos de nos reunir, mas encorajemo-nos uns aos outros.",
                study: "Igreja não é prédio nem instituição perfeita — é o corpo de Cristo. Deus nos colocou juntos para crescer, servir, corrigir e suportar. Isolamento enfraquece; comunhão fortalece.",
                application: "Se você anda distante da igreja, dê um passo de aproximação hoje: mensagem, visita ou culto.",
                challenge: "Envie uma mensagem de encorajamento a alguém da sua comunidade de fé."
            }
        ]
    },
    {
        level: 2,
        title: "Santificação",
        description: "Crescer em semelhança a Cristo no caráter, nos pensamentos e nas atitudes do dia a dia.",
        topics: [
            {
                id: "arrependimento",
                title: "Arrependimento",
                verse: "1 João 1:9",
                summary: "Se confessarmos os pecados, Deus é fiel para perdoar e purificar de toda injustiça.",
                study: "Arrependimento bíblico não é só culpa — é mudança de direção. Confessar é concordar com Deus sobre o pecado, abandoná-lo e receber perdão. Deus não quer condenar; quer restaurar.",
                application: "Há algo que você tem evitado confessar a Deus? Pare de esconder. A confissão sincera abre espaço para cura e liberdade.",
                challenge: "Ore confessando um pecado específico e peça graça para viver diferente hoje."
            },
            {
                id: "pureza",
                title: "Pureza de coração",
                verse: "Mateus 5:8",
                summary: "Bem-aventurados os puros de coração, porque verão a Deus.",
                study: "Pureza começa no interior — pensamentos, desejos e motivações. Jesus eleva o padrão além da aparência externa. Um coração puro não é perfeito, mas é sincero e submisso a Deus.",
                application: "O que você tem alimentado nos pensamentos? Hoje, corte uma fonte de impureza e substitua por algo que edifica.",
                challenge: "Quando vier um pensamento impuro, ore imediatamente: 'Senhor, guarda meu coração.'"
            },
            {
                id: "dominio-proprio",
                title: "Domínio próprio",
                verse: "Gálatas 5:22-23",
                summary: "O fruto do Espírito inclui domínio próprio — capacidade de governar impulsos e desejos.",
                study: "Domínio próprio não é repressão humana, mas fruto do Espírito. É dizer não ao impulso e sim à vontade de Deus. Quem não governa a si mesmo é governado por hábitos, emoções e tentações.",
                application: "Onde você perde o controle com mais facilidade — palavras, comida, redes sociais, raiva? Identifique e estabeleça um limite concreto hoje.",
                challenge: "Escolha uma área e pratique uma pausa de 10 segundos antes de reagir impulsivamente."
            },
            {
                id: "perdao",
                title: "Perdão",
                verse: "Colossenses 3:13",
                summary: "Perdoai uns aos outros, assim como o Senhor vos perdoou.",
                study: "Perdoar não é negar a dor nem justificar o erro alheio. É liberar o coração da prisão da mágoa. Quem foi perdoado por Cristo é chamado a perdoar — não por merecimento do outro, mas por obediência ao Evangelho.",
                application: "Há alguém que você precisa perdoar de verdade? Perdão é processo, mas começa com uma decisão sincera diante de Deus.",
                challenge: "Ore pelo nome de quem te magoou. Peça a Deus um coração disposto a perdoar."
            },
            {
                id: "humildade",
                title: "Humildade",
                verse: "Filipenses 2:3-5",
                summary: "Nada façais por rivalidade ou vanglória, mas com humildade, estimando os outros superiores a vós mesmos.",
                study: "Jesus é o modelo de humildade — sendo Deus, se esvaziou e serviu. Humildade não é se menosprezar; é deixar de exigir protagonismo e reconhecer que tudo vem de Deus.",
                application: "Onde o orgulho tem te impedido de pedir perdão, ouvir ou servir? Hoje, escolha o caminho mais humilde.",
                challenge: "Faça algo útil para alguém sem precisar contar a ninguém."
            },
            {
                id: "vida-separada",
                title: "Vida separada",
                verse: "Romanos 12:2",
                summary: "Não vos conformeis com este mundo, mas transformai-vos pela renovação da mente.",
                study: "Santificação envolve não se moldar aos padrões do mundo. Separar-se não é isolamento arrogante — é viver com valores do Reino em meio à cultura. A mente renovada pela Palavra produz conduta diferente.",
                application: "Alguma prática do mundo tem entrado na sua vida sem você perceber? Compare seus hábitos com a Palavra e ajuste uma atitude hoje.",
                challenge: "Identifique um hábito que te afasta de Deus e substitua por 15 minutos de leitura bíblica ou oração."
            }
        ]
    },
    {
        level: 3,
        title: "Evangelismo",
        description: "Compartilhar Cristo com clareza e amor. O evangelho não é só para guardar — é para viver e anunciar.",
        topics: [
            {
                id: "evangelho",
                title: "O Evangelho",
                verse: "Romanos 1:16",
                summary: "Paulo não se envergonha do evangelho, pois é poder de Deus para salvação de todo aquele que crê.",
                study: "Evangelho significa boa notícia: Cristo morreu pelos nossos pecados, ressuscitou e oferece perdão e vida nova. Evangelismo não começa com debate — começa com a mensagem clara de Jesus. Quem foi salvo é chamado a anunciar essa salvação.",
                application: "Você tem vivido o evangelho como boa notícia real ou só como assunto religioso? Hoje, medite na cruz e na ressurreição antes de falar com alguém.",
                challenge: "Releia Romanos 1:16 e ore: 'Senhor, dá-me amor pelo evangelho e coragem para anunciá-lo.'"
            },
            {
                id: "testemunho",
                title: "Testemunho pessoal",
                verse: "1 Pedro 3:15",
                summary: "Estejam sempre preparados para responder a quem pedir razão da esperança que há em vocês.",
                study: "Testemunho não é discurso perfeito — é contar o que Deus fez em você. Antes e depois de Cristo, luta, perdão, transformação. As pessoas se conectam com histórias reais. Você não precisa saber tudo; precisa ser sincero.",
                application: "Como era sua vida antes de Cristo? O que mudou depois que você creu? Escreva em 3 frases simples — isso já é um testemunho.",
                challenge: "Conte para uma pessoa como Jesus te alcançou. Se não puder falar, envie uma mensagem honesta."
            },
            {
                id: "missao",
                title: "Missão",
                verse: "Mateus 28:19-20",
                summary: "Jesus envia os discípulos a fazer discípulos de todas as nações, ensinando e batizando em seu nome.",
                study: "A igreja não existe só para si mesma. A Grande Comissão é para todo crente — ir, anunciar, batizar, ensinar. Missão começa onde você está: casa, trabalho, escola, bairro. Evangelismo é participar do plano de Deus de alcançar pessoas.",
                application: "Quem são as 3 pessoas mais próximas de você que ainda não conhecem a Cristo? Ore por elas pelo nome hoje.",
                challenge: "Escreva os nomes de 3 pessoas e ore por cada uma por 2 minutos."
            },
            {
                id: "amor-testemunho",
                title: "Amor como testemunho",
                verse: "João 13:35",
                summary: "Por isso todos saberão que sois meus discípulos: se tiverdes amor uns aos outros.",
                study: "Palavras sem amor afastam; vida transformada atrai. Jesus disse que o amor entre os discípulos seria um sinal visível do Reino. Evangelismo sem caráter de Cristo contradiz a mensagem. Amar, servir e perdoar abre portas para o evangelho.",
                application: "Alguém precisa ver Cristo em você antes de ouvir suas palavras? Hoje, sirva uma pessoa de forma prática, sem esperar retorno.",
                challenge: "Faça um gesto concreto de amor por alguém que ainda não crê — sem mencionar religião."
            },
            {
                id: "ousadia",
                title: "Ousadia com reverência",
                verse: "Atos 4:29-31",
                summary: "Os discípulos pedem ousadia para falar a palavra e são cheios do Espírito Santo.",
                study: "Ousadia bíblica não é grosseria nem arrogância. É falar de Cristo com coragem, mesmo diante de medo ou rejeição. Os apóstolos oraram por ousadia — não confiaram na própria eloquência. O Espírito Santo capacita quem se dispõe.",
                application: "O que te impede de falar de Jesus — medo de rejeição, de não saber responder, de parecer estranho? Entregue isso a Deus e peça um passo de coragem.",
                challenge: "Inicie uma conversa espiritual com alguém. Pode ser simples: 'Posso orar por você?'"
            },
            {
                id: "convite",
                title: "Convidar a seguir Jesus",
                verse: "Mateus 4:19",
                summary: "Jesus chama: 'Sigam-me, e eu os farei pescadores de homens.'",
                study: "Evangelismo maduro não termina em 'fé no coração' vago — convida a seguir Jesus. Seguir é rendição, obediência e vida com ele. O convite pode ser direto: ler a Bíblia juntos, ir à igreja, orar, explicar o evangelho. O Espírito Santo convence; nós convidamos.",
                application: "Há alguém em quem você tem investido que está pronto para um convite claro? Ore por discernimento e, se for o momento, convide a conhecer Jesus de verdade.",
                challenge: "Convide alguém para um culto, estudo bíblico ou conversa sobre fé na próxima semana."
            }
        ]
    },
    {
        level: 4,
        title: "Discipulado",
        description: "Ajudar outros a seguir a Jesus com intencionalidade. Discipulado é caminhar junto, ensinar a obedecer e formar discípulos que formam discípulos.",
        topics: [
            {
                id: "chamado-discipular",
                title: "O chamado de discipular",
                verse: "Mateus 28:20",
                summary: "Jesus envia a ensinar os discípulos a observar tudo o que ele mandou — até o fim dos tempos.",
                study: "Discipulado não é programa da igreja — é o método de Jesus. Ele viveu com os doze, ensinou, corrigiu, enviou. Discipulado é relacionamento intencional com o propósito de formar obediência a Cristo, não apenas transferir informação.",
                application: "Você tem alguém que está te observando espiritualmente? Se não, ore por uma pessoa mais nova na fé para investir com intencionalidade.",
                challenge: "Liste uma pessoa que você pode discipular (ou ser discipulado por) e ore por esse relacionamento hoje."
            },
            {
                id: "modelar-cristo",
                title: "Modelar a Cristo",
                verse: "1 Coríntios 11:1",
                summary: "Paulo diz: 'Sede meus imitadores, como também eu sou de Cristo.'",
                study: "Discipulado acontece mais pela vida do que pelo discurso. Quem discipula precisa ser referência sincera — não perfeita, mas transparente e submissa a Jesus. Imitar Cristo é o padrão; imitar líderes humanos só funciona quando eles apontam para Cristo.",
                application: "Sua vida pública e privada estão alinhadas? Alguém que te imita aprenderia mais sobre Jesus ou sobre performance religiosa?",
                challenge: "Compartilhe com alguém uma luta real e como a Palavra tem te ajudado — com humildade, não com pose."
            },
            {
                id: "investir-tempo",
                title: "Investir tempo",
                verse: "2 Timóteo 2:2",
                summary: "Paulo orienta Timóteo a transmitir o que aprendeu a homens fiéis que ensinarão outros também.",
                study: "Discipulado exige tempo — não só um café rápido. Jesus passou três anos com os discípulos. A multiplicação acontece quando investimos de forma consistente em poucas pessoas com profundidade, em vez de dispersar superficialmente.",
                application: "Com quem você poderia ter um encontro semanal de 30–60 minutos para Bíblia, oração e vida? Comprometa-se com constância, não só com boa intenção.",
                challenge: "Marque na agenda um horário fixo esta semana para caminhar com alguém na fé."
            },
            {
                id: "responsabilidade",
                title: "Responsabilidade mútua",
                verse: "Gálatas 6:1-2",
                summary: "Restaure com mansidão quem caiu e leve os fardos uns dos outros — assim cumprireis a lei de Cristo.",
                study: "Discipulado inclui cuidado quando o outro tropeça. Não é julgar de longe nem ignorar o erro — é amar com verdade, restaurar com gentileza e caminhar junto no peso. Responsabilidade mútua fortalece e evita isolamento.",
                application: "Você tem alguém com permissão para falar difícil com você? Se não, peça a um irmão maduro na fé para te ajudar a crescer com honestidade.",
                challenge: "Pergunte a alguém de confiança: 'Onde você vê que preciso crescer?' Ouça sem se defender."
            },
            {
                id: "palavra-e-vida",
                title: "Palavra e vida",
                verse: "Deuteronômio 6:6-7",
                summary: "As palavras devem estar no coração; ensina-as aos filhos, falando delas em casa e pelo caminho.",
                study: "Ensinar a Palavra não é só aula formal — é conversa no cotidiano. Discipulado integra vida diária: trabalho, família, decisões. A Bíblia deve ser aplicada em situações reais, não guardada só para o culto.",
                application: "Na próxima conversa com quem você discipula, conecte uma situação real dele com um texto bíblico. Aplicação prática é o coração do discipulado.",
                challenge: "Leiam juntos um trecho curto da Bíblia e respondam: 'O que isso muda na sua semana?'"
            },
            {
                id: "multiplicacao",
                title: "Multiplicação",
                verse: "Atos 2:42",
                summary: "Os primeiros cristãos perseveravam na doutrina, na comunhão, no partir do pão e nas orações.",
                study: "Discipulado maduro gera multiplicação — quem é discipulado aprende a discipular. A igreja cresce em profundidade e alcance quando cada geração forma a próxima. O objetivo não é dependência do líder, mas maturidade que reproduz.",
                application: "Quem você está preparando para ensinar outros? Pense em discipulado como corrente: Cristo → você → alguém → mais alguém.",
                challenge: "Encoraje quem você discipula a investir em uma pessoa — mesmo que seja um passo pequeno esta semana."
            }
        ]
    },
    {
        level: 5,
        title: "Liderança",
        description: "Servir, influenciar e guiar pelo exemplo em Cristo. Liderança bíblica não é status — é serviço, integridade e cuidado pelo rebanho.",
        topics: [
            {
                id: "servir",
                title: "Servir como Cristo",
                verse: "Marcos 10:43-45",
                summary: "Quem quiser ser grande entre vós será vosso servo; o Filho do homem não veio para ser servido, mas para servir.",
                study: "Jesus redefine liderança: não como domínio, mas como serviço sacrificial. O líder cristão não busca controle nem aplauso — busca o bem do outro, mesmo a custo pessoal. Autoridade bíblica anda junto com humildade.",
                application: "Onde você tem buscado ser servido em vez de servir? Hoje, faça algo útil para alguém sem esperar reconhecimento.",
                challenge: "Sirva em uma tarefa simples na igreja, família ou trabalho — de coração, não por obrigação."
            },
            {
                id: "exemplo",
                title: "Exemplo de vida",
                verse: "1 Timóteo 4:12",
                summary: "Ninguém despreze tua mocidade; sê exemplo para os fiéis na palavra, no procedimento, no amor, na fé e na pureza.",
                study: "Liderança começa no caráter antes do cargo. Pessoas seguem quem vive de forma coerente — não quem só fala bem. Timóteo era jovem, mas Paulo o chama a liderar pelo exemplo em toda a vida.",
                application: "Sua vida privada sustenta ou contradiz sua influência? Escolha uma área (palavras, paciência, pureza) e alinhe hoje com o que você ensina.",
                challenge: "Peça feedback honesto a alguém: 'Onde minha vida te edifica? Onde preciso crescer?'"
            },
            {
                id: "pastorear",
                title: "Pastorear com amor",
                verse: "1 Pedro 5:2-3",
                summary: "Pastoreai o rebanho de Deus, não por obrigação, mas de boa vontade; não por ganância, mas com dedicação.",
                study: "Pastorear é cuidar de pessoas — conhecer, proteger, alimentar com a Palavra, corrigir com amor. Liderança espiritual não é negócio nem performance. O bom pastor conhece o rebanho e se dispõe pelo bem deles.",
                application: "Quem está sob sua influência espiritual precisa de cuidado esta semana? Ligue, ore, pergunte como estão — não só em programas.",
                challenge: "Entre em contato com uma pessoa da sua comunidade de fé e pergunte genuinamente: 'Como posso orar por você?'"
            },
            {
                id: "delegar",
                title: "Delegar com sabedoria",
                verse: "Êxodo 18:17-21",
                summary: "Jetro aconselha Moisés a escolher homens capazes para ajudar a julgar o povo — liderança compartilhada.",
                study: "Liderança madura não centraliza tudo. Moisés estava se esgotando até aprender a delegar. Formar e confiar outras pessoas multiplica impacto e evita burnout. Delegar é investir em outros, não perder controle por preguiça.",
                application: "Você está tentando fazer tudo sozinho? Identifique uma responsabilidade que pode ser compartilhada com alguém capaz e treinável.",
                challenge: "Convide alguém para te ajudar em uma tarefa e ensine o que sabe — com paciência."
            },
            {
                id: "coragem",
                title: "Coragem e obediência",
                verse: "Josué 1:9",
                summary: "Sê forte e corajoso; não te apavores nem te desanimes, porque o Senhor teu Deus é contigo.",
                study: "Liderar exige coragem — não ausência de medo, mas fé que obedece apesar dele. Josué assumiu uma missão enorme após Moisés. Deus não prometeu ausência de batalha, mas sua presença. Coragem cristã vem de confiar em Deus, não em si mesmo.",
                application: "Que decisão ou conversa difícil você tem adiado por medo? Ore, busque conselho maduro e dê um passo de obediência.",
                challenge: "Faça hoje aquilo que Deus já te mostrou — um passo concreto que você tem evitado."
            },
            {
                id: "oracao-palavra",
                title: "Oração e Palavra",
                verse: "Atos 6:4",
                summary: "Os apóstolos definem prioridade: à oração e ao ministério da palavra.",
                study: "Liderança espiritual sustenta-se na dependência de Deus e na Palavra. Atividade sem oração esgota e superficializa. Os primeiros líderes da igreja protegeram tempo para o essencial. Quem lidera muito e ora pouco seca por dentro.",
                application: "Sua agenda reflete prioridade em Deus ou só em tarefas? Bloqueie tempo hoje para oração e leitura bíblica antes das demandas.",
                challenge: "Acorde 15 minutos mais cedo (ou reserve 15 min) só para oração e Palavra — sem celular."
            }
        ]
    }
];
