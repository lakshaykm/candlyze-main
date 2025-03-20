import { supabase } from "../supabase";

export async function checkSubscription(email: string) {
  console.log("🔹 Checking subscription for", email);
  
  const { data, error } = await supabase
    .from("subscriptions")
    .select("status") // ✅ Ensure only needed fields are selected
    .eq("user_id", email) // ✅ Fix: Make sure user_id is being compared correctly
    .eq("status", "active") // ✅ Fix: Ensure we're filtering only active subscriptions
    .single();
  
  console.log("🔍 Supabase response:", { data, error });
  
  if (error) {
    console.error("❌ Error fetching subscription:", error);
    return false;
  }
  
  return data?.status === "active";
}
