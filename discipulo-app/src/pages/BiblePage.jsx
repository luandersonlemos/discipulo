import { useEffect, useRef, useState } from "react";
import {
  BIBLE_BOOKS,
  BIBLE_VERSION_LABEL,
  buildVerseReference,
  cleanVerseText,
  fetchPassage,
  getBookByName,
  getHighlightedVerses,
  parseReference,
  renderVersesHtml
} from "legacy:bible.js";
import { getTodayReadingLabel } from "../lib/plans.js";
import { markChapterRead, parseChapterReference } from "../lib/bibleProgress.js";
import {
  getFavoriteReferenceSet,
  getFavoriteVerses,
  isVerseFavorited,
  removeFavoriteVerse,
  toggleFavoriteVerse
} from "../lib/storage.js";

const BIBLE_SEARCH_MAX_RESULTS = 30;

function looksLikeReference(query) {
  return /\d/.test(query) && parseReference(query);
}

async function searchKeywordInBook(bookName, keyword, results, searchToken, updateProgress) {
  const book = getBookByName(bookName);

  if (!book) {
    return;
  }

  for (let chapter = 1; chapter <= book.chapters; chapter += 1) {
    if (searchToken.cancelled || results.length >= BIBLE_SEARCH_MAX_RESULTS) {
      return;
    }

    updateProgress(bookName, chapter, book.chapters, results.length);

    try {
      const data = await fetchPassage(`${bookName} ${chapter}`);

      data.verses.forEach((verse) => {
        const verseText = cleanVerseText(verse.text);

        if (verseText.toLowerCase().includes(keyword) && results.length < BIBLE_SEARCH_MAX_RESULTS) {
          results.push({
            reference: buildVerseReference(data.book_name || bookName, chapter, verse.verse),
            text: verseText
          });
        }
      });
    } catch {
      // skip failed chapters
    }
  }
}

