import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import OnboardingOverlay from "../components/OnboardingOverlay.jsx";
import InstallPrompt, { PremiumBadge } from "../components/InstallPrompt.jsx";
import { startNotificationScheduler } from "../lib/notifications.js";
import { getGreeting, getStreak } from "../lib/stats.js";
import { isOnboardingCompleted } from "../lib/storage.js";

const TABS = [
  { to: "/", label: "Início", end: true },
  { to: "/jornada", label: "Jornada" },
  { to: "/biblia", label: "Bíblia" },
  { to: "/planos", label: "Planos" },
  { to: "/ia", label: "IA" },
  { to: "/diario", label: "Diário" },
  { to: "/oracao", label: "Oração" },
  { to: "/historico", label: "Histórico" }
];

export default function AppLayout() {
  const { user, signOut, devMode, syncing } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(!isOnboardingCompleted());
  const name = user?.user_metadata?.name || user?.email || "Discípulo";

  useEffect(() => startNotificationScheduler(), []);

  return (
    <div className="app-shell">
      <header className="header">
        <div>
          <p className="label">{getGreeting()}</p>
          <h1>Discípulo</h1>
        </div>
        <div className="header-actions">
          <PremiumBadge />
          <span className="streak">🔥 {getStreak()}</span>
          <NavLink to="/config" className="btn-secondary header-btn settings-link" title="Configurações">
            ⚙️
          </NavLink>
          <button type="button" className="btn-secondary header-btn" onClick={signOut}>Sair</button>
        </div>
      </header>

      {syncing && (
        <p className="dev-banner">Sincronizando seus dados na nuvem...</p>
      )}

      {devMode && (
        <p className="dev-banner">Modo local — dados no navegador. Configure o Supabase no .env para login na nuvem.</p>
      )}

      <nav className="tabs tabs--scroll">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => `tab-button${isActive ? " active" : ""}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <main>
        <InstallPrompt />
        <Outlet context={{ userName: name }} />
      </main>

      {showOnboarding && (
        <OnboardingOverlay onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
