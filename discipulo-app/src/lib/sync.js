import { getReadChapters } from "./bibleProgress.js";
import { applyRemoteSubscription } from "./subscription.js";
import { getCurrentPlan } from "./plans.js";
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
  getTodayMomentSelection,
  getUserName,
  isOnboardingCompleted,
  readJson,
  writeJson
} from "./storage.js";
import { supabase } from "./supabase.js";

function getLocalAppState() {
  return {
    userName: getUserName(),
    onboardingCompleted: isOnboardingCompleted(),
    prayerGoalMinutes: getPrayerGoalMinutes(),
    todayMoment: getTodayMomentSelection(),
    completedDays: getCompletedDays(),
    currentPlan: getCurrentPlan(),
    reflections: getReflections(),
    notificationSettings: readJson("notificationSettings", {}),
    bibleChaptersRead: getReadChapters()
  };
}

function applyLocalAppState(state) {
  if (!state || typeof state !== "object") {
    return;
  }

  if (state.userName) {
    localStorage.setItem("userName", state.userName);
  }

  if (state.onboardingCompleted) {
    localStorage.setItem("onboardingCompleted", "true");
  }

  if (state.prayerGoalMinutes) {
    localStorage.setItem("prayerGoalMinutes", String(state.prayerGoalMinutes));
  }

  if (state.todayMoment) {
    writeJson("todayMoment", state.todayMoment);
  }

  if (Array.isArray(state.completedDays)) {
    writeJson("completedDays", state.completedDays);
  }

  if (state.currentPlan) {
    writeJson("currentPlan", state.currentPlan);
  }

  if (state.reflections) {
    writeJson("reflections", state.reflections);
  }

  if (state.notificationSettings) {
    writeJson("notificationSettings", state.notificationSettings);
  }

  if (Array.isArray(state.bibleChaptersRead)) {
    writeJson("bibleChaptersRead", state.bibleChaptersRead);
  }
}

export async function pullFromCloud(userId) {
  if (!supabase || !userId || userId === "local-dev") {
    return { ok: false, reason: "offline" };
  }

  const [
    profileRes,
    settingsRes,
    completionsRes,
    journalsRes,
    prayersRes,
    sessionsRes,
    spiritualRes,
    reflectionsRes,
    favoritesRes,
    planRes,
    chaptersRes,
    appStateRes,
    aiRes
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("user_settings").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("devotional_completions").select("completed_date").eq("user_id", userId),
    supabase.from("journal_entries").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("prayer_requests").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("prayer_sessions").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("spiritual_progress").select("*").eq("user_id", userId),
    supabase.from("challenge_responses").select("*").eq("user_id", userId),
    supabase.from("favorite_verses").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("user_reading_plans").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("bible_chapters_read").select("*").eq("user_id", userId),
    supabase.from("user_app_state").select("state").eq("user_id", userId).maybeSingle(),
    supabase.from("ai_conversations").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(50)
  ]);

  if (profileRes.data?.name) {
    localStorage.setItem("userName", profileRes.data.name);
  }

  applyRemoteSubscription(profileRes.data);

  if (settingsRes.data?.prayer_daily_goal_minutes) {
    localStorage.setItem("prayerGoalMinutes", String(settingsRes.data.prayer_daily_goal_minutes));
  }

  if (settingsRes.data) {
    writeJson("notificationSettings", {
      enabled: settingsRes.data.notifications_enabled ?? false,
      morningTime: settingsRes.data.morning_reminder_time?.slice(0, 5) || "07:00",
      eveningTime: settingsRes.data.evening_reminder_time?.slice(0, 5) || "21:00",
      streakReminder: settingsRes.data.streak_reminder_enabled ?? true
    });
  }

  if (completionsRes.data?.length) {
    writeJson("completedDays", completionsRes.data.map((row) => row.completed_date));
  }

  if (journalsRes.data?.length) {
    writeJson("journals", journalsRes.data.map((row) => ({
      date: row.entry_date,
      text: row.content
    })));
  }

  if (prayersRes.data?.length) {
    writeJson("prayers", prayersRes.data.map((row) => ({
      id: new Date(row.created_at).getTime(),
      date: row.created_at.split("T")[0],
      text: row.content,
      answered: row.answered
    })));
  }

  if (sessionsRes.data?.length) {
    writeJson("prayerSessions", sessionsRes.data.map((row) => ({
      id: new Date(row.created_at).getTime(),
      date: row.session_date,
      durationSeconds: row.duration_seconds,
      savedAt: row.created_at
    })));
  }

  if (spiritualRes.data?.length) {
    writeJson("spiritualProgress", spiritualRes.data.map((row) => ({
      topicId: row.topic_id,
      completedAt: row.completed_at
    })));
  }

  if (reflectionsRes.data?.length) {
    const reflections = {};
    reflectionsRes.data.forEach((row) => {
      reflections[row.response_date] = {
        result: row.result,
        challenge: row.challenge_text,
        savedAt: row.created_at
      };
    });
    writeJson("reflections", reflections);
  }

  if (favoritesRes.data?.length) {
    writeJson("favoriteVerses", favoritesRes.data.map((row) => ({
      id: new Date(row.created_at).getTime(),
      reference: row.reference,
      text: row.verse_text,
      savedAt: row.created_at
    })));
  }

  if (planRes.data?.plan_data) {
    writeJson("currentPlan", {
      ...planRes.data.plan_data,
      startedAt: planRes.data.started_at,
      completedDays: planRes.data.completed_days || []
    });
  }

  if (chaptersRes.data?.length) {
    writeJson("bibleChaptersRead", chaptersRes.data.map((row) => ({
      key: `${row.book}|${row.chapter}`,
      book: row.book,
      chapter: row.chapter,
      readAt: row.read_at
    })));
  }

  if (appStateRes.data?.state) {
    applyLocalAppState(appStateRes.data.state);
  }

  if (aiRes.data?.length) {
    writeJson("aiHistory", aiRes.data.map((row) => ({
      date: row.conversation_date,
      question: row.question,
      answer: row.answer
    })));
  }

  return { ok: true };
}

