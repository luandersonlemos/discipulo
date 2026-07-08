import { getCompletedDays, getTodayKey, readJson, writeJson } from "./storage.js";
import { getStreak } from "./stats.js";

const DEFAULT_SETTINGS = {
  enabled: false,
  morningTime: "07:00",
  eveningTime: "21:00",
  streakReminder: true,
  permission: "default"
};

export function getNotificationSettings() {
  return { ...DEFAULT_SETTINGS, ...readJson("notificationSettings", {}) };
}

export function saveNotificationSettings(partial) {
  writeJson("notificationSettings", {
    ...getNotificationSettings(),
    ...partial
  });
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    throw new Error("Seu navegador não suporta notificações.");
  }

  const permission = await Notification.requestPermission();
  saveNotificationSettings({ permission, enabled: permission === "granted" });
  return permission;
}

function wasNotifiedToday(key) {
  const sent = readJson("notificationsSent", {});
  return sent[key] === getTodayKey();
}

function markNotifiedToday(key) {
  const sent = readJson("notificationsSent", {});
  sent[key] = getTodayKey();
  writeJson("notificationsSent", sent);
}

function isTimeMatch(timeString) {
  const now = new Date();
  const [hours, minutes] = timeString.split(":").map(Number);
  return now.getHours() === hours && now.getMinutes() === minutes;
}

function showNotification(title, body, tag) {
  if (Notification.permission !== "granted") {
    return;
  }

  new Notification(title, {
    body,
    tag,
    icon: "/favicon.ico"
  });
}

export function checkScheduledNotifications() {
  const settings = getNotificationSettings();

  if (!settings.enabled || Notification.permission !== "granted") {
    return;
  }

  const completedToday = getCompletedDays().includes(getTodayKey());
  const streak = getStreak();

  if (!completedToday && isTimeMatch(settings.morningTime) && !wasNotifiedToday("morning")) {
    showNotification(
      "Bom dia! Sua caminhada com Deus",
      "O devocional de hoje está esperando por você. Reserve alguns minutos com Deus.",
      "morning-reminder"
    );
    markNotifiedToday("morning");
  }

  if (
    settings.streakReminder
    && !completedToday
    && streak > 0
    && isTimeMatch(settings.eveningTime)
    && !wasNotifiedToday("streak")
  ) {
    showNotification(
      `🔥 ${streak} dias caminhando com Deus`,
      "Não deixe sua sequência quebrar hoje. Ainda dá tempo de concluir o devocional.",
      "streak-reminder"
    );
    markNotifiedToday("streak");
  }
}

export function startNotificationScheduler() {
  checkScheduledNotifications();
  const intervalId = window.setInterval(checkScheduledNotifications, 60_000);
  return () => clearInterval(intervalId);
}
