import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { completeOnboarding, getPrayerGoalMinutes } from "../lib/storage.js";

const GOAL_OPTIONS = [5, 10, 15, 20, 30];

export default function OnboardingOverlay({ onComplete }) {
  const { refreshLocalUser } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [goal, setGoal] = useState(getPrayerGoalMinutes());

  function finish() {
    const safeName = name.trim() || "Discípulo";
    const safeGoal = Math.min(180, Math.max(1, Number(goal) || 15));
    completeOnboarding(safeName, safeGoal);
    refreshLocalUser();
    onComplete();
  }

  return (
    <div className="overlay">
      <section className="card modal-card">
        <div className="step-dots">
          {[1, 2, 3].map((dot) => (
            <span key={dot} className={`step-dot${step === dot ? " active" : ""}`} />
          ))}
        </div>

        {step === 1 && (
          <>
            <p className="label">Bem-vindo ao Discípulo</p>
            <h2>Seu companheiro diário com Deus</h2>
            <p className="muted">Devocional, oração, Bíblia e crescimento espiritual — um passo de cada vez.</p>
            <label htmlFor="onboardingName">Como você se chama?</label>
            <input
              id="onboardingName"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu primeiro nome"
            />
            <button type="button" onClick={() => {
              if (name.trim().length < 2) {
                alert("Digite seu nome (mínimo 2 caracteres).");
                return;
              }

              setStep(2);
            }}
            >
              Continuar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="label">Devocional personalizado</p>
            <h2>Conte como está seu dia</h2>
            <p className="muted">Seu devocional será montado a partir do que você compartilhar. Prefere não falar? Use o devocional padrão do dia.</p>
            <ul className="feature-list">
              <li>✍️ Escreva livremente</li>
              <li>📖 Leitura bíblica integrada</li>
              <li>⏭️ Opção &quot;Agora não&quot;</li>
            </ul>
            <div className="row-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Voltar</button>
              <button type="button" onClick={() => setStep(3)}>Entendi</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="label">Meta de oração</p>
            <h2>Quanto tempo quer orar por dia?</h2>
            <div className="goal-options">
              {GOAL_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`goal-btn${Number(goal) === option ? " active" : ""}`}
                  onClick={() => setGoal(option)}
                >
                  {option} min
                </button>
              ))}
            </div>
            <label htmlFor="onboardingGoal">Ou defina outro valor</label>
            <input
              id="onboardingGoal"
              type="number"
              min="1"
              max="180"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            />
            <div className="row-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>Voltar</button>
              <button type="button" onClick={finish}>Começar minha caminhada</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
