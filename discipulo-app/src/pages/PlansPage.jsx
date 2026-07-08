import { useState } from "react";
import { Link } from "react-router-dom";
import {
  plans,
  getCurrentPlan,
  getPlanProgress,
  isPlanLocked,
  saveCurrentPlan
} from "../lib/plans.js";

const CATEGORY_LABELS = {
  evangelho: "Evangelho",
  oracao: "Oração",
  tematico: "Temático",
  premium: "Premium"
};

export default function PlansPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  void refreshKey;

  const currentPlan = getCurrentPlan();
  const planProgress = getPlanProgress(currentPlan);
  const freePlans = plans.filter((p) => !p.isPremium);
  const premiumPlans = plans.filter((p) => p.isPremium);

  function selectPlan(plan) {
    if (isPlanLocked(plan)) {
      return;
    }

    saveCurrentPlan(plan.id);
    setRefreshKey((value) => value + 1);
  }

  function renderPlanCard(plan) {
    const isSelected = currentPlan?.id === plan.id;
    const locked = isPlanLocked(plan);

    return (
      <article key={plan.id} className={`plan-card${locked ? " plan-card--locked" : ""}`}>
        <div className="plan-card-header">
          <h4>{plan.title}</h4>
          <span className={`badge${plan.isPremium ? " badge--premium" : ""}`}>
            {locked ? "🔒 Premium" : CATEGORY_LABELS[plan.category] || plan.category}
          </span>
        </div>
        <p>{plan.description}</p>
        <small className="muted">{plan.days} dias</small>
        {locked ? (
          <Link to="/premium" className="premium-cta">Desbloquear com Premium</Link>
        ) : (
          <button
            type="button"
            disabled={isSelected}
            onClick={() => selectPlan(plan)}
          >
            {isSelected ? "Plano selecionado" : "Escolher plano"}
          </button>
        )}
      </article>
    );
  }

  return (
    <>
      <section className="card">
        <h3>📚 Plano atual</h3>
        {!currentPlan ? (
          <p className="muted">Nenhum plano selecionado ainda.</p>
        ) : (
          <>
            <p>{currentPlan.title} — {planProgress.completed}/{planProgress.total} dias</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${planProgress.percentage}%` }} />
            </div>
            <p className="muted">{planProgress.percentage}% concluído</p>
          </>
        )}
      </section>

      <section className="card">
        <h3>🗺️ Planos gratuitos</h3>
        <div className="plans-list">
          {freePlans.map(renderPlanCard)}
        </div>
      </section>

      <section className="card">
        <h3>⭐ Planos exclusivos Premium</h3>
        <p className="muted">Estudos avançados para aprofundar sua fé.</p>
        <div className="plans-list">
          {premiumPlans.map(renderPlanCard)}
        </div>
      </section>
    </>
  );
}
