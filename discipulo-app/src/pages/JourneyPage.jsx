import { useState } from "react";
import { spiritualLevels } from "legacy:journey.js";
import {
  getActiveSpiritualLevel,
  getLevelProgress,
  isLevelAccessible,
  isTopicCompleted
} from "../lib/stats.js";
import { getSpiritualProgress, getTodayKey, writeJson } from "../lib/storage.js";

export default function JourneyPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  void refreshKey;

  const progress = getSpiritualProgress();
  const activeLevel = getActiveSpiritualLevel(progress);
  const activeProgress = getLevelProgress(activeLevel, progress);

  function completeTopic(topicId) {
    if (isTopicCompleted(topicId, progress)) {
      return;
    }

    progress.push({ topicId, completedAt: getTodayKey() });
    writeJson("spiritualProgress", progress);
    setRefreshKey((value) => value + 1);
  }

  return (
    <>
      <section className="card">
        <p className="label">Jornada espiritual</p>
        <h2>Nível {activeLevel.level} — {activeLevel.title}</h2>
        <p className="muted">{activeLevel.description}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${activeProgress.percentage}%` }} />
        </div>
        <p className="muted">{activeProgress.completed}/{activeProgress.total} tópicos · {activeProgress.percentage}%</p>
      </section>

      {spiritualLevels.map((level) => {
        const locked = !isLevelAccessible(level, progress);
        const levelProgress = getLevelProgress(level, progress);

        return (
          <section key={level.level} className={`card${locked ? " locked-card" : ""}`}>
            <div className="level-header">
              <h3>Nível {level.level} — {level.title}</h3>
              <span className="badge">
                {locked ? "🔒 Bloqueado" : `${levelProgress.completed}/${levelProgress.total}`}
              </span>
            </div>
            <p className="muted">{level.description}</p>

            {locked && <p className="muted">Conclua o nível anterior para desbloquear.</p>}

            {!locked && level.topics.map((topic) => {
              const done = isTopicCompleted(topic.id, progress);

              return (
                <article key={topic.id} className={`topic-card${done ? " done" : ""}`}>
                  <div className="topic-header">
                    <div>
                      <h4>{topic.title}</h4>
                      <p className="verse-ref">{topic.verse}</p>
                    </div>
                    <span>{done ? "✔ Concluído" : "Pendente"}</span>
                  </div>
                  <p>{topic.summary}</p>
                  <details>
                    <summary>Ler estudo</summary>
                    <p><strong>Estudo</strong><br />{topic.study}</p>
                    <p><strong>Aplicação</strong><br />{topic.application}</p>
                    <p><strong>Desafio</strong><br />{topic.challenge}</p>
                  </details>
                  <button type="button" disabled={done} onClick={() => completeTopic(topic.id)}>
                    {done ? "Concluído" : "Marcar como concluído"}
                  </button>
                </article>
              );
            })}
          </section>
        );
      })}
    </>
  );
}
