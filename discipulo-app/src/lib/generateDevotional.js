import { detectMomentFromText, truncateText } from "./devotional.js";
import { supabase, isSupabaseConfigured } from "./supabase.js";

function pickBaseFromMoment(userText) {
  const moment = detectMomentFromText(userText);
  const seed = userText.length + userText.charCodeAt(0);
  const index = seed % moment.devotionals.length;
  return { moment, base: moment.devotionals[index] };
}

function extractKeywords(userText) {
  const lower = userText.toLowerCase();
  const themes = [];

  if (/ansied|preocup|medo|nervos/.test(lower)) themes.push("ansiedade");
  if (/cansad|exaust|sem energia|burnout/.test(lower)) themes.push("cansaço");
  if (/triste|deprim|sozinh|solidão|solida/.test(lower)) themes.push("tristeza");
  if (/trabalh|empreg|desempreg|dinheiro|conta/.test(lower)) themes.push("provisão");
  if (/casamento|cônjuge|conjuge|espos|marido|briga/.test(lower)) themes.push("relacionamento");
  if (/decisão|decisao|escolh|dúvida|duvida/.test(lower)) themes.push("decisão");
  if (/culpa|pecado|errei|falhei/.test(lower)) themes.push("restauração");
  if (/gratid|feliz|benção|bencao/.test(lower)) themes.push("gratidão");

  return themes.length ? themes : ["caminhada com Deus"];
}

function buildDynamicTitle(userText, themes) {
  const excerpt = truncateText(userText, 40);

  if (themes.includes("ansiedade")) return `Deus vê sua ansiedade: "${excerpt}"`;
  if (themes.includes("cansaço")) return "Descanso para quem está exausto";
  if (themes.includes("tristeza")) return "Deus está perto do coração ferido";
  if (themes.includes("provisão")) return "Confiança quando tudo parece incerto";
  if (themes.includes("relacionamento")) return "Deus cura o que está ferido no lar";
  if (themes.includes("decisão")) return "Sabedoria para o caminho de hoje";
  if (themes.includes("restauração")) return "Graça que recomeça";

  return "Deus fala com você hoje";
}

export function generateDevotionalLocal(userText) {
  const { moment, base } = pickBaseFromMoment(userText);
  const themes = extractKeywords(userText);
  const excerpt = truncateText(userText, 120);
  const themeLabel = themes.join(", ");

  return {
    title: buildDynamicTitle(userText, themes),
    verse: base.verse,
    summary: `Você compartilhou que está vivendo: "${excerpt}". `
      + "Isso não é irrelevante para Deus — Ele conhece cada detalhe. "
      + `O texto de ${base.verse} fala diretamente ao que você carrega hoje (${themeLabel}). `
      + `${base.summary}`,
    context: base.context,
    application: `Pensando no que você descreveu — "${truncateText(userText, 80)}" — `
      + `a Palavra de hoje convida você a um passo concreto: ${base.application} `
      + "Não ignore o que sentiu ao escrever; Deus usou suas palavras para direcionar esta leitura.",
    prayer: `Senhor, tu conheces o que estou vivendo: ${excerpt}. `
      + `Não preciso esconder o que sinto. ${base.prayer}`,
    challenge: `${base.challenge} `
      + "Faça isso pensando especificamente no que você escreveu hoje.",
    detectedTheme: themeLabel,
    minutes: base.minutes || 8,
    personalized: true,
    aiGenerated: false,
    momentId: moment.id
  };
}

export async function generateDevotionalFromUserText(userText) {
  const trimmed = userText.trim();

  if (trimmed.length < 8) {
    throw new Error("Escreva um pouco mais sobre como está seu dia (mínimo 8 caracteres).");
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const headers = sessionData.session
        ? { Authorization: `Bearer ${sessionData.session.access_token}` }
        : {};

      const { data, error } = await supabase.functions.invoke("generate-devotional", {
        body: { userText: trimmed },
        headers
      });

      if (!error && data?.devotional) {
        const moment = detectMomentFromText(trimmed);
        return {
          devotional: {
            ...data.devotional,
            momentId: data.devotional.momentId || moment.id
          },
          source: data.source || "openai"
        };
      }

      if (data?.error) {
        console.warn("generate-devotional:", data.error);
      }
    } catch (error) {
      console.warn("IA indisponível para devocional:", error.message);
    }
  }

  return {
    devotional: generateDevotionalLocal(trimmed),
    source: "local"
  };
}
