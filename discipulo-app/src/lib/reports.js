import { getStreak } from "./stats.js";
import { getBibleProgressPercent } from "./bibleProgress.js";
import { getPlanProgress, getCurrentPlan } from "./plans.js";
import {
  getAiHistory,
  getAnsweredPrayerCount,
  getCompletedDays,
  getJournals,
  getPrayerSessions,
  getPrayers,
  getReflections,
  getSpiritualProgress,
  getTodayKey
} from "./storage.js";
import { daysBetween } from "./format.js";

function groupByWeek(dates) {
  const weeks = {};

  dates.forEach((date) => {
    const d = new Date(`${date}T00:00:00`);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    const key = weekStart.toISOString().split("T")[0];
    weeks[key] = (weeks[key] || 0) + 1;
  });

  return Object.entries(weeks)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([week, count]) => ({ week, count }));
}

function getLongestStreak(completedDays) {
  if (!completedDays.length) {
    return 0;
  }

  const sorted = [...new Set(completedDays)].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i += 1) {
    if (daysBetween(sorted[i - 1], sorted[i]) === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

export function buildProgressReport() {
  const completedDays = getCompletedDays();
  const journals = getJournals();
  const prayers = getPrayers();
  const sessions = getPrayerSessions();
  const reflections = Object.keys(getReflections());
  const spiritual = getSpiritualProgress();
  const aiHistory = getAiHistory();
  const planProgress = getPlanProgress(getCurrentPlan());
  const totalPrayerSeconds = sessions.reduce((sum, s) => sum + s.durationSeconds, 0);
  const answeredPrayers = getAnsweredPrayerCount();
  const reflectionYes = Object.values(getReflections()).filter((r) => r.result === "yes").length;

  const last30Start = new Date();
  last30Start.setDate(last30Start.getDate() - 30);
  const last30Key = last30Start.toISOString().split("T")[0];
  const devotionalsLast30 = completedDays.filter((d) => d >= last30Key).length;

  return {
    generatedAt: getTodayKey(),
    streak: {
      current: getStreak(),
      longest: getLongestStreak(completedDays),
      totalDays: completedDays.length
    },
    bible: {
      percent: getBibleProgressPercent(),
      chaptersRead: Math.round(getBibleProgressPercent() * 11.89)
    },
    plan: planProgress,
    prayer: {
      totalMinutes: Math.round(totalPrayerSeconds / 60),
      sessions: sessions.length,
      avgMinutes: sessions.length ? Math.round(totalPrayerSeconds / 60 / sessions.length) : 0
    },
    journal: {
      entries: journals.length,
      last30: journals.filter((j) => j.date >= last30Key).length
    },
    prayers: {
      total: prayers.length,
      answered: answeredPrayers,
      answerRate: prayers.length ? Math.round((answeredPrayers / prayers.length) * 100) : 0
    },
    reflections: {
      total: reflections.length,
      livedChallenge: reflectionYes,
      liveRate: reflections.length ? Math.round((reflectionYes / reflections.length) * 100) : 0
    },
    journey: {
      topicsCompleted: spiritual.length
    },
    ai: {
      totalQuestions: aiHistory.length,
      last30: aiHistory.filter((e) => e.date >= last30Key).length
    },
    activity: {
      devotionalsLast30,
      weeklyDevotionals: groupByWeek(completedDays)
    }
  };
}