export async function pushToCloud(userId) {
  if (!supabase || !userId || userId === "local-dev") {
    return { ok: false, reason: "offline" };
  }

  const appState = getLocalAppState();
  const completedDays = getCompletedDays();
  const journals = getJournals();
  const prayers = getPrayers();
  const sessions = getPrayerSessions();
  const spiritual = getSpiritualProgress();
  const reflections = getReflections();
  const favorites = getFavoriteVerses();
  const currentPlan = getCurrentPlan();
  const chapters = getReadChapters();

  await supabase.from("profiles").upsert({
    id: userId,
    name: getUserName() || "Discípulo",
    onboarding_completed: isOnboardingCompleted(),
    updated_at: new Date().toISOString()
  });

  const notif = readJson("notificationSettings", {});

  await supabase.from("user_settings").upsert({
    user_id: userId,
    prayer_daily_goal_minutes: getPrayerGoalMinutes(),
    notifications_enabled: notif.enabled ?? false,
    morning_reminder_time: notif.morningTime || "07:00",
    evening_reminder_time: notif.eveningTime || "21:00",
    streak_reminder_enabled: notif.streakReminder ?? true,
    updated_at: new Date().toISOString()
  });

  if (completedDays.length) {
    await supabase.from("devotional_completions").upsert(
      completedDays.map((date) => ({
        user_id: userId,
        completed_date: date,
        moment_id: appState.todayMoment?.momentId || null,
        user_text: appState.todayMoment?.userText || null,
        skipped: appState.todayMoment?.skipped ?? false
      })),
      { onConflict: "user_id,completed_date" }
    );
  }

  if (journals.length) {
    await supabase.from("journal_entries").insert(
      journals.slice(0, 20).map((entry) => ({
        user_id: userId,
        content: entry.text,
        entry_date: entry.date
      }))
    );
  }

  if (prayers.length) {
    await supabase.from("prayer_requests").upsert(
      prayers.map((prayer) => ({
        user_id: userId,
        content: prayer.text,
        answered: prayer.answered,
        created_at: new Date(prayer.id || Date.now()).toISOString()
      }))
    );
  }

  if (sessions.length) {
    await supabase.from("prayer_sessions").insert(
      sessions.slice(0, 20).map((session) => ({
        user_id: userId,
        session_date: session.date,
        duration_seconds: session.durationSeconds
      }))
    );
  }

  if (spiritual.length) {
    await supabase.from("spiritual_progress").upsert(
      spiritual.map((entry) => ({
        user_id: userId,
        topic_id: entry.topicId,
        completed_at: entry.completedAt
      })),
      { onConflict: "user_id,topic_id" }
    );
  }

  const reflectionRows = Object.entries(reflections).map(([date, data]) => ({
    user_id: userId,
    response_date: date,
    challenge_text: data.challenge,
    result: data.result
  }));

  if (reflectionRows.length) {
    await supabase.from("challenge_responses").upsert(reflectionRows, {
      onConflict: "user_id,response_date"
    });
  }

  if (favorites.length) {
    await supabase.from("favorite_verses").upsert(
      favorites.map((fav) => ({
        user_id: userId,
        reference: fav.reference,
        verse_text: fav.text
      })),
      { onConflict: "user_id,reference" }
    );
  }

  if (currentPlan) {
    const { startedAt, completedDays: planCompleted, ...planData } = currentPlan;
    await supabase.from("user_reading_plans").upsert({
      user_id: userId,
      plan_id: currentPlan.id,
      plan_data: planData,
      started_at: startedAt,
      completed_days: planCompleted || [],
      is_active: true,
      updated_at: new Date().toISOString()
    });
  }

  if (chapters.length) {
    await supabase.from("bible_chapters_read").upsert(
      chapters.map((ch) => ({
        user_id: userId,
        book: ch.book,
        chapter: ch.chapter,
        read_at: ch.readAt
      })),
      { onConflict: "user_id,book,chapter" }
    );
  }

  await supabase.from("user_app_state").upsert({
    user_id: userId,
    state: appState,
    updated_at: new Date().toISOString()
  });

  const aiHistory = getAiHistory().filter((entry) => entry.source !== "openai");

  if (aiHistory.length) {
    await supabase.from("ai_conversations").insert(
      aiHistory.slice(0, 10).map((entry) => ({
        user_id: userId,
        conversation_date: entry.date,
        question: entry.question,
        answer: entry.answer
      }))
    );
  }

  return { ok: true };
}

export async function syncWithCloud(userId) {
  await pullFromCloud(userId);
  await pushToCloud(userId);
  return { ok: true };
}
