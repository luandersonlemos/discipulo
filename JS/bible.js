const BIBLE_BOOKS = [
    { name: "Gênesis", chapters: 50 },
    { name: "Êxodo", chapters: 40 },
    { name: "Levítico", chapters: 27 },
    { name: "Números", chapters: 36 },
    { name: "Deuteronômio", chapters: 34 },
    { name: "Josué", chapters: 24 },
    { name: "Juízes", chapters: 21 },
    { name: "Rute", chapters: 4 },
    { name: "1 Samuel", chapters: 31 },
    { name: "2 Samuel", chapters: 24 },
    { name: "1 Reis", chapters: 22 },
    { name: "2 Reis", chapters: 25 },
    { name: "1 Crônicas", chapters: 29 },
    { name: "2 Crônicas", chapters: 36 },
    { name: "Esdras", chapters: 10 },
    { name: "Neemias", chapters: 13 },
    { name: "Ester", chapters: 10 },
    { name: "Jó", chapters: 42 },
    { name: "Salmos", chapters: 150 },
    { name: "Provérbios", chapters: 31 },
    { name: "Eclesiastes", chapters: 12 },
    { name: "Cantares", chapters: 8 },
    { name: "Isaías", chapters: 66 },
    { name: "Jeremias", chapters: 52 },
    { name: "Lamentações", chapters: 5 },
    { name: "Ezequiel", chapters: 48 },
    { name: "Daniel", chapters: 12 },
    { name: "Oséias", chapters: 14 },
    { name: "Joel", chapters: 3 },
    { name: "Amós", chapters: 9 },
    { name: "Obadias", chapters: 1 },
    { name: "Jonas", chapters: 4 },
    { name: "Miqueias", chapters: 7 },
    { name: "Naum", chapters: 3 },
    { name: "Habacuque", chapters: 3 },
    { name: "Sofonias", chapters: 3 },
    { name: "Ageu", chapters: 2 },
    { name: "Zacarias", chapters: 14 },
    { name: "Malaquias", chapters: 4 },
    { name: "Mateus", chapters: 28 },
    { name: "Marcos", chapters: 16 },
    { name: "Lucas", chapters: 24 },
    { name: "João", chapters: 21 },
    { name: "Atos", chapters: 28 },
    { name: "Romanos", chapters: 16 },
    { name: "1 Coríntios", chapters: 16 },
    { name: "2 Coríntios", chapters: 13 },
    { name: "Gálatas", chapters: 6 },
    { name: "Efésios", chapters: 6 },
    { name: "Filipenses", chapters: 4 },
    { name: "Colossenses", chapters: 4 },
    { name: "1 Tessalonicenses", chapters: 5 },
    { name: "2 Tessalonicenses", chapters: 3 },
    { name: "1 Timóteo", chapters: 6 },
    { name: "2 Timóteo", chapters: 4 },
    { name: "Tito", chapters: 3 },
    { name: "Filemom", chapters: 1 },
    { name: "Hebreus", chapters: 13 },
    { name: "Tiago", chapters: 5 },
    { name: "1 Pedro", chapters: 5 },
    { name: "2 Pedro", chapters: 3 },
    { name: "1 João", chapters: 5 },
    { name: "2 João", chapters: 1 },
    { name: "3 João", chapters: 1 },
    { name: "Judas", chapters: 1 },
    { name: "Apocalipse", chapters: 22 }
];

const BIBLE_VERSION = "almeida";
const BIBLE_VERSION_LABEL = "Almeida (ACF)";

function getBibleCache() {
    return JSON.parse(localStorage.getItem("bibleCache")) || {};
}

function setBibleCacheEntry(key, data) {
    const cache = getBibleCache();
    cache[key] = data;
    localStorage.setItem("bibleCache", JSON.stringify(cache));
}

function normalizeBookName(bookName) {
    const normalized = bookName.trim().toLowerCase();

    if (normalized === "salmo") {
        return "Salmos";
    }

    const book = BIBLE_BOOKS.find((item) => item.name.toLowerCase() === normalized);

    if (book) {
        return book.name;
    }

    return bookName.trim();
}

function parseReference(reference) {
    if (!reference) {
        return null;
    }

    const trimmed = reference.trim();
    const match = trimmed.match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/u);

    if (!match) {
        return null;
    }

    const book = normalizeBookName(match[1]);
    const chapter = Number(match[2]);
    const startVerse = match[3] ? Number(match[3]) : null;
    const endVerse = match[4] ? Number(match[4]) : startVerse;

    let query = `${book} ${chapter}`;

    if (startVerse) {
        query = endVerse && endVerse !== startVerse
            ? `${book} ${chapter}:${startVerse}-${endVerse}`
            : `${book} ${chapter}:${startVerse}`;
    }

    return {
        book,
        chapter,
        startVerse,
        endVerse,
        query
    };
}

function getHighlightedVerses(reference) {
    const parsed = parseReference(reference);

    if (!parsed?.startVerse) {
        return [];
    }

    const verses = [];

    for (let verse = parsed.startVerse; verse <= parsed.endVerse; verse += 1) {
        verses.push(verse);
    }

    return verses;
}

function cleanVerseText(text) {
    return text.replace(/\s+/g, " ").trim();
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function renderVersesHtml(data, options = {}) {
    const {
        highlightedVerses = [],
        interactive = false,
        favoriteReferences = new Set()
    } = options;

    if (!data?.verses?.length) {
        return `<p>${escapeHtml(cleanVerseText(data?.text || "Texto indisponível."))}</p>`;
    }

    const bookName = data.book_name || data.verses[0]?.book_name || "";

    return data.verses.map((verse) => {
        const reference = buildVerseReference(bookName, verse.chapter, verse.verse);
        const isHighlighted = highlightedVerses.includes(verse.verse);
        const isFavorite = favoriteReferences.has(reference);
        let className = "bible-verse";

        if (isHighlighted) {
            className += " bible-verse--highlight";
        }

        if (isFavorite) {
            className += " bible-verse--favorited";
        }

        const favoriteButton = interactive
            ? `<button type="button" class="verse-favorite-btn" data-reference="${escapeHtml(reference)}" data-text="${escapeHtml(cleanVerseText(verse.text))}" aria-label="Favoritar versículo">${isFavorite ? "★" : "☆"}</button>`
            : "";

        const shareButton = interactive
            ? `<button type="button" class="verse-share-btn" data-reference="${escapeHtml(reference)}" data-text="${escapeHtml(cleanVerseText(verse.text))}" aria-label="Compartilhar versículo">↗</button>`
            : "";

        return `<p class="${className}"><span class="verse-actions">${favoriteButton}${shareButton}</span><sup>${verse.verse}</sup> ${escapeHtml(cleanVerseText(verse.text))}</p>`;
    }).join("");
}

function buildVerseReference(bookName, chapter, verse) {
    return `${bookName} ${chapter}:${verse}`;
}

async function fetchPassage(reference) {
    const parsed = parseReference(reference);

    if (!parsed) {
        throw new Error("Referência bíblica inválida.");
    }

    const cacheKey = `${BIBLE_VERSION}:${parsed.query.toLowerCase()}`;
    const cache = getBibleCache();

    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    const url = `https://bible-api.com/${encodeURIComponent(parsed.query)}?translation=${BIBLE_VERSION}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Não foi possível carregar a passagem.");
    }

    const data = await response.json();
    setBibleCacheEntry(cacheKey, data);

    return data;
}

function getBookByName(bookName) {
    return BIBLE_BOOKS.find((book) => book.name.toLowerCase() === bookName.toLowerCase());
}
