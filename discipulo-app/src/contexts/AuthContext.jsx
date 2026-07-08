import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase.js";
import { pullFromCloud, pushToCloud } from "../lib/sync.js";
import { saveCloudBackup } from "../lib/backup.js";
import { applyRemoteSubscription, isPremium } from "../lib/subscription.js";
import { getUserName, isOnboardingCompleted } from "../lib/storage.js";

const LOCAL_USER = {
  id: "local-dev",
  email: "local@discipulo.app",
  user_metadata: { name: getUserName() || "Discípulo" }
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [subscriptionKey, setSubscriptionKey] = useState(0);
  const devMode = !isSupabaseConfigured;

  async function refreshSubscription() {
    if (!supabase || devMode) {
      setSubscriptionKey((v) => v + 1);
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;

    if (!userId) {
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier, trial_ends_at, premium_expires_at, trial_used")
      .eq("id", userId)
      .maybeSingle();

    applyRemoteSubscription(profile);
    setSubscriptionKey((v) => v + 1);
  }

  async function syncUserData(userId) {
    if (!userId || userId === "local-dev" || devMode) {
      return;
    }

    setSyncing(true);

    try {
      await pullFromCloud(userId);

      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier, trial_ends_at, premium_expires_at, trial_used")
        .eq("id", userId)
        .maybeSingle();

      applyRemoteSubscription(profile);
      await pushToCloud(userId);

      if (isPremium()) {
        await saveCloudBackup(userId);
      }
    } catch (error) {
      console.warn("Sync falhou:", error);
    } finally {
      setSyncing(false);
    }
  }

  useEffect(() => {
    if (devMode) {
      if (isOnboardingCompleted() || getUserName()) {
        setUser({
          ...LOCAL_USER,
          user_metadata: { name: getUserName() || "Discípulo" }
        });
      }

      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      setLoading(false);

      if (sessionUser?.id) {
        await syncUserData(sessionUser.id);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      setLoading(false);

      if (sessionUser?.id && _event === "SIGNED_IN") {
        await syncUserData(sessionUser.id);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [devMode]);

  const value = useMemo(() => ({
    user,
    loading,
    syncing,
    subscriptionKey,
    devMode,
    isConfigured: isSupabaseConfigured,
    syncUserData,
    refreshSubscription,
    refreshLocalUser() {
      if (!devMode) {
        return;
      }

      setUser({
        ...LOCAL_USER,
        user_metadata: { name: getUserName() || "Discípulo" }
      });
    },
    async signInWithEmail(email, password) {
      if (!supabase) {
        throw new Error("Configure o Supabase no arquivo .env");
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
    },
    async signUpWithEmail(email, password, name) {
      if (!supabase) {
        throw new Error("Configure o Supabase no arquivo .env");
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });

      if (error) {
        throw error;
      }
    },
    async signOut() {
      if (devMode) {
        setUser(null);
        return;
      }

      if (supabase) {
        await supabase.auth.signOut();
      }
    }
  }), [user, loading, syncing, subscriptionKey, devMode]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
