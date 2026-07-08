import { getTodayDevotional, truncateText } from "./devotional.js";
import { isPremium } from "./subscription.js";
import { supabase, isSupabaseConfigured } from "./supabase.js";
import {
  getAiHistory,
  getTodayKey,
  getTodayMomentSelection,
  hasTodayMomentChoice,
  saveAiQuestion
} from "./storage.js";

export const AI_DAILY_LIMIT = 5;

export const AI_SUGGESTIONS = [
  { label: "Por que este devocional?", question: "Por que este devocional para o meu dia?" },
  { label: "Melhorar oração", question: "Como melhorar minha oração?" },
  { label: "Desafio de hoje", question: "Qual é o desafio de hoje?" }
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

export function buildAiAnswer(question) {
  const devotional = getTodayDevotional();
  const selection = getTodayMomentSelection();
  const userText = selection?.userText || "";
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("permanecer") || lowerQuestion.includes("palavra")) {
    return `Permanecer na Palavra não é apenas ler um versículo e seguir a vida.

É continuar debaixo da direção de Cristo mesmo quando a emoção passa.

No devocional de hoje, a aplicação prática é: não trate a Palavra como frase bonita, mas como governo para suas decisões.

Pergunta prática:
Qual atitude sua hoje precisa ser ajustada pela Palavra?`;
  }

  if (lowerQuestion.includes("oração") || lowerQuestion.includes("orar")) {
    return `Oração não é só pedir coisas a Deus.

É relacionamento, dependência e alinhamento.

Uma oração madura não tenta convencer Deus a fazer a nossa vontade; ela submete nosso coração à vontade dele.

Prática de hoje:
Ore 5 minutos sem pedir nada. Apenas agradeça, adore e se renda.`;
  }

  if (lowerQuestion.includes("desafio")) {
    return `O desafio do dia existe para tirar o devocional da teoria.

A fé amadurece quando a Palavra vira prática.

O desafio de hoje é:
${devotional.challenge}`;
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
    return `Você compartilhou hoje:
"${truncateText(userText, 120)}"

Por isso montamos este devocional: "${devotional.title}"

${devotional.summary}

Contexto bíblico:
${devotional.context}

Aplicação para você hoje:
${devotional.application}`;
  }

  if (lowerQuestion.includes("contexto") || lowerQuestion.includes("significa")) {
    return `Sobre "${devotional.title}":

${devotional.summary}

Contexto:
${devotional.context}

Aplicação para hoje:
${devotional.application}`;
  }

  return `Com base no devocional de hoje: "${devotional.title}", a direção principal é esta:

${devotional.application}

Pense nisso de forma prática:
A Palavra não foi dada apenas para informar, mas para transformar decisão, comportamento e caráter.`;
}

async function askOpenAi(question, context) {
  const { data, error } = await supabase.functions.invoke("ask-ai", {
    body: { question, context }
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

  if (!preferLocal && isSupabaseConfigured && supabase) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        const result = await askOpenAi(trimmed, context);
        saveAiQuestion(trimmed, result.answer);
        return result;
      }
    } catch (error) {
      console.warn("IA real indisponível, usando simulação local:", error.message);
    }
  }

  const answer = buildAiAnswer(trimmed);
  saveAiQuestion(trimmed, answer);

  return {
    answer,
    source: "simulated",
    tokensUsed: 0
  };
}
