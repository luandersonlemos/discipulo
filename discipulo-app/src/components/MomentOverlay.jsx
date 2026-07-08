import { useState } from "react";
import { momentHintExamples } from "legacy:moments.js";
import { saveMomentFromText, saveSkippedMoment } from "../lib/devotional.js";
import { writeJson } from "../lib/storage.js";

export default function MomentOverlay({ onClose, onSaved }) {
  const [text, setText] = useState("");

  function savePersonalized() {
    const userText = text.trim();

    if (userText.length < 8) {
      alert("Escreva um pouco mais sobre como está seu dia (mínimo 8 caracteres).");
      return;
    }

    writeJson("todayMoment", saveMomentFromText(userText));
    onSaved();
    onClose();
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
        <p className="muted">Escreva com suas palavras. Seu devocional será montado a partir do que você compartilhar.</p>
        <textarea
          rows={4}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Ex: Acordei cansado, preocupado com contas..."
        />
        <button type="button" onClick={savePersonalized}>Montar meu devocional</button>
        <button type="button" className="btn-secondary" onClick={skip}>Agora não</button>
        <p className="muted small">Sem problema — você verá o devocional padrão do dia.</p>
        <p className="muted small">Precisa de inspiração? Toque para preencher:</p>
        <div className="hint-row">
          {momentHintExamples.map((hint) => (
            <button key={hint} type="button" className="hint-btn" onClick={() => setText(hint)}>
              {hint.slice(0, 42)}…
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
