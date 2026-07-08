import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const SYSTEM_PROMPT = `Você é um pastor amigo no app Discípulo — alguém que conversa, não que prega sermões prontos.

Linha editorial: evangélica, pentecostal/contemporânea, fiel às Escrituras.
Idioma: português brasileiro, acessível e pastoral.

Como conversar:
- Responda com empatia ao que a pessoa compartilhou
- Use o contexto do devocional de hoje como base, mas não repita tudo
- Faça perguntas de acompanhamento quando fizer sentido (1 pergunta por resposta)
- Seja conciso: 2-4 parágrafos curtos
- Não invente versículos — cite apenas passagens reais
- Evite respostas genéricas; conecte com o que a pessoa disse
- Tom: acolhedor, direto, sem julgamento`;

const FREE_DAILY_LIMIT = 5;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Não autenticado." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Sessão inválida." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const userId = userData.user.id;
    const { question, context, history = [] } = await req.json();

    if (!question?.trim()) {
      return new Response(JSON.stringify({ error: "Pergunta vazia." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier, trial_ends_at, premium_expires_at")
      .eq("id", userId)
      .single();

    const isPremium = profile?.subscription_tier === "premium"
      && (!profile.premium_expires_at || new Date(profile.premium_expires_at) > new Date());
    const isTrial = profile?.trial_ends_at && new Date(profile.trial_ends_at) > new Date();
    const hasUnlimitedAi = isPremium || isTrial;
    const today = new Date().toISOString().split("T")[0];

    if (!hasUnlimitedAi) {
      const { count } = await supabase
        .from("ai_conversations")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("conversation_date", today);

      if ((count ?? 0) >= FREE_DAILY_LIMIT) {
        return new Response(JSON.stringify({
          error: `Limite diário atingido (${FREE_DAILY_LIMIT} perguntas no plano gratuito).`
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    const openaiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiKey) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY não configurada no servidor." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const contextBlock = `Contexto do devocional de hoje:
Título: ${context?.devotionalTitle ?? "—"}
Versículo: ${context?.verse ?? "—"}
Resumo: ${context?.summary ?? "—"}
Aplicação: ${context?.application ?? "—"}
${context?.userText ? `O usuário compartilhou ao começar o dia: "${context.userText}"` : ""}`;

    const recentHistory = Array.isArray(history)
      ? history.slice(-8).filter((msg) => msg?.role && msg?.content)
      : [];

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "system", content: contextBlock },
      ...recentHistory.map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      })),
      { role: "user", content: question.trim() }
    ];

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.8,
        max_tokens: 500
      })
    });

    if (!openaiResponse.ok) {
      const errBody = await openaiResponse.text();
      console.error("OpenAI error:", errBody);
      return new Response(JSON.stringify({ error: "Erro ao consultar a IA." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const completion = await openaiResponse.json();
    const answer = completion.choices?.[0]?.message?.content?.trim() ?? "Não foi possível gerar uma resposta.";
    const tokensUsed = completion.usage?.total_tokens ?? 0;

    await supabase.from("ai_conversations").insert({
      user_id: userId,
      conversation_date: today,
      question: question.trim(),
      answer,
      devotional_title: context?.devotionalTitle,
      verse_reference: context?.verse,
      tokens_used: tokensUsed
    });

    return new Response(JSON.stringify({ answer, tokensUsed, source: "openai" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro interno." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
