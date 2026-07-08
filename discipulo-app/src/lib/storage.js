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

export function setPrayerGoalMinutes(minutes) {
  localStorage.setItem("prayerGoalMinutes", String(minutes));
}

export function getJournals() {
  return readJson("journals", []);
}

export function saveJournal(text) {
  const journals = getJournals();
  journals.unshift({ date: getTodayKey(), text });
  writeJson("journals", journals);
}

export function getPrayers() {
  return readJson("prayers", []);
}

export function savePrayer(text) {
  const prayers = getPrayers();
  prayers.unshift({
    id: Date.now(),
    date: getTodayKey(),
    text,
    answered: false
  });
  writeJson("prayers", prayers);
}

export function togglePrayerAnswered(id) {
  const prayers = getPrayers().map((prayer) => (
    prayer.id === id ? { ...prayer, answered: !prayer.answered } : prayer
  ));
  writeJson("prayers", prayers);
}

export function getReflections() {
  return readJson("reflections", {});
}

export function saveReflection(result, challenge) {
  const reflections = getReflections();
  reflections[getTodayKey()] = {
    result,
    challenge,
    savedAt: new Date().toISOString()
  };
  writeJson("reflections", reflections);
}

export function getTodayReflection() {
  return getReflections()[getTodayKey()] || null;
}

export function getAiHistory() {
  return readJson("aiHistory", []);
}

export function saveAiQuestion(question, answer) {
  const aiHistory = getAiHistory();
  aiHistory.unshift({ date: getTodayKey(), question, answer });
  writeJson("aiHistory", aiHistory);
}

export function getFavoriteVerses() {
  return readJson("favoriteVerses", []);
}

export function getFavoriteReferenceSet() {
  return new Set(getFavoriteVerses().map((item) => item.reference));
}

export function isVerseFavorited(reference) {
  return getFavoriteReferenceSet().has(reference);
}

export function toggleFavoriteVerse(reference, text) {
  const favorites = getFavoriteVerses();
  const existingIndex = favorites.findIndex((item) => item.reference === reference);

  if (existingIndex >= 0) {
    favorites.splice(existingIndex, 1);
  } else {
    favorites.unshift({
      id: Date.now(),
      reference,
      text,
      savedAt: new Date().toISOString()
    });
  }

  writeJson("favoriteVerses", favorites);
}

export function removeFavoriteVerse(id) {
  writeJson("favoriteVerses", getFavoriteVerses().filter((item) => item.id !== id));
}

export function savePrayerSession(durationSeconds) {
  const sessions = getPrayerSessions();
  sessions.unshift({
    id: Date.now(),
    date: getTodayKey(),
    durationSeconds,
    savedAt: new Date().toISOString()
  });
  writeJson("prayerSessions", sessions);
}

export function getAnsweredPrayerCount() {
  return getPrayers().filter((prayer) => prayer.answered).length;
}
