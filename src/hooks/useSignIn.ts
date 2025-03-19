import { useState } from "react";
import { signIn } from "../services/auth-service";
import { useAuth } from "./useAuth";
import { checkSubscription } from "../services/subscription-service";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

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
      
      // Check subscription status
      console.log("🔹 Checking subscription status...");
      const hasActiveSubscription = await checkSubscription(userData.email);
      console.log("✅ Subscription status:", hasActiveSubscription);
      
      if (hasActiveSubscription) {
        navigate("/dashboard");
      } else {
        navigate("/subscribe");
      }
    } catch (error) {
      console.error("❌ Sign-in error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading, error };
}
