import { spiritualLevels } from "legacy:journey.js";
import { getCompletedDays, getSpiritualProgress, getTodayKey } from "./storage.js";

export function getStreak() {
  const completedDays = new Set(getCompletedDays());
  const today = getTodayKey();

  if (completedDays.size === 0) {
    return 0;
  }

  let streak = 0;
  const cursor = new Date(`${today}T00:00:00`);

  if (!completedDays.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const key = cursor.toISOString().split("T")[0];

    if (!completedDays.has(key)) {
      break;
    }

    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function isTopicCompleted(topicId, progress = getSpiritualProgress()) {
  return progress.some((item) => item.topicId === topicId);
}

export function isLevelAccessible(level, progress = getSpiritualProgress()) {
  if (level.level === 1) {
    return true;
  }

  const previousLevel = spiritualLevels.find((item) => item.level === level.level - 1);

  if (!previousLevel?.topics?.length) {
    return false;
  }

  const completed = previousLevel.topics.filter((topic) => isTopicCompleted(topic.id, progress)).length;
  return completed === previousLevel.topics.length;
}

export function getLevelProgress(level, progress = getSpiritualProgress()) {
  if (!level?.topics?.length) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  const completed = level.topics.filter((topic) => isTopicCompleted(topic.id, progress)).length;
  const total = level.topics.length;

  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100)
  };
}

export function getActiveSpiritualLevel(progress = getSpiritualProgress()) {
  let fallback = spiritualLevels[0];

  for (const level of spiritualLevels) {
    if (!isLevelAccessible(level, progress) || level.topics.length === 0) {
      continue;
    }

    fallback = level;
    const { percentage } = getLevelProgress(level, progress);

    if (percentage < 100) {
      return level;
    }
  }

  return fallback;
}

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Bom dia";
  }

  if (hour < 18) {
    return "Boa tarde";
  }

  return "Boa noite";
}

export const WEEKDAYS = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
  "Quinta-feira", "Sexta-feira", "Sábado"
];
