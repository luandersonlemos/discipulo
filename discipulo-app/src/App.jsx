import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import AiPage from "./pages/AiPage.jsx";
import BiblePage from "./pages/BiblePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import JournalPage from "./pages/JournalPage.jsx";
import JourneyPage from "./pages/JourneyPage.jsx";
import Login from "./pages/Login.jsx";
import PlansPage from "./pages/PlansPage.jsx";
import PrayerPage from "./pages/PrayerPage.jsx";
import PremiumPage from "./pages/PremiumPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import { isOnboardingCompleted } from "./lib/storage.js";

function ProtectedRoute({ children }) {
  const { user, loading, devMode } = useAuth();

  if (loading) {
    return (
      <div className="app-shell center">
        <p className="muted">Carregando Discípulo...</p>
      </div>
    );
  }

  if (!user) {
    if (devMode && !isOnboardingCompleted()) {
      return children;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-shell center">
        <p className="muted">Carregando Discípulo...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        element={(
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<DashboardPage />} />
        <Route path="jornada" element={<JourneyPage />} />
        <Route path="biblia" element={<BiblePage />} />
        <Route path="planos" element={<PlansPage />} />
        <Route path="ia" element={<AiPage />} />
        <Route path="diario" element={<JournalPage />} />
        <Route path="oracao" element={<PrayerPage />} />
        <Route path="historico" element={<HistoryPage />} />
        <Route path="relatorios" element={<ReportsPage />} />
        <Route path="premium" element={<PremiumPage />} />
        <Route path="config" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
