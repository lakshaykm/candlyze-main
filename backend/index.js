require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
//require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service Role Key for unrestricted access
);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
});



app.get("/test", (req, res) => {
  res.send("✅ Server is running!");
});


// Check user subscription status
app.get("/check-subscription", async (req, res) => {
  const { email } = req.query;
  try {
    // Fetch user subscription from Supabase
    const { data, error } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", email)
      .single();

    if (error || !data) {
      return res.json({ isActive: false, error: "No active subscription found" });
    }

    res.json({ isActive: data.status === "active" });
  } catch (error) {
    console.error("Error checking subscription:", error);
    res.status(500).json({ isActive: false, error: "Failed to fetch subscription" });
  }
});

// Create new subscription
app.post("/create-subscription", async (req, res) => {
  try {
    const { planId, customerEmail } = req.body;

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // Monthly billing for a year
      notes: { email: customerEmail },
    });

    res.json({ subscriptionId: subscription.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Razorpay Webhook to verify payment and update subscription
app.post("/verify-payment", async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const { payload } = req.body;
    const subscriptionData = payload.subscription.entity;

    const razorpay_subscription_id = subscriptionData.id;
    const status = subscriptionData.status;
    const plan_id = subscriptionData.plan_id;
    const amount = subscriptionData.plan.amount / 100;
    const customerEmail = subscriptionData.notes.email;

    // Get user_id from Supabase using email
    const { data: userData, error: userError } = await supabase
      .from("auth.users")
      .select("id")
      .eq("email", customerEmail)
      .single();

    if (userError || !userData) {
      return res.status(400).json({ error: "User not found" });
    }

    const user_id = userData.id;

    // Insert subscription into Supabase
    const { error: insertError } = await supabase
      .from("subscriptions")
      .insert([
        {
          user_id,
          plan_id,
          status,
          amount,
          razorpay_subscription_id,
        },
      ]);

    if (insertError) {
      console.error("Error inserting subscription:", insertError);
      return res.status(500).json({ error: "Failed to insert subscription" });
    }

    res.json({ status: "success" });
  } catch (error) {
    console.error("Error in verify-payment:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log("Server running on port 5000"));
