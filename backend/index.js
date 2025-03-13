require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

console.log("🚀 Server is starting...");

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log("✅ Express initialized");

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service Role Key for unrestricted access
);
console.log("✅ Supabase client initialized");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
});
console.log("✅ Razorpay instance initialized");

app.get("/test", (req, res) => {
  console.log("✅ /test route hit");
  res.send("✅ Server is running!");
});

// Check user subscription status
app.get("/check-subscription", async (req, res) => {
  const { email } = req.query;
  console.log("🔹 Checking subscription for:", email);
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", email)
      .single();

    if (error || !data) {
      console.error("❌ No active subscription found", error);
      return res.json({ isActive: false, error: "No active subscription found" });
    }

    console.log("✅ Subscription status retrieved:", data.status);
    res.json({ isActive: data.status === "active" });
  } catch (error) {
    console.error("❌ Error checking subscription:", error);
    res.status(500).json({ isActive: false, error: "Failed to fetch subscription" });
  }
});

// Create new subscription
app.post("/create-subscription", async (req, res) => {
  try {
    console.log("🔹 Received subscription creation request:", req.body);
    const { planId, customerEmail } = req.body;

    console.log("🔹 Creating subscription in Razorpay...");
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12,
      notes: { email: customerEmail },
    });

    console.log("✅ Razorpay subscription created:", subscription.id);
    res.json({ subscriptionId: subscription.id });
  } catch (error) {
    console.error("❌ Error creating subscription:", error);
    res.status(500).json({ error: error.message });
  }
});

// Razorpay Webhook to verify payment and update subscription
app.post("/verify-payment", async (req, res) => {
  try {
    console.log("🔹 Received webhook verification request");

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      console.error("❌ Invalid webhook signature");
      return res.status(400).json({ error: "Invalid signature" });
    }

    console.log("✅ Webhook payload received:", JSON.stringify(req.body, null, 2));

    const { event, payload } = req.body;

    if (!payload.subscription || !payload.subscription.entity) {
      console.error("❌ Subscription entity is missing from webhook payload");
      return res.status(400).json({ error: "Subscription entity missing" });
    }

    const subscriptionData = payload.subscription.entity;
    console.log("✅ Subscription Data:", subscriptionData);

    // Check what fields exist in the payload
    console.log("🔍 Subscription fields available:", Object.keys(subscriptionData));

    // Fix: Use amount_due if plan is missing
    const razorpay_subscription_id = subscriptionData.id;
    const status = subscriptionData.status;
    const plan_id = subscriptionData.plan_id || "UNKNOWN_PLAN"; // ✅ Handle missing plan_id
    const amount = subscriptionData.amount_due ? subscriptionData.amount_due / 100 : 0; // ✅ Fix for missing amount
    const customerEmail = subscriptionData.notes?.email || null; // ✅ Fix for missing email

    console.log("✅ Extracted Data:", { razorpay_subscription_id, status, plan_id, amount, customerEmail });

    if (!customerEmail) {
      console.error("❌ Error: Email is missing in webhook payload");
      return res.status(400).json({ error: "Customer email missing in webhook" });
    }

    // Fetch user from Supabase
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", customerEmail)
      .single();

    if (userError || !userData) {
      console.error("❌ User not found in Supabase:", userError);
      return res.status(400).json({ error: "User not found" });
    }

    const user_id = userData.id;
    console.log("✅ User found in Supabase:", user_id);

    // Insert or update subscription in Supabase
    const { error: insertError } = await supabase
      .from("subscriptions")
      .upsert([
        {
          user_id,
          plan_id,
          status,
          amount,
          razorpay_subscription_id,
        },
      ]);

    if (insertError) {
      console.error("❌ Error inserting subscription into Supabase:", insertError);
      return res.status(500).json({ error: "Failed to insert subscription" });
    }

    console.log("✅ Subscription successfully inserted into Supabase.");
    res.json({ status: "success" });

  } catch (error) {
    console.error("❌ Error in verify-payment:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
