import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  downloadBackup,
  getLatestCloudBackup,
  restoreBackup,
  saveCloudBackup
} from "../lib/backup.js";
import {
  getNotificationSettings,
  requestNotificationPermission,
  saveNotificationSettings,
  startNotificationScheduler
} from "../lib/notifications.js";
import { isPremium, getSubscriptionLabel, getSubscriptionState } from "../lib/subscription.js";
import { syncWithCloud } from "../lib/sync.js";
import { isSupabaseConfigured } from "../lib/supabase.js";

export default function SettingsPage() {
  const { user, devMode } = useAuth();
  const [settings, setSettings] = useState(getNotificationSettings());
  const [syncStatus, setSyncStatus] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [backupStatus, setBackupStatus] = useState("");
  const subLabel = getSubscriptionLabel(getSubscriptionState());
  const premium = isPremium();

  useEffect(() => {
    return startNotificationScheduler();
  }, []);

  async function enableNotifications() {
    try {
      const permission = await requestNotificationPermission();
      setSettings(getNotificationSettings());

      if (permission !== "granted") {
        alert("Permissão de notificação negada.");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function updateSetting(key, value) {
    saveNotificationSettings({ [key]: value });
    setSettings(getNotificationSettings());
  }

  async function handleSync() {
    if (!user?.id || devMode) {
      alert("Faça login com Supabase para sincronizar na nuvem.");
      return;
    }

    setSyncing(true);
    setSyncStatus("Sincronizando...");

    try {
      await syncWithCloud(user.id);
      setSyncStatus("Sincronizado com sucesso!");
    } catch {
      setSyncStatus("Erro ao sincronizar. Tente novamente.");
    } finally {
      setSyncing(false);
    }
  }

  async function handleCloudBackup() {
    if (!premium) {
      alert("Backup automático na nuvem é exclusivo Premium.");
      return;
    }

    if (!user?.id) {
      alert("Faça login para salvar backup na nuvem.");
      return;
    }

    setBackupStatus("Salvando backup...");

    try {
      await saveCloudBackup(user.id);
      setBackupStatus("Backup salvo na nuvem!");
    } catch {
      setBackupStatus("Erro ao salvar backup.");
    }
  }

  async function handleRestoreCloud() {
    if (!user?.id) {
      return;
    }

    setBackupStatus("Buscando backup...");

    try {
      const latest = await getLatestCloudBackup(user.id);

      if (!latest?.backup_data?.data) {
        setBackupStatus("Nenhum backup na nuvem encontrado.");
        return;
      }

      const data = latest.backup_data.data;

      if (data.userName) localStorage.setItem("userName", data.userName);
      if (data.onboardingCompleted) localStorage.setItem("onboardingCompleted", "true");
      if (data.prayerGoalMinutes) localStorage.setItem("prayerGoalMinutes", String(data.prayerGoalMinutes));
      if (data.completedDays) localStorage.setItem("completedDays", JSON.stringify(data.completedDays));
      if (data.journals) localStorage.setItem("journals", JSON.stringify(data.journals));
      if (data.prayers) localStorage.setItem("prayers", JSON.stringify(data.prayers));
      if (data.prayerSessions) localStorage.setItem("prayerSessions", JSON.stringify(data.prayerSessions));
      if (data.spiritualProgress) localStorage.setItem("spiritualProgress", JSON.stringify(data.spiritualProgress));
      if (data.reflections) localStorage.setItem("reflections", JSON.stringify(data.reflections));
      if (data.aiHistory) localStorage.setItem("aiHistory", JSON.stringify(data.aiHistory));
      if (data.favoriteVerses) localStorage.setItem("favoriteVerses", JSON.stringify(data.favoriteVerses));
      if (data.currentPlan) localStorage.setItem("currentPlan", JSON.stringify(data.currentPlan));
      if (data.bibleChaptersRead) localStorage.setItem("bibleChaptersRead", JSON.stringify(data.bibleChaptersRead));
      if (data.subscription) localStorage.setItem("subscription", JSON.stringify(data.subscription));
      if (data.notificationSettings) localStorage.setItem("notificationSettings", JSON.stringify(data.notificationSettings));
      if (data.todayMoment) localStorage.setItem("todayMoment", JSON.stringify(data.todayMoment));

      setBackupStatus(`Backup restaurado (${new Date(latest.created_at).toLocaleDateString("pt-BR")}). Recarregue a página.`);
    } catch {
      setBackupStatus("Erro ao restaurar backup.");
    }
  }

  function handleImportBackup(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    restoreBackup(file)
      .then(() => {
        setBackupStatus("Backup importado! Recarregue a página.");
      })
      .catch((error) => {
        setBackupStatus(error.message);
      });
  }

  return (
    <>
      <section className="card">
        <h3>⭐ Assinatura</h3>
        <p>Plano atual: <strong>{subLabel}</strong></p>
        {!premium && (
          <Link to="/premium" className="premium-cta">Conhecer o Premium</Link>
        )}
        {premium && (
          <Link to="/relatorios" className="link-button">Ver relatórios detalhados</Link>
        )}
      </section>

      <section className="card">
        <h3>🔔 Notificações</h3>
        <p className="muted">Lembretes matinais e alerta quando sua sequência está em risco.</p>

        <div className="settings-row">
          <span>Status</span>
          <strong>{settings.enabled ? "Ativadas" : "Desativadas"}</strong>
        </div>

        {!settings.enabled && (
          <button type="button" onClick={enableNotifications}>
            Ativar notificações
          </button>
        )}

        <label className="settings-field">
          Lembrete matinal
          <input
            type="time"
            value={settings.morningTime}
            onChange={(event) => updateSetting("morningTime", event.target.value)}
            disabled={!settings.enabled}
          />
        </label>

        <label className="settings-field">
          Lembrete noturno (streak)
          <input
            type="time"
            value={settings.eveningTime}
            onChange={(event) => updateSetting("eveningTime", event.target.value)}
            disabled={!settings.enabled}
          />
        </label>

        <label className="settings-checkbox">
          <input
            type="checkbox"
            checked={settings.streakReminder}
            onChange={(event) => updateSetting("streakReminder", event.target.checked)}
            disabled={!settings.enabled}
          />
          Avisar quando a sequência estiver em risco
        </label>
      </section>

      <section className="card">
        <h3>☁️ Sincronização e backup</h3>
        <p className="muted">
          {devMode || !isSupabaseConfigured
            ? "Modo local — dados apenas neste navegador."
            : "Premium: backup automático na nuvem a cada sincronização."}
        </p>

        <button type="button" className="btn-secondary" onClick={downloadBackup}>
          Exportar backup (JSON)
        </button>

        <label className="settings-field">
          Importar backup
          <input type="file" accept=".json,application/json" onChange={handleImportBackup} />
        </label>

        {!devMode && isSupabaseConfigured && (
          <>
            <button type="button" disabled={syncing} onClick={handleSync}>
              {syncing ? "Sincronizando..." : "Sincronizar agora"}
            </button>
            {premium && (
              <>
                <button type="button" className="btn-secondary" onClick={handleCloudBackup}>
                  Salvar backup na nuvem
                </button>
                <button type="button" className="btn-secondary" onClick={handleRestoreCloud}>
                  Restaurar da nuvem
                </button>
              </>
            )}
          </>
        )}
        {syncStatus && <p className="muted small">{syncStatus}</p>}
        {backupStatus && <p className="muted small">{backupStatus}</p>}
      </section>

      <section className="card">
        <h3>🤖 IA</h3>
        <p className="muted">
          {premium
            ? "IA ilimitada ativa no seu plano Premium."
            : "5 perguntas por dia no plano gratuito. Premium = ilimitado."}
        </p>
      </section>
    </>
  );
}
