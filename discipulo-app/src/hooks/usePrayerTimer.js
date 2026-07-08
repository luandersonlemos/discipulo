import { useCallback, useEffect, useRef, useState } from "react";
import { formatMinutesLabel, formatTimer } from "../lib/format.js";
import {
  getPrayerGoalMinutes,
  getPrayerSessions,
  getTodayPrayerSeconds,
  savePrayerSession,
  setPrayerGoalMinutes
} from "../lib/storage.js";

export default function usePrayerTimer(onSaved) {
  const [running, setRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [savedTodaySeconds, setSavedTodaySeconds] = useState(getTodayPrayerSeconds());
  const [goalMinutes, setGoalMinutes] = useState(getPrayerGoalMinutes());
  const [sessions, setSessions] = useState(getPrayerSessions());
  const startedAtRef = useRef(null);
  const intervalRef = useRef(null);

  const getCurrentSeconds = useCallback(() => {
    if (!running || !startedAtRef.current) {
      return elapsedSeconds;
    }

    const runningSeconds = Math.floor((Date.now() - startedAtRef.current) / 1000);
    return elapsedSeconds + runningSeconds;
  }, [running, elapsedSeconds]);

  const [displaySeconds, setDisplaySeconds] = useState(0);

  useEffect(() => {
    setDisplaySeconds(getCurrentSeconds());
  }, [getCurrentSeconds, running, elapsedSeconds, savedTodaySeconds]);

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    intervalRef.current = window.setInterval(() => {
      setDisplaySeconds(getCurrentSeconds());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, getCurrentSeconds]);

  const totalTodaySeconds = savedTodaySeconds + (
    running || elapsedSeconds > 0 ? displaySeconds : 0
  );
  const goalSeconds = goalMinutes * 60;
  const progress = goalSeconds > 0
    ? Math.min(Math.round((totalTodaySeconds / goalSeconds) * 100), 100)
    : 0;

  function start() {
    if (running) {
      return;
    }

    startedAtRef.current = Date.now();
    setRunning(true);
  }

  function pause() {
    if (!running) {
      return;
    }

    setElapsedSeconds(getCurrentSeconds());
    setRunning(false);
    startedAtRef.current = null;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function reset() {
    setRunning(false);
    startedAtRef.current = null;
    setElapsedSeconds(0);
    setDisplaySeconds(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function saveSession() {
    const durationSeconds = getCurrentSeconds();

    if (durationSeconds < 5) {
      throw new Error("Ore pelo menos alguns segundos antes de salvar.");
    }

    savePrayerSession(durationSeconds);
    reset();
    setSavedTodaySeconds(getTodayPrayerSeconds());
    setSessions(getPrayerSessions());
    onSaved?.();
  }

  function updateGoal(minutes) {
    const safeGoal = Math.min(180, Math.max(1, Number(minutes) || 15));
    setPrayerGoalMinutes(safeGoal);
    setGoalMinutes(safeGoal);
  }

  const hasElapsed = displaySeconds > 0;

  return {
    timerDisplay: formatTimer(displaySeconds),
    timerSummary: `Hoje: ${formatMinutesLabel(totalTodaySeconds)} · Meta: ${goalMinutes} min`,
    progress,
    goalMinutes,
    sessions,
    running,
    hasElapsed,
    startLabel: !running && elapsedSeconds > 0 ? "Retomar" : "Iniciar",
    start,
    pause,
    saveSession,
    updateGoal
  };
}
