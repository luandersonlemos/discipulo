import {
  getAiHistory,
  getCompletedDays,
  getFavoriteVerses,
  getJournals,
  getPrayerGoalMinutes,
  getPrayerSessions,
  getPrayers,
  getReflections,
  getSpiritualProgress,
  getUserName,
  isOnboardingCompleted,
  readJson
} from "./storage.js";
import { getCurrentPlan } from "./plans.js";
import { getReadChapters } from "./bibleProgress.js";
import { getSubscriptionState } from "./subscription.js";
import { getNotificationSettings } from "./notifications.js";
import { supabase } from "./supabase.js";
import { isPremium } from "./subscription.js";

export function buildBackupPayload() {
  return {
    version: 3,
    exportedAt: new Date().toISOString(),
    app: "discipulo",
    data: {
      userName: getUserName(),
      onboardingCompleted: isOnboardingCompleted(),
      prayerGoalMinutes: getPrayerGoalMinutes(),
      completedDays: getCompletedDays(),
      journals: getJournals(),
      prayers: getPrayers(),
      prayerSessions: getPrayerSessions(),
      spiritualProgress: getSpiritualProgress(),
      reflections: getReflections(),
      aiHistory: getAiHistory(),
      favoriteVerses: getFavoriteVerses(),
      currentPlan: getCurrentPlan(),
      bibleChaptersRead: getReadChapters(),
      subscription: getSubscriptionState(),
      notificationSettings: getNotificationSettings(),
      todayMoment: readJson("todayMoment", null)
    }
  };
}

export function downloadBackup() {
  const payload = buildBackupPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `discipulo-backup-${new Date().toISOString().split("T")[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function restoreBackup(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        const data = payload.data || payload;

        if (data.userName) localStorage.setItem("userName", data.userName);
        if (data.onboardingCompleted) localStorage.setItem("onboardingCompleted", "true");
        if (data.prayerGoalMinutes) localStorage.setItem("prayerGoalMinutes", String(data.prayerGoalMinutes));
        if (data.completedDays) localStorage.setItem("completedDays", JSON.stringify(data.completedDays));
        if (data.journals) localStorage.setItem("journals", JSON.stringify(data.journals));
        if (data.prayers) localStorage.setItem("prayers", JSON.stringify(data.prayers));
        if (data.prayerSessions) localStorage.setItem("prayerSessions", JSON.stringify(data.prayerSessions));
        if (data.spiritualProgress) localStorage.setItem("spiritualProgress", JSON.stringify(data.spiritualProgress));
        if (data.reflections) localStorage.setItem("reflections", JSON.stringify(data.reflections));
        if (data.aiHistory) localStorage.setItem("aiHistory", JSON.stringify(data.aiHistory));
        if (data.favoriteVerses) localStorage.setItem("favoriteVerses", JSON.stringify(data.favoriteVerses));
        if (data.currentPlan) localStorage.setItem("currentPlan", JSON.stringify(data.currentPlan));
        if (data.bibleChaptersRead) localStorage.setItem("bibleChaptersRead", JSON.stringify(data.bibleChaptersRead));
        if (data.subscription) localStorage.setItem("subscription", JSON.stringify(data.subscription));
        if (data.notificationSettings) localStorage.setItem("notificationSettings", JSON.stringify(data.notificationSettings));
        if (data.todayMoment) localStorage.setItem("todayMoment", JSON.stringify(data.todayMoment));

        resolve(true);
      } catch {
        reject(new Error("Arquivo de backup inválido."));
      }
    };

    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.readAsText(file);
  });
}

export async function saveCloudBackup(userId) {
  if (!supabase || !userId || !isPremium()) {
    return { ok: false };
  }

  const payload = buildBackupPayload();

  await supabase.from("data_backups").insert({
    user_id: userId,
    backup_data: payload
  });

  return { ok: true };
}

export async function getLatestCloudBackup(userId) {
  if (!supabase || !userId) {
    return null;
  }

  const { data } = await supabase
    .from("data_backups")
    .select("backup_data, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data;
}
