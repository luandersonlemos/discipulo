import { useState } from "react";
import usePrayerTimer from "../hooks/usePrayerTimer.js";
import { formatDate, formatMinutesLabel } from "../lib/format.js";
import {
  getPrayers,
  savePrayer,
  togglePrayerAnswered
} from "../lib/storage.js";

export default function PrayerPage() {
  const [prayerText, setPrayerText] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  void refreshKey;

  const timer = usePrayerTimer(() => setRefreshKey((value) => value + 1));
  const prayers = getPrayers();

  function handleSavePrayer() {
    const trimmed = prayerText.trim();

    if (!trimmed) {
      alert("Escreva um pedido antes de salvar.");
      return;
    }

    savePrayer(trimmed);
    setPrayerText("");
    setRefreshKey((value) => value + 1);
  }

  function handleSaveGoal() {
    try {
      const goal = Number(goalInput || timer.goalMinutes);

      if (!goal || goal < 1 || goal > 180) {
        alert("Informe uma meta entre 1 e 180 minutos.");
        return;
      }

      timer.updateGoal(goal);
      setGoalInput("");
      setRefreshKey((value) => value + 1);
    } catch {
      alert("Não foi possível salvar a meta.");
    }
  }

  function handleSaveTimer() {
    try {
      timer.saveSession();
      setRefreshKey((value) => value + 1);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <section className="card timer-card">
        <h3>⏱️ Cronômetro de oração</h3>
        <p className="timer-display">{timer.timerDisplay}</p>
        <p className="muted">{timer.timerSummary}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${timer.progress}%` }} />
        </div>
        <div className="timer-actions">
          <button type="button" disabled={timer.running} onClick={timer.start}>
            {timer.startLabel}
          </button>
          <button type="button" className="btn-secondary" disabled={!timer.running} onClick={timer.pause}>
            Pausar
          </button>
          <button
            type="button"
            className="btn-secondary"
            disabled={!timer.running && !timer.hasElapsed}
            onClick={handleSaveTimer}
          >
            Salvar tempo
          </button>
        </div>
        <div className="timer-goal-row">
          <label htmlFor="prayerGoalInput">Meta diária (minutos)</label>
          <div className="timer-goal-controls">
            <input
              id="prayerGoalInput"
              type="number"
              min="1"
              max="180"
              value={goalInput || timer.goalMinutes}
              onChange={(event) => setGoalInput(event.target.value)}
            />
            <button type="button" className="btn-secondary" onClick={handleSaveGoal}>
              Salvar meta
            </button>
          </div>
        </div>
        {timer.sessions.length > 0 && (
          <ul className="timer-history">
            {timer.sessions.slice(0, 5).map((session) => (
              <li key={session.id}>
                {formatDate(session.date)}: {formatMinutesLabel(session.durationSeconds)} de oração
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h3>🙏 Pedido de oração</h3>
        <input
          type="text"
          value={prayerText}
          onChange={(event) => setPrayerText(event.target.value)}
          placeholder="Pelo que você quer orar?"
        />
        <button type="button" onClick={handleSavePrayer}>Salvar pedido</button>
      </section>

      <section className="card">
        <h3>📌 Meus pedidos</h3>
        <ul className="list-plain">
          {prayers.length === 0 ? (
            <li className="list-item">Nenhum pedido de oração ainda.</li>
          ) : (
            prayers.map((prayer) => (
              <li key={prayer.id} className="prayer-item">
                <span>{prayer.answered ? `✅ ${prayer.text}` : prayer.text}</span>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    togglePrayerAnswered(prayer.id);
                    setRefreshKey((value) => value + 1);
                  }}
                >
                  {prayer.answered ? "Reabrir" : "Respondida"}
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  );
}
