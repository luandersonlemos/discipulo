export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export function getUserName() {
  return localStorage.getItem("userName") || "";
}

export function setUserName(name) {
  localStorage.setItem("userName", name);
}

export function isOnboardingCompleted() {
  return localStorage.getItem("onboardingCompleted") === "true";
}

export function completeOnboarding(name, prayerGoalMinutes) {
  setUserName(name);
  localStorage.setItem("prayerGoalMinutes", String(prayerGoalMinutes));
  localStorage.setItem("onboardingCompleted", "true");
}

export function getPrayerGoalMinutes() {
  const saved = Number(localStorage.getItem("prayerGoalMinutes"));
  return saved > 0 ? saved : 15;
}

export function getCompletedDays() {
  return readJson("completedDays", []);
}

export function getTodayMomentSelection() {
  const saved = readJson("todayMoment", null);
  return saved?.date === getTodayKey() ? saved : null;
}

export function hasTodayMomentChoice() {
  const selection = getTodayMomentSelection();
  return Boolean(selection?.userText || selection?.skipped);
}

export function getSpiritualProgress() {
  return readJson("spiritualProgress", []);
}

export function getPrayerSessions() {
  return readJson("prayerSessions", []);
}

export function getTodayPrayerSeconds() {
  const today = getTodayKey();
  return getPrayerSessions()
    .filter((session) => session.date === today)
    .reduce((total, session) => total + session.durationSeconds, 0);
}
