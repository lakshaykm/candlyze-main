import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔹 Checking user session...");
    supabase.auth.getSession().then(({ data }) => {
      console.log("✅ Session Data:", data);
      setUser(data.session?.user ?? null);
      setLoading(false);
    }).catch(error => {
      console.error("❌ Session fetch error:", error);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔄 Auth state changed:", session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
