import { useState } from "react";
import { momentHintExamples } from "legacy:moments.js";
import { saveMomentFromText, saveSkippedMoment } from "../lib/devotional.js";
import { generateDevotionalFromUserText } from "../lib/generateDevotional.js";
import { writeJson } from "../lib/storage.js";

export default function MomentOverlay({ onClose, onSaved }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function savePersonalized() {
    const userText = text.trim();

    if (userText.length < 8) {
      setError("Escreva um pouco mais sobre como está seu dia (mínimo 8 caracteres).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { devotional, source } = await generateDevotionalFromUserText(userText);
      writeJson("todayMoment", saveMomentFromText(userText, devotional, source));
      onSaved();
      onClose();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setLoading(false);
    }
  }

  function skip() {
    writeJson("todayMoment", saveSkippedMoment());
    onSaved();
    onClose();
  }

  return (
    <div className="overlay">
      <section className="card modal-card">
        <p className="label">Devocional personalizado</p>
        <h2>Como está seu dia?</h2>
        <p className="muted">
          Escreva com suas palavras — qualquer coisa. A IA vai entender seu momento e montar um devocional só para você.
        </p>
        <textarea
          rows={4}
          value={text}
          disabled={loading}
          onChange={(event) => setText(event.target.value)}
          placeholder="Ex: Acordei cansado, preocupado com contas, brigamos ontem..."
        />
        {error && <p className="error">{error}</p>}
        <button type="button" disabled={loading} onClick={savePersonalized}>
          {loading ? "Montando seu devocional..." : "Montar meu devocional"}
        </button>
        <button type="button" className="btn-secondary" disabled={loading} onClick={skip}>
          Agora não
        </button>
        <p className="muted small">Sem problema — você verá o devocional padrão do dia.</p>
        <p className="muted small">Precisa de inspiração? Toque para preencher:</p>
        <div className="hint-row">
          {momentHintExamples.map((hint) => (
            <button
              key={hint}
              type="button"
              className="hint-btn"
              disabled={loading}
              onClick={() => setText(hint)}
            >
              {hint.slice(0, 42)}…
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
