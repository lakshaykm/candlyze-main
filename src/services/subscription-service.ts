import { supabase } from "../supabase";

export async function checkSubscription(email: string) {
  console.log("🔹 Checking subscription for email:", email);

  // Step 1: Get user ID from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (profileError || !profile) {
    console.error("❌ Could not find user in profiles table:", profileError);
    return false;
  }

  const userId = profile.id;
  console.log("✅ Found user ID:", userId);

  // Step 2: Check subscription status using user ID
  const { data: subscription, error: subError } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (subError || !subscription) {
    console.error("❌ Subscription not found or inactive:", subError);
    return false;
  }

  console.log("✅ Active subscription found:", subscription);
  return subscription.status === "active";
}
