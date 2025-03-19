import { useState } from "react";
import { signIn } from "../services/auth-service";
import { useAuth } from "./useAuth";

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔹 Attempting sign-in for", email);
      
      const userData = await signIn({ email, password });
      console.log("✅ Sign-in successful:", userData);
      
      if (!userData) {
        throw new Error("No user data received");
      }
      
      setUser(userData);
    } catch (error) {
      console.error("❌ Sign-in error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading, error };
}
