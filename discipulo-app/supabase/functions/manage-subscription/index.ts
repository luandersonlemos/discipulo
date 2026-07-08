import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const TRIAL_DAYS = 7;

function isPremiumUser(profile) {
  if (profile.subscription_tier === "premium" && profile.premium_expires_at) {
    return new Date(profile.premium_expires_at) > new Date();
  }

  if (profile.subscription_tier === "premium" && !profile.premium_expires_at) {
    return true;
  }

  if (profile.trial_ends_at) {
    return new Date(profile.trial_ends_at) > new Date();
  }

  return false;
}

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
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY") ?? "",
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
    const { action, plan } = await req.json();

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (action === "get_status") {
      return new Response(JSON.stringify({
        tier: isPremiumUser(profile) ? "premium" : "free",
        trialEndsAt: profile.trial_ends_at,
        premiumExpiresAt: profile.premium_expires_at,
        trialUsed: profile.trial_used,
        isPremium: isPremiumUser(profile)
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (action === "start_trial") {
      if (profile.trial_used) {
        return new Response(JSON.stringify({ error: "Trial já utilizado." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DAYS);

      await supabase.from("profiles").update({
        trial_ends_at: trialEndsAt.toISOString(),
        trial_used: true,
        subscription_tier: "premium",
        updated_at: new Date().toISOString()
      }).eq("id", userId);

      return new Response(JSON.stringify({
        trialEndsAt: trialEndsAt.toISOString(),
        isPremium: true
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (action === "activate_premium") {
      const selectedPlan = plan === "annual" ? "annual" : "monthly";
      const expiresAt = new Date();

      if (selectedPlan === "annual") {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }

      await supabase.from("profiles").update({
        subscription_tier: "premium",
        premium_expires_at: expiresAt.toISOString(),
        trial_ends_at: null,
        updated_at: new Date().toISOString()
      }).eq("id", userId);

      await supabase.from("subscriptions").insert({
        user_id: userId,
        provider: "manual",
        status: "active",
        plan: selectedPlan,
        current_period_start: new Date().toISOString(),
        current_period_end: expiresAt.toISOString()
      });

      return new Response(JSON.stringify({
        premiumExpiresAt: expiresAt.toISOString(),
        plan: selectedPlan,
        isPremium: true
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

  if (action === "create_stripe_checkout") {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

      if (!stripeKey) {
        return new Response(JSON.stringify({
          error: "Stripe não configurado. Use activate_premium para demo ou configure STRIPE_SECRET_KEY."
        }), {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const priceId = plan === "annual"
        ? Deno.env.get("STRIPE_ANNUAL_PRICE_ID")
        : Deno.env.get("STRIPE_MONTHLY_PRICE_ID");

      if (!priceId) {
        return new Response(JSON.stringify({ error: "Price ID do Stripe não configurado." }), {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const origin = req.headers.get("origin") || "http://localhost:5173";

      const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          mode: "subscription",
          "line_items[0][price]": priceId,
          "line_items[0][quantity]": "1",
          success_url: `${origin}/premium?success=1`,
          cancel_url: `${origin}/premium?canceled=1`,
          client_reference_id: userId,
          "metadata[user_id]": userId
        })
      });

      const session = await stripeRes.json();

      if (!stripeRes.ok) {
        return new Response(JSON.stringify({ error: session.error?.message || "Erro Stripe" }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ checkoutUrl: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ error: "Ação inválida." }), {
      status: 400,
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
