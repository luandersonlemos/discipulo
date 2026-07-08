import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import OnboardingOverlay from "../components/OnboardingOverlay.jsx";
import { getGreeting, getStreak } from "../lib/stats.js";
import { isOnboardingCompleted } from "../lib/storage.js";

const TABS = [
  { to: "/", label: "Início", end: true },
  { to: "/jornada", label: "Jornada" },
  { to: "/biblia", label: "Bíblia" }
];

export default function AppLayout() {
  const { user, signOut, devMode } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(!isOnboardingCompleted());
  const name = user?.user_metadata?.name || user?.email || "Discípulo";

  return (
    <div className="app-shell">
      <header className="header">
        <div>
          <p className="label">{getGreeting()}</p>
          <h1>Discípulo</h1>
        </div>
        <div className="header-actions">
          <span className="streak">🔥 {getStreak()}</span>
          <button type="button" className="btn-secondary header-btn" onClick={signOut}>Sair</button>
        </div>
      </header>

      {devMode && (
        <p className="dev-banner">Modo local — dados no navegador. Configure o Supabase no .env para login na nuvem.</p>
      )}

      <nav className="tabs">
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
        <Outlet context={{ userName: name }} />
      </main>

      {showOnboarding && (
        <OnboardingOverlay onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
