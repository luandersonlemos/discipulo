import { useEffect, useState } from "react";
import {
  BIBLE_BOOKS,
  BIBLE_VERSION_LABEL,
  fetchPassage,
  renderVersesHtml
} from "legacy:bible.js";

export default function BiblePage() {
  const [book, setBook] = useState(BIBLE_BOOKS[0].name);
  const [chapter, setChapter] = useState(1);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chapters = BIBLE_BOOKS.find((item) => item.name === book)?.chapters || 1;

  useEffect(() => {
    if (chapter > chapters) {
      setChapter(1);
    }
  }, [book, chapter, chapters]);

  async function loadChapter() {
    setLoading(true);
    setError("");

    try {
      const data = await fetchPassage(`${book} ${chapter}`);
      setHtml(renderVersesHtml(data, { interactive: false }));
    } catch {
      setError("Não foi possível carregar este capítulo.");
      setHtml("");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadChapter();
  }, [book, chapter]);

  return (
    <>
      <section className="card">
        <h2>📖 Bíblia</h2>
        <p className="muted">Versão: {BIBLE_VERSION_LABEL}</p>
        <div className="select-row">
          <select value={book} onChange={(event) => setBook(event.target.value)}>
            {BIBLE_BOOKS.map((item) => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
          <select value={chapter} onChange={(event) => setChapter(Number(event.target.value))}>
            {Array.from({ length: chapters }, (_, index) => index + 1).map((value) => (
              <option key={value} value={value}>Cap. {value}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={loadChapter} disabled={loading}>
          {loading ? "Carregando..." : "Recarregar capítulo"}
        </button>
      </section>

      <section className="card">
        <h3>{book} {chapter}</h3>
        {error && <p className="error">{error}</p>}
        {!error && (
          <div className="bible-passage" dangerouslySetInnerHTML={{ __html: html || "<p>Carregando...</p>" }} />
        )}
      </section>
    </>
  );
}
