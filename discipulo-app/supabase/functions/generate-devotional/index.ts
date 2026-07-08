import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const SYSTEM_PROMPT = `Você é um pastor evangélico contemporâneo criando devocionais personalizados para o app Discípulo.

O usuário compartilhou como está se sentindo hoje. Analise com empatia e crie um devocional ÚNICO para a situação dele — não use frases genéricas.

Regras:
- Linha editorial: evangélica, pentecostal/contemporânea, fiel às Escrituras
- Escolha UM versículo bíblico real e adequado (formato: "Livro cap:versículo" ou "Livro cap:vers1-vers2")
- NÃO invente versículos — use apenas passagens bíblicas reais
- Aplicação e desafio devem mencionar elementos específicos do que o usuário escreveu
- Oração em primeira pessoa, como se o usuário estivesse orando
- Linguagem acessível em português brasileiro
- Tom pastoral, acolhedor, sem julgamento

Responda APENAS com JSON válido neste formato (sem markdown):
{
  "title": "título curto e personalizado",
  "verse": "referência bíblica",
  "summary": "2-3 frases conectando a situação do usuário à Palavra",
  "context": "contexto histórico do texto bíblico em 2-3 frases",
  "application": "aplicação prática específica para o que o usuário vive hoje",
  "prayer": "oração guiada em primeira pessoa",
  "challenge": "desafio concreto e realizável hoje",
  "detectedTheme": "tema identificado em poucas palavras"
}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    const { userText } = await req.json();

    if (!userText?.trim() || userText.trim().length < 8) {
      return new Response(JSON.stringify({ error: "Texto muito curto." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const openaiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiKey) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY não configurada." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Como estou me sentindo hoje:\n"${userText.trim()}"\n\nCrie meu devocional personalizado.`
          }
        ],
        temperature: 0.85,
        max_tokens: 900,
        response_format: { type: "json_object" }
      })
    });

    if (!openaiResponse.ok) {
      const errBody = await openaiResponse.text();
      console.error("OpenAI error:", errBody);
      return new Response(JSON.stringify({ error: "Erro ao gerar devocional." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const completion = await openaiResponse.json();
    const raw = completion.choices?.[0]?.message?.content?.trim();

    let devotional;
    try {
      devotional = JSON.parse(raw);
    } catch {
      return new Response(JSON.stringify({ error: "Resposta da IA inválida." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const result = {
      title: devotional.title || "Deus fala com você hoje",
      verse: devotional.verse || "Salmo 23:1",
      summary: devotional.summary || "",
      context: devotional.context || "",
      application: devotional.application || "",
      prayer: devotional.prayer || "",
      challenge: devotional.challenge || "",
      detectedTheme: devotional.detectedTheme || "",
      minutes: 8,
      personalized: true,
      aiGenerated: true
    };

  if (authHeader) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        { global: { headers: { Authorization: authHeader } } }
      );

      const { data: userData } = await supabase.auth.getUser();

      if (userData?.user) {
        console.log(`Devocional gerado para ${userData.user.id}: ${result.detectedTheme}`);
      }
    }

    return new Response(JSON.stringify({
      devotional: result,
      source: "openai",
      tokensUsed: completion.usage?.total_tokens ?? 0
    }), {
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
