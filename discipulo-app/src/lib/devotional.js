import { devotionals } from "legacy:data.js";
import { lifeMoments } from "legacy:moments.js";
import { getTodayKey, getTodayMomentSelection, getUserName } from "./storage.js";

export function hashString(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text || "";
  }

  return `${text.slice(0, maxLength).trim()}…`;
}

function getMomentById(momentId) {
  return lifeMoments.find((moment) => moment.id === momentId);
}

function pickVariantIndex(momentId, userText) {
  const moment = getMomentById(momentId);
  const seed = `${getUserName()}-${getTodayKey()}-${userText}`;
  return hashString(seed) % moment.devotionals.length;
}

export function detectMomentFromText(userText) {
  const lowerText = userText.toLowerCase();
  let bestMatch = getMomentById("geral");
  let bestScore = 0;

  lifeMoments.forEach((moment) => {
    if (moment.id === "geral") {
      return;
    }

    let score = 0;

    moment.keywords.forEach((keyword) => {
      if (lowerText.includes(keyword)) {
        score += 1;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestMatch = moment;
    }
  });

  return bestMatch;
}

function buildPersonalizedDevotional(baseDevotional, userText) {
  const excerpt = truncateText(userText, 100);

  return {
    ...baseDevotional,
    summary: `Você compartilhou:\n"${excerpt}"\n\n${baseDevotional.summary}`,
    application: `Pensando no que você descreveu hoje: ${baseDevotional.application}`,
    prayer: `Senhor, tu conheces o que estou vivendo: ${excerpt}. ${baseDevotional.prayer}`,
    challenge: baseDevotional.challenge,
    userText,
    personalized: true
  };
}

export function getTodayDevotional() {
  const selection = getTodayMomentSelection();

  if (selection?.userText) {
    const moment = getMomentById(selection.momentId);
    const baseDevotional = moment.devotionals[selection.variantIndex];

    return {
      ...buildPersonalizedDevotional(baseDevotional, selection.userText),
      momentId: selection.momentId
    };
  }

  const startDate = new Date("2026-07-01");
  const currentDate = new Date(`${getTodayKey()}T00:00:00`);
  const differenceInDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
  const devotionalIndex = Math.abs(differenceInDays) % devotionals.length;

  return {
    ...devotionals[devotionalIndex],
    personalized: false
  };
}

export function saveMomentFromText(userText) {
  const matchedMoment = detectMomentFromText(userText);
  const variantIndex = pickVariantIndex(matchedMoment.id, userText);

  return {
    date: getTodayKey(),
    userText,
    momentId: matchedMoment.id,
    variantIndex,
    skipped: false
  };
}

export function saveSkippedMoment() {
  return {
    date: getTodayKey(),
    skipped: true
  };
}
