require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
});

app.post("/verify-payment", async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      console.error("Invalid signature");
      return res.status(400).json({ error: "Invalid signature" });
    }

    const { payload } = req.body;
    const subscriptionData = payload.subscription.entity;
    const razorpay_subscription_id = subscriptionData.id;
    const status = subscriptionData.status;
    const plan_id = subscriptionData.plan_id;
    const amount = subscriptionData.plan.amount / 100;
    const customerEmail = subscriptionData.notes.email;

    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", customerEmail)
      .single();

    if (userError || !userData) {
      console.error("User not found", userError);
      return res.status(400).json({ error: "User not found" });
    }

    const user_id = userData.id;
    const { error: insertError } = await supabase.from("subscriptions").upsert([
      {
        user_id,
        plan_id,
        status,
        amount,
        razorpay_subscription_id,
        updated_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Error inserting subscription", insertError);
      return res.status(500).json({ error: "Failed to insert subscription" });
    }

    res.json({ status: "success" });
  } catch (error) {
    console.error("Error in verify-payment", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
