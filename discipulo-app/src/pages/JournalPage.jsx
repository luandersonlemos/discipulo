import { useState } from "react";
import { formatDate } from "../lib/format.js";
import { getJournals, saveJournal } from "../lib/storage.js";

export default function JournalPage() {
  const [text, setText] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  void refreshKey;

  const journals = getJournals();

  function handleSave() {
    const trimmed = text.trim();

    if (!trimmed) {
      alert("Escreva uma anotação antes de salvar.");
      return;
    }

    saveJournal(trimmed);
    setText("");
    setRefreshKey((value) => value + 1);
  }

  return (
    <>
      <section className="card">
        <h3>📝 Diário espiritual</h3>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="O que Deus falou com você hoje?"
        />
        <button type="button" onClick={handleSave}>Salvar anotação</button>
      </section>

      <section className="card">
        <h3>📔 Entradas recentes</h3>
        <ul className="list-plain">
          {journals.length === 0 ? (
            <li className="list-item">Nenhuma anotação ainda.</li>
          ) : (
            journals.slice(0, 10).map((journal) => (
              <li key={`${journal.date}-${journal.text.slice(0, 20)}`} className="list-item">
                {formatDate(journal.date)}: {journal.text}
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  );
}
