import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DevotionalPanel from "../components/DevotionalPanel.jsx";
import MomentOverlay from "../components/MomentOverlay.jsx";
import ReflectionCard from "../components/ReflectionCard.jsx";
import { getTodayDevotional, truncateText } from "../lib/devotional.js";
import { getPlanProgress, getTodayReadingLabel, getCurrentPlan } from "../lib/plans.js";
import { getBibleProgressPercent } from "../lib/bibleProgress.js";
import {
  getActiveSpiritualLevel,
  getGreeting,
  getLevelProgress,
  getStreak,
  WEEKDAYS
} from "../lib/stats.js";
import {
  getAnsweredPrayerCount,
  getCompletedDays,
  getJournals,
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
    const journals = getJournals();
    const latestJournal = journals[0];
    const planProgress = getPlanProgress(getCurrentPlan());
    const prayerGoal = getPrayerGoalMinutes();
    const prayerProgress = prayerGoal > 0
      ? Math.min(Math.round((getTodayPrayerSeconds() / (prayerGoal * 60)) * 100), 100)
      : 0;

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
      prayerGoal,
      prayerProgress,
      completedToday,
      journalsCount: journals.length,
      planProgress,
      answeredPrayers: getAnsweredPrayerCount(),
      biblePercent: getBibleProgressPercent(),
      todayReading: getTodayReadingLabel(),
      latestJournalPreview: latestJournal
        ? `${latestJournal.date === getTodayKey() ? "Hoje" : latestJournal.date}: "${truncateText(latestJournal.text, 60)}"`
        : null
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
        <Link to="/biblia" className="journey-card journey-card--highlight journey-card--clickable">
          <span className="journey-icon">📖</span>
          <div>
            <p className="journey-label">Leitura de hoje</p>
            <strong>{snapshot.todayReading}</strong>
            <small>{snapshot.devotional.minutes || 8} minutos</small>
          </div>
        </Link>

        <Link to="/oracao" className="journey-card journey-card--clickable">
          <span className="journey-icon">🙏</span>
          <div>
            <p className="journey-label">Tempo de oração</p>
            <strong>{snapshot.prayerMinutes} min</strong>
            <small>Meta: {snapshot.prayerGoal} min · {snapshot.prayerProgress}%</small>
          </div>
        </Link>

        <article className="journey-card">
          <span className="journey-icon">🎯</span>
          <div>
            <p className="journey-label">Missão do dia</p>
            <strong>{snapshot.devotional.challenge?.slice(0, 60) || "—"}…</strong>
          </div>
        </article>

        <Link to="/jornada" className="journey-card journey-card--clickable">
          <span className="journey-icon">🌱</span>
          <div>
            <p className="journey-label">Jornada espiritual</p>
            <strong>{snapshot.levelProgress.completed}/{snapshot.levelProgress.total} tópicos</strong>
            <small>Nível {snapshot.activeLevel.level} — {snapshot.activeLevel.title}</small>
          </div>
        </Link>
      </section>

      {snapshot.latestJournalPreview && (
        <section className="card journal-preview">
          <p className="muted">💬 {snapshot.latestJournalPreview}</p>
        </section>
      )}

      <section className="card">
        <h3>📈 Seu crescimento</h3>
        <div className="growth-stats growth-stats--quad">
          <div><span>Bíblia lida</span><strong>{snapshot.biblePercent}%</strong></div>
          <div><span>Plano atual</span><strong>{snapshot.planProgress.percentage}%</strong></div>
          <div><span>Devocionais</span><strong>{getCompletedDays().length}</strong></div>
          <div><span>Diário</span><strong>{snapshot.journalsCount}</strong></div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${snapshot.planProgress.percentage}%` }} />
        </div>
        <p className="muted small">
          Status hoje: {snapshot.completedToday ? "Concluído" : "Pendente"} · Pedidos respondidos: {snapshot.answeredPrayers}
        </p>
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

      {snapshot.completedToday && (
        <ReflectionCard onSaved={refresh} />
      )}
    </>
  );
}
