import { plans } from "legacy:data.js";
import { isPremium } from "./subscription.js";
import { daysBetween } from "./format.js";
import { getTodayDevotional } from "./devotional.js";
import { getTodayKey, readJson, writeJson } from "./storage.js";

export function getCurrentPlan() {
  return readJson("currentPlan", null);
}

export function getPlanCatalogItem(planId) {
  return plans.find((plan) => plan.id === planId);
}

export function getPlanDayIndex(currentPlan = getCurrentPlan()) {
  if (!currentPlan?.startedAt) {
    return 0;
  }

  const dayIndex = daysBetween(currentPlan.startedAt, getTodayKey());
  return Math.max(0, Math.min(dayIndex, currentPlan.days - 1));
}

export function getTodayReadingLabel() {
  const currentPlan = getCurrentPlan();

  if (currentPlan?.readings?.length) {
    const dayIndex = getPlanDayIndex(currentPlan);
    return currentPlan.readings[dayIndex];
  }

  return getTodayDevotional().verse;
}

export function getPlanProgress(currentPlan = getCurrentPlan()) {
  if (!currentPlan) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  const completed = currentPlan.completedDays?.length || 0;
  const total = currentPlan.days || 0;
  const percentage = total > 0 ? Math.min(Math.round((completed / total) * 100), 100) : 0;

  return { completed, total, percentage };
}

export function saveCurrentPlan(planId) {
  const selectedPlan = getPlanCatalogItem(planId);

  if (!selectedPlan) {
    return;
  }

  writeJson("currentPlan", {
    ...selectedPlan,
    startedAt: getTodayKey(),
    completedDays: []
  });
}

export function completePlanDay() {
  const currentPlan = getCurrentPlan();

  if (!currentPlan) {
    return;
  }

  const today = getTodayKey();

  if (!currentPlan.completedDays.includes(today)) {
    currentPlan.completedDays.push(today);
    writeJson("currentPlan", currentPlan);
  }
}

export function isPlanLocked(plan) {
  return Boolean(plan.isPremium) && !isPremium();
}

export function getAvailablePlans() {
  return plans;
}

export { plans };
