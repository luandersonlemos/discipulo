import { BIBLE_BOOKS } from "legacy:bible.js";
import { readJson, writeJson } from "./storage.js";

export const TOTAL_BIBLE_CHAPTERS = BIBLE_BOOKS.reduce((sum, book) => sum + book.chapters, 0);

export function getReadChapters() {
  return readJson("bibleChaptersRead", []);
}

export function markChapterRead(book, chapter) {
  const chapters = getReadChapters();
  const key = `${book}|${chapter}`;

  if (chapters.some((item) => item.key === key)) {
    return;
  }

  chapters.push({
    key,
    book,
    chapter: Number(chapter),
    readAt: new Date().toISOString().split("T")[0]
  });

  writeJson("bibleChaptersRead", chapters);
}

export function getBibleProgressPercent() {
  const read = getReadChapters().length;

  if (TOTAL_BIBLE_CHAPTERS === 0) {
    return 0;
  }

  return Math.min(Math.round((read / TOTAL_BIBLE_CHAPTERS) * 100), 100);
}

export function parseChapterReference(reference) {
  const match = reference?.trim().match(/^(.+?)\s+(\d+)$/u);

  if (!match) {
    return null;
  }

  return { book: match[1].trim(), chapter: Number(match[2]) };
}
