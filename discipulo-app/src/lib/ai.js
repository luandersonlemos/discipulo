import { getTodayDevotional, truncateText } from "./devotional.js";
import { isPremium } from "./subscription.js";
import { supabase, isSupabaseConfigured } from "./supabase.js";
import {
  getAiHistory,
  getChatSession,
  getTodayKey,
  getTodayMomentSelection,
  hasTodayMomentChoice,
  saveAiQuestion,
  saveChatMessage
} from "./storage.js";

export const AI_DAILY_LIMIT = 5;

export const AI_SUGGESTIONS = [
  { label: "Por que este devocional?", question: "Por que este devocional para o meu dia?" },
  { label: "Como aplicar hoje?", question: "Como posso aplicar isso na prática hoje?" },
  { label: "Estou com dúvida", question: "Tenho uma dúvida sobre o que estou vivendo..." }
];

export function getAiUsageToday() {
  const today = getTodayKey();
  return getAiHistory().filter((entry) => entry.date === today).length;
}

export function getAiRemainingToday() {
  if (isPremium()) {
    return Infinity;
  }

  return Math.max(0, AI_DAILY_LIMIT - getAiUsageToday());
}

export function buildAiContext() {
  const devotional = getTodayDevotional();
  const selection = getTodayMomentSelection();

  return {
    devotionalTitle: devotional.title,
    verse: devotional.verse,
    summary: devotional.summary,
    application: devotional.application,
    challenge: devotional.challenge,
    userText: selection?.userText || ""
  };
}

function buildFollowUpQuestion(themes) {
  if (themes.includes("ansiedade")) {
    return "O que mais pesa no seu coração agora — e o que você gostaria que Deus fizesse hoje?";
  }

  if (themes.includes("decisão")) {
    return "Qual decisão está na sua frente? Conte um pouco mais para eu te ajudar a pensar com a Palavra.";
  }

  return "O que você sentiu ao ler o devocional de hoje? Quero entender melhor onde você está.";
}

export function buildAiAnswer(question, history = []) {
  const devotional = getTodayDevotional();
  const selection = getTodayMomentSelection();
  const userText = selection?.userText || "";
  const lowerQuestion = question.toLowerCase();
  const isFollowUp = history.length > 0;

  if (isFollowUp) {
    return `Entendo o que você compartilhou: "${truncateText(question, 100)}"

Isso se conecta com o devocional de hoje — "${devotional.title}" (${devotional.verse}).

${devotional.application}

${buildFollowUpQuestion([])}`;
  }

  if (lowerQuestion.includes("permanecer") || lowerQuestion.includes("palavra")) {
    return `Permanecer na Palavra não é só ler e seguir em frente — é deixar que Cristo governe suas decisões hoje.

No devocional "${devotional.title}", a direção é: ${truncateText(devotional.application, 200)}

${buildFollowUpQuestion([])}`;
  }

  if (lowerQuestion.includes("oração") || lowerQuestion.includes("orar")) {
    return `Oração é relacionamento, não lista de pedidos.

Uma prática para hoje: ore 5 minutos sem pedir nada — apenas adore e se entregue.

${userText ? `Pensando no que você compartilhou ("${truncateText(userText, 60)}"), ` : ""}o que você gostaria de colocar diante de Deus agora?`;
  }

  if (lowerQuestion.includes("desafio") || lowerQuestion.includes("aplicar")) {
    return `O desafio de hoje tira o devocional da teoria:

${devotional.challenge}

${buildFollowUpQuestion([])}`;
  }

  if (
    devotional.personalized
    && userText
    && (
      lowerQuestion.includes("momento")
      || lowerQuestion.includes("por que")
      || lowerQuestion.includes("esse texto")
      || lowerQuestion.includes("meu dia")
    )
  ) {
    return `Você compartilhou: "${truncateText(userText, 120)}"

Por isso montamos "${devotional.title}" com ${devotional.verse}.

${devotional.summary}

O que mais ressoou com você nesse texto?`;
  }

  if (lowerQuestion.includes("dúvida") || lowerQuestion.includes("duvida")) {
    return `Fico feliz que você queira conversar sobre isso.

${userText ? `Lembro que você começou o dia dizendo: "${truncateText(userText, 80)}". ` : ""}O devocional de hoje aponta para: ${truncateText(devotional.application, 180)}

Conte mais — qual é a dúvida específica?`;
  }

  return `Sobre "${devotional.title}" (${devotional.verse}):

${truncateText(devotional.application, 250)}

${buildFollowUpQuestion([])}`;
}

async function askOpenAi(question, context, history) {
  const { data, error } = await supabase.functions.invoke("ask-ai", {
    body: { question, context, history }
  });

  if (error) {
    throw new Error(error.message || "Erro ao chamar a IA.");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return {
    answer: data.answer,
    source: data.source || "openai",
    tokensUsed: data.tokensUsed
  };
}

export async function askAi(question, options = {}) {
  const trimmed = question.trim();
  const { skipLimit = false, preferLocal = false } = options;

  if (!trimmed) {
    throw new Error("Digite uma pergunta antes.");
  }

  if (!hasTodayMomentChoice()) {
    throw new Error("Comece o devocional de hoje para usar a IA.");
  }

  if (!skipLimit && !isPremium() && getAiRemainingToday() <= 0) {
    throw new Error(`Limite diário atingido (${AI_DAILY_LIMIT} perguntas no plano gratuito). Assine o Premium para IA ilimitada.`);
  }

  const context = buildAiContext();
  const history = getChatSession().map((msg) => ({
    role: msg.role,
    content: msg.content
  }));

  if (!preferLocal && isSupabaseConfigured && supabase) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        const result = await askOpenAi(trimmed, context, history);
        saveChatMessage("user", trimmed);
        saveChatMessage("assistant", result.answer);
        saveAiQuestion(trimmed, result.answer);
        return result;
      }
    } catch (error) {
      console.warn("IA real indisponível, usando simulação local:", error.message);
    }
  }

  const answer = buildAiAnswer(trimmed, history);
  saveChatMessage("user", trimmed);
  saveChatMessage("assistant", answer);
  saveAiQuestion(trimmed, answer);

  return {
    answer,
    source: "simulated",
    tokensUsed: 0
  };
}
