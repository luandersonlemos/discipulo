export const PRICING = {
  monthly: 29.9,
  annual: 249.9,
  trialDays: 7,
  currency: "BRL"
};

const DEFAULT_STATE = {
  tier: "free",
  trialEndsAt: null,
  premiumExpiresAt: null,
  trialUsed: false,
  plan: null
};

export function getSubscriptionState() {
  try {
    const raw = localStorage.getItem("subscription");
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveSubscriptionState(state) {
  localStorage.setItem("subscription", JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("subscription-changed"));
}

export function isTrialActive(state = getSubscriptionState()) {
  if (!state.trialEndsAt) {
    return false;
  }

  return new Date(state.trialEndsAt) > new Date();
}

export function isPremiumActive(state = getSubscriptionState()) {
  if (state.tier === "premium" && state.premiumExpiresAt) {
    return new Date(state.premiumExpiresAt) > new Date();
  }

  if (state.tier === "premium" && !state.premiumExpiresAt) {
    return true;
  }

  return false;
}

export function isPremium(state = getSubscriptionState()) {
  return isPremiumActive(state) || isTrialActive(state);
}

export function getSubscriptionLabel(state = getSubscriptionState()) {
  if (isPremiumActive(state)) {
    return "Premium";
  }

  if (isTrialActive(state)) {
    const daysLeft = Math.ceil((new Date(state.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24));
    return `Trial (${daysLeft} dia${daysLeft === 1 ? "" : "s"})`;
  }

  return "Gratuito";
}

export function startTrial() {
  const state = getSubscriptionState();

  if (state.trialUsed) {
    throw new Error("Você já usou seu trial gratuito de 7 dias.");
  }

  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + PRICING.trialDays);

  const next = {
    ...state,
    tier: "trial",
    trialEndsAt: trialEndsAt.toISOString(),
    trialUsed: true
  };

  saveSubscriptionState(next);
  return next;
}

export function activatePremium(plan = "monthly") {
  const state = getSubscriptionState();
  const expiresAt = new Date();

  if (plan === "annual") {
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  } else {
    expiresAt.setMonth(expiresAt.getMonth() + 1);
  }

  const next = {
    ...state,
    tier: "premium",
    plan,
    premiumExpiresAt: expiresAt.toISOString(),
    trialEndsAt: null
  };

  saveSubscriptionState(next);
  return next;
}

export function applyRemoteSubscription(profile) {
  if (!profile) {
    return getSubscriptionState();
  }

  const next = {
    tier: profile.subscription_tier === "premium" ? "premium" : "free",
    trialEndsAt: profile.trial_ends_at || null,
    premiumExpiresAt: profile.premium_expires_at || null,
    trialUsed: profile.trial_used ?? false,
    plan: null
  };

  if (isTrialActive(next)) {
    next.tier = "trial";
  }

  saveSubscriptionState(next);
  return next;
}

export function getPremiumFeatures() {
  return [
    { icon: "🤖", title: "IA ilimitada", desc: "Pergunte o quanto quiser sobre a Palavra" },
    { icon: "📚", title: "Planos exclusivos", desc: "Estudos avançados de liderança e profecia" },
    { icon: "☁️", title: "Backup automático", desc: "Seus dados seguros na nuvem" },
    { icon: "📊", title: "Relatórios detalhados", desc: "Veja sua evolução espiritual em profundidade" },
    { icon: "🔔", title: "Notificações PWA", desc: "Instale o app e receba lembretes" }
  ];
}

export function getFreeLimits() {
  return {
    aiPerDay: 5,
    cloudBackup: false,
    premiumPlans: false,
    detailedReports: false
  };
}
