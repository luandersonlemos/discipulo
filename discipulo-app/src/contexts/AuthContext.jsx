import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase.js";
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
  const devMode = !isSupabaseConfigured;

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

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [devMode]);

  const value = useMemo(() => ({
    user,
    loading,
    devMode,
    isConfigured: isSupabaseConfigured,
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
  }), [user, loading, devMode]);

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