async function shareVerse(reference, text) {
  const shareText = `"${text}" — ${reference} (${BIBLE_VERSION_LABEL})\n\nCompartilhado via Discípulo`;

  if (navigator.share) {
    try {
      await navigator.share({ title: reference, text: shareText });
      return;
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    alert("Versículo copiado! Cole onde quiser compartilhar.");
  } catch {
    window.prompt("Copie o versículo:", shareText);
  }
}

export default function BiblePage() {
  const searchTokenRef = useRef({ cancelled: false });
  const passageRef = useRef(null);

  const [book, setBook] = useState(BIBLE_BOOKS[0].name);
  const [chapter, setChapter] = useState(1);
  const [passageTitle, setPassageTitle] = useState("Selecione uma passagem");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favoritesKey, setFavoritesKey] = useState(0);
  void favoritesKey;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchAllBooks, setSearchAllBooks] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchProgress, setSearchProgress] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const chapters = BIBLE_BOOKS.find((item) => item.name === book)?.chapters || 1;
  const favorites = getFavoriteVerses();

  useEffect(() => {
    if (chapter > chapters) {
      setChapter(1);
    }
  }, [book, chapter, chapters]);

  function attachVerseHandlers(container) {
    container.querySelectorAll(".verse-favorite-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleFavoriteVerse(button.dataset.reference, button.dataset.text);
        setFavoritesKey((value) => value + 1);
        loadChapter(passageTitle, { silent: true });
      });
    });

    container.querySelectorAll(".verse-share-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        shareVerse(button.dataset.reference, button.dataset.text);
      });
    });
  }

  async function loadChapter(reference, options = {}) {
    const { highlightReference = reference, silent = false } = options;

    if (!silent) {
      setLoading(true);
      setError("");
    }

    try {
      const data = await fetchPassage(reference);
      const rendered = renderVersesHtml(data, {
        highlightedVerses: getHighlightedVerses(highlightReference),
        interactive: true,
        favoriteReferences: getFavoriteReferenceSet()
      });

      setPassageTitle(data.reference || reference);
      setHtml(rendered);

      const parsed = parseChapterReference(data.reference || reference);
      if (parsed) {
        markChapterRead(parsed.book, parsed.chapter);
      }

      window.requestAnimationFrame(() => {
        if (passageRef.current) {
          attachVerseHandlers(passageRef.current);
        }
      });
    } catch {
      if (!silent) {
        setError("Não foi possível carregar este capítulo.");
        setHtml("");
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    loadChapter(`${book} ${chapter}`);
  }, [book, chapter]);

  function openReference(reference) {
    const parsed = parseReference(reference);

    if (parsed) {
      setBook(parsed.book);
      setChapter(parsed.chapter);
      loadChapter(reference, { highlightReference: reference });
      return;
    }

    loadChapter(reference, { highlightReference: reference });
  }

  function loadTodayReading() {
    openReference(getTodayReadingLabel());
  }

  async function searchBible() {
    const query = searchQuery.trim();

    if (!query) {
      alert("Digite uma palavra ou referência para buscar.");
      return;
    }

    if (looksLikeReference(query)) {
      openReference(query);
      return;
    }

    searchTokenRef.current.cancelled = true;
    const token = { cancelled: false };
    searchTokenRef.current = token;

    const keyword = query.toLowerCase();
    const results = [];
    setSearchLoading(true);
    setSearchResults([]);
    setSearchProgress(`Buscando "${query}"...`);

    const updateProgress = (currentBook, currentChapter, totalChapters, foundCount) => {
      if (searchAllBooks) {
        setSearchProgress(
          `Buscando "${query}" em toda a Bíblia... ${currentBook} ${currentChapter}/${totalChapters} · ${foundCount} resultado(s)`
        );
        return;
      }

      setSearchProgress(`Buscando "${query}" em ${currentBook}... capítulo ${currentChapter}/${totalChapters}`);
    };

    if (searchAllBooks) {
      for (const bibleBook of BIBLE_BOOKS) {
        if (token.cancelled || results.length >= BIBLE_SEARCH_MAX_RESULTS) {
          break;
        }

        await searchKeywordInBook(bibleBook.name, keyword, results, token, updateProgress);
      }
    } else {
      await searchKeywordInBook(book, keyword, results, token, updateProgress);
    }

    if (token.cancelled) {
      return;
    }

    setSearchLoading(false);
    setSearchResults(results);
    setSearchProgress(
      results.length === 0
        ? searchAllBooks
          ? `Nenhum resultado para "${query}" na Bíblia.`
          : `Nenhum resultado para "${query}" em ${book}.`
        : `${results.length} resultado(s) encontrado(s).`
    );
  }

  function cancelSearch() {
    searchTokenRef.current.cancelled = true;
    setSearchLoading(false);
    setSearchProgress("Busca cancelada.");
  }

  return (
    <>
      <section className="card">
        <h3>🔍 Buscar na Bíblia</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Ex: amor, fé, João 3:16"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchBible();
            }
          }}
        />
        <label className="bible-search-scope">
          <input
            type="checkbox"
            checked={searchAllBooks}
            onChange={(event) => setSearchAllBooks(event.target.checked)}
          />
          Buscar em toda a Bíblia (pode demorar um pouco)
        </label>
        <p className="muted small">
          {searchAllBooks
            ? "A busca percorre todos os 66 livros (até 30 resultados)."
            : "Digite uma referência ou uma palavra para buscar no livro selecionado abaixo."}
        </p>
        <div className={`bible-search-actions${searchLoading ? " bible-search-actions--dual" : ""}`}>
          <button type="button" disabled={searchLoading} onClick={searchBible}>
            {searchLoading ? "Buscando..." : "Buscar"}
          </button>
          {searchLoading && (
            <button type="button" className="btn-secondary" onClick={cancelSearch}>
              Cancelar
            </button>
          )}
        </div>
        {searchProgress && <p className="muted small">{searchProgress}</p>}
        {searchResults.length > 0 && (
          <ul className="bible-search-results">
            {searchResults.map((result) => (
              <li key={result.reference} className="bible-search-item">
                <strong>{result.reference}</strong>
                <p>{result.text}</p>
                <div className="bible-item-actions">
                  <button type="button" className="btn-secondary" onClick={() => openReference(result.reference)}>
                    Abrir
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleFavoriteVerse(result.reference, result.text);
                      setFavoritesKey((value) => value + 1);
                    }}
                  >
                    {isVerseFavorited(result.reference) ? "★ Favorito" : "☆ Favoritar"}
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => shareVerse(result.reference, result.text)}>
                    Compartilhar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h3>📖 Bíblia</h3>
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
        <button type="button" onClick={() => loadChapter(`${book} ${chapter}`)} disabled={loading}>
          {loading ? "Carregando..." : "Ler capítulo"}
        </button>
        <button type="button" className="btn-secondary bible-secondary-btn" onClick={loadTodayReading}>
          Leitura de hoje
        </button>
      </section>

      <section className="card">
        <h3>{passageTitle}</h3>
        {error && <p className="error">{error}</p>}
        {!error && (
          <div
            ref={passageRef}
            className="bible-passage"
            dangerouslySetInnerHTML={{ __html: html || "<p>Carregando...</p>" }}
          />
        )}
      </section>

      <section className="card">
        <h3>⭐ Versículos favoritos</h3>
        <ul className="favorite-verses-list">
          {favorites.length === 0 ? (
            <li className="list-item">Nenhum versículo favorito ainda. Toque em ☆ ao lado de um versículo.</li>
          ) : (
            favorites.map((favorite) => (
              <li key={favorite.id} className="favorite-verse-item">
                <strong>{favorite.reference}</strong>
                <p>{favorite.text}</p>
                <div className="bible-item-actions">
                  <button type="button" className="btn-secondary" onClick={() => openReference(favorite.reference)}>
                    Abrir
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => shareVerse(favorite.reference, favorite.text)}>
                    Compartilhar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removeFavoriteVerse(favorite.id);
                      setFavoritesKey((value) => value + 1);
                    }}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  );
}
