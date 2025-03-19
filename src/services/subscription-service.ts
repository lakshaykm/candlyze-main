import { supabase } from "../supabase";

export async function checkSubscription(email: string) {
  console.log("🔹 Checking subscription for", email);
  const { data, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", email)
    .single();

  if (error) {
    console.error("❌ Error fetching subscription:", error);
    return false;
  }

  return data.status === "active";
}
