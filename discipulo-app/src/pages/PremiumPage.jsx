import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  PRICING,
  activatePremium,
  getPremiumFeatures,
  getSubscriptionLabel,
  getSubscriptionState,
  isPremium,
  startTrial
} from "../lib/subscription.js";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

async function callSubscriptionApi(action, plan) {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.functions.invoke("manage-subscription", {
    body: { action, plan }
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}

export default function PremiumPage() {
  const { user, devMode, refreshSubscription } = useAuth();
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [subKey, setSubKey] = useState(0);
  void subKey;

  const premium = isPremium();
  const state = getSubscriptionState();
  const label = getSubscriptionLabel(state);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("success") === "1") {
      setMessage("Pagamento recebido! Seu Premium será ativado em instantes.");
    }
  }, []);

  async function handleStartTrial() {
    setError("");
    setLoading("trial");

    try {
      if (!devMode && isSupabaseConfigured && user?.id) {
        await callSubscriptionApi("start_trial");
        await refreshSubscription?.();
      } else {
        startTrial();
      }

      setMessage("Trial de 7 dias ativado! Aproveite todos os recursos Premium.");
      setSubKey((v) => v + 1);
    } catch (trialError) {
      setError(trialError.message);
    } finally {
      setLoading("");
    }
  }

  async function handleSubscribe(plan) {
    setError("");
    setLoading(plan);

    try {
      if (!devMode && isSupabaseConfigured && user?.id) {
        try {
          const checkout = await callSubscriptionApi("create_stripe_checkout", plan);

          if (checkout?.checkoutUrl) {
            window.location.href = checkout.checkoutUrl;
            return;
          }
        } catch {
          // Stripe não configurado — ativa demo
        }

        await callSubscriptionApi("activate_premium", plan);
        await refreshSubscription?.();
      } else {
        activatePremium(plan);
      }

      setMessage(`Premium ${plan === "annual" ? "anual" : "mensal"} ativado!`);
      setSubKey((v) => v + 1);
    } catch (subError) {
      setError(subError.message);
    } finally {
      setLoading("");
    }
  }

  return (
    <>
      <section className="card premium-hero">
        <p className="label">Discípulo Premium</p>
        <h2>Approfunde sua caminhada com Deus</h2>
        <p className="muted">
          Plano atual: <strong className="premium-accent">{label}</strong>
        </p>
        {premium && (
          <p className="success">Você tem acesso a todos os recursos Premium ✨</p>
        )}
      </section>

      {!premium && (
        <section className="card">
          <h3>🎁 Trial gratuito — 7 dias</h3>
          <p className="muted">Experimente tudo sem compromisso. Sem cartão de crédito no modo demo.</p>
          <button
            type="button"
            disabled={loading || state.trialUsed}
            onClick={handleStartTrial}
          >
            {state.trialUsed ? "Trial já utilizado" : loading === "trial" ? "Ativando..." : "Começar trial grátis"}
          </button>
        </section>
      )}

      <section className="card">
        <h3>✨ O que o Premium inclui</h3>
        <div className="premium-features">
          {getPremiumFeatures().map((feature) => (
            <article key={feature.title} className="premium-feature">
              <span>{feature.icon}</span>
              <div>
                <strong>{feature.title}</strong>
                <p className="muted small">{feature.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {!premium && (
        <section className="card pricing-card">
          <h3>💳 Escolha seu plano</h3>

          <article className="price-option">
            <div>
              <h4>Mensal</h4>
              <p className="muted">Flexível, cancele quando quiser</p>
            </div>
            <p className="price-tag">R$ {PRICING.monthly.toFixed(2).replace(".", ",")}<small>/mês</small></p>
            <button type="button" disabled={!!loading} onClick={() => handleSubscribe("monthly")}>
              {loading === "monthly" ? "Processando..." : "Assinar mensal"}
            </button>
          </article>

          <article className="price-option price-option--highlight">
            <span className="badge">Melhor valor</span>
            <div>
              <h4>Anual</h4>
              <p className="muted">Economize ~30% em relação ao mensal</p>
            </div>
            <p className="price-tag">R$ {PRICING.annual.toFixed(2).replace(".", ",")}<small>/ano</small></p>
            <button type="button" disabled={!!loading} onClick={() => handleSubscribe("annual")}>
              {loading === "annual" ? "Processando..." : "Assinar anual"}
            </button>
          </article>
        </section>
      )}

      {premium && (
        <section className="card">
          <h3>🚀 Seu acesso Premium</h3>
          <ul className="feature-list">
            <li>🤖 IA ilimitada ativa</li>
            <li>📚 Planos exclusivos desbloqueados</li>
            <li>☁️ Backup automático na nuvem</li>
            <li>📊 <Link to="/relatorios">Relatórios detalhados</Link></li>
          </ul>
        </section>
      )}

      {message && <p className="success card">{message}</p>}
      {error && <p className="error card">{error}</p>}

      <p className="muted small center-text">
        Pagamentos reais via Stripe (quando configurado). Modo demo ativa Premium localmente para testes.
      </p>
    </>
  );
}
