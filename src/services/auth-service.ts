import { supabase } from "../supabase";

export async function signIn({ email, password }) {
  console.log("🔹 Sending sign-in request to Supabase");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });

  if (error) {
    console.error("❌ Supabase sign-in error:", error.message);
    throw new Error(error.message || "Sign-in failed");
  }

  console.log("✅ Supabase sign-in response:", data);
  return data.user;
}
