import { useMemo, useState } from "react";
import DevotionalPanel from "../components/DevotionalPanel.jsx";
import MomentOverlay from "../components/MomentOverlay.jsx";
import { getTodayDevotional } from "../lib/devotional.js";
import {
  getActiveSpiritualLevel,
  getGreeting,
  getLevelProgress,
  getStreak,
  WEEKDAYS
} from "../lib/stats.js";
import {
  getCompletedDays,
  getPrayerGoalMinutes,
  getTodayKey,
  getTodayMomentSelection,
  getTodayPrayerSeconds,
  getUserName,
  hasTodayMomentChoice,
  setUserName
} from "../lib/storage.js";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showMoment, setShowMoment] = useState(!hasTodayMomentChoice());
  const [showDevotional, setShowDevotional] = useState(false);

  const snapshot = useMemo(() => {
    void refreshKey;
    const devotional = getTodayDevotional();
    const activeLevel = getActiveSpiritualLevel();
    const levelProgress = getLevelProgress(activeLevel);
    const selection = getTodayMomentSelection();
    const prayerMinutes = Math.floor(getTodayPrayerSeconds() / 60);
    const completedToday = getCompletedDays().includes(getTodayKey());

    return {
      name: getUserName() || "Discípulo",
      greeting: getGreeting(),
      weekday: WEEKDAYS[new Date().getDay()],
      streak: getStreak(),
      devotional,
      selection,
      activeLevel,
      levelProgress,
      prayerMinutes,
      prayerGoal: getPrayerGoalMinutes(),
      completedToday
    };
  }, [refreshKey]);

  function refresh() {
    setRefreshKey((value) => value + 1);
  }

  function editName() {
    const nextName = window.prompt("Como você quer ser chamado?", snapshot.name)?.trim();

    if (nextName) {
      setUserName(nextName);
      refresh();
    }
  }

  return (
    <>
      {showMoment && (
        <MomentOverlay
          onClose={() => setShowMoment(false)}
          onSaved={() => {
            refresh();
            setShowDevotional(true);
          }}
        />
      )}

      <section className="card welcome-card">
        <p className="label">{snapshot.weekday}</p>
        <h2>{snapshot.greeting}, {snapshot.name} 👋</h2>
        <p className="muted">
          Você está há <strong>{snapshot.streak}</strong> dias caminhando com Deus.
        </p>
        <button type="button" className="link-button" onClick={editName}>Alterar nome</button>
      </section>

      <section className="journey-grid">
        <article className="journey-card journey-card--highlight">
          <span className="journey-icon">📖</span>
          <div>
            <p className="journey-label">Leitura de hoje</p>
            <strong>{snapshot.devotional.verse}</strong>
            <small>{snapshot.devotional.minutes || 8} minutos</small>
          </div>
        </article>

        <article className="journey-card">
          <span className="journey-icon">🙏</span>
          <div>
            <p className="journey-label">Tempo de oração</p>
            <strong>{snapshot.prayerMinutes} min</strong>
            <small>Meta: {snapshot.prayerGoal} min</small>
          </div>
        </article>

        <article className="journey-card">
          <span className="journey-icon">🎯</span>
          <div>
            <p className="journey-label">Missão do dia</p>
            <strong>{snapshot.devotional.challenge?.slice(0, 60) || "—"}…</strong>
          </div>
        </article>

        <article className="journey-card">
          <span className="journey-icon">🌱</span>
          <div>
            <p className="journey-label">Jornada espiritual</p>
            <strong>{snapshot.levelProgress.completed}/{snapshot.levelProgress.total} tópicos</strong>
            <small>Nível {snapshot.activeLevel.level} — {snapshot.activeLevel.title}</small>
          </div>
        </article>
      </section>

      <section className="card">
        <h3>📈 Seu crescimento</h3>
        <div className="growth-stats">
          <div><span>Devocionais</span><strong>{getCompletedDays().length}</strong></div>
          <div><span>Status hoje</span><strong>{snapshot.completedToday ? "Concluído" : "Pendente"}</strong></div>
        </div>
      </section>

      <p className="section-divider">Devocional de hoje</p>

      {!showDevotional && (
        <button type="button" onClick={() => {
          if (!hasTodayMomentChoice()) {
            setShowMoment(true);
            return;
          }

          setShowDevotional(true);
        }}
        >
          Começar devocional de hoje
        </button>
      )}

      {showDevotional && hasTodayMomentChoice() && (
        <>
          <button type="button" className="btn-secondary" onClick={() => setShowMoment(true)}>
            {snapshot.selection?.skipped ? "Personalizar meu devocional" : "Reescrever como estou hoje"}
          </button>
          <DevotionalPanel onRefresh={refresh} />
        </>
      )}
    </>
  );
}
