import { useState } from "react";
import { getTodayDevotional } from "../lib/devotional.js";
import { getTodayReflection, saveReflection } from "../lib/storage.js";

const REFLECTION_LABELS = {
  yes: "Que bom! Continue firme na prática.",
  partial: "Um passo de cada vez. Amanhã é nova chance.",
  no: "Não desanime. A graça de Deus te sustenta amanhã."
};

const OPTIONS = [
  { value: "yes", label: "Sim" },
  { value: "partial", label: "Parcialmente" },
  { value: "no", label: "Ainda não" }
];

export default function ReflectionCard({ onSaved }) {
  const [todayReflection, setTodayReflection] = useState(getTodayReflection());
  const devotional = getTodayDevotional();

  function handleSelect(result) {
    saveReflection(result, devotional.challenge);
    setTodayReflection(getTodayReflection());
    onSaved?.();
  }

  return (
    <section className="card evening-card">
      <h3>🌙 Como foi seu dia?</h3>
      <p className="muted">Você conseguiu viver o desafio de hoje?</p>
      <div className="reflection-options">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`reflection-btn${todayReflection?.result === option.value ? " active" : ""}`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {todayReflection && (
        <p className="reflection-status muted">
          {REFLECTION_LABELS[todayReflection.result] || ""}
        </p>
      )}
    </section>
  );
}
