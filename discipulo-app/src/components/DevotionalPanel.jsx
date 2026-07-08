import { useEffect, useState } from "react";
import {
  BIBLE_VERSION_LABEL,
  fetchPassage,
  getHighlightedVerses,
  renderVersesHtml
} from "legacy:bible.js";
import { getTodayDevotional, truncateText } from "../lib/devotional.js";
import {
  getCompletedDays,
  getTodayKey,
  getTodayMomentSelection,
  writeJson
} from "../lib/storage.js";

export default function DevotionalPanel({ onRefresh }) {
  const selection = getTodayMomentSelection();
  const devotional = getTodayDevotional();
  const [passageHtml, setPassageHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const completed = getCompletedDays().includes(getTodayKey());

  useEffect(() => {
    let active = true;

    async function loadPassage() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchPassage(devotional.verse);
        if (!active) {
          return;
        }

        setPassageHtml(renderVersesHtml(data, {
          highlightedVerses: getHighlightedVerses(devotional.verse),
          interactive: false
        }));
      } catch {
        if (active) {
          setError(devotional.text || "Não foi possível carregar o texto bíblico.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPassage();

    return () => {
      active = false;
    };
  }, [devotional.verse, devotional.text]);

  function completeDevotional() {
    if (completed) {
      return;
    }

    const days = getCompletedDays();
    days.push(getTodayKey());
    writeJson("completedDays", days);
    onRefresh();
  }

  return (
    <section className="card devotional-card">
      <p className="label">
        {selection?.skipped ? "Devocional do dia" : "Devocional montado para você"}
      </p>

      {selection?.userText && (
        <p className="moment-badge">💬 &quot;{truncateText(selection.userText, 80)}&quot;</p>
      )}

      <h3>{devotional.title}</h3>
      <p className="verse-ref">{devotional.verse}</p>

      <div className="devotional-section">
        <strong>Resumo</strong>
        <p>{devotional.summary}</p>
      </div>

      <div className="devotional-section">
        <strong>Contexto</strong>
        <p>{devotional.context}</p>
      </div>

      <div className="devotional-section">
        <strong>Leitura bíblica</strong>
        <p className="muted small">{BIBLE_VERSION_LABEL}</p>
        {loading && <p className="muted">Carregando Escrituras...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <div className="bible-passage" dangerouslySetInnerHTML={{ __html: passageHtml }} />
        )}
      </div>

      <div className="devotional-section">
        <strong>Aplicação</strong>
        <p>{devotional.application}</p>
      </div>

      <div className="devotional-section">
        <strong>Oração</strong>
        <p>{devotional.prayer}</p>
      </div>

      <div className="devotional-section">
        <strong>Desafio do dia</strong>
        <p>{devotional.challenge}</p>
      </div>

      <button type="button" disabled={completed} onClick={completeDevotional}>
        {completed ? "Devocional concluído hoje ✔" : "Concluir devocional de hoje"}
      </button>
    </section>
  );
}
