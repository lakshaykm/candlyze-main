 // Updated webhookController.js
exports.handleWebhook = async (req, res) => {
  console.log("🔹 Webhook received:", JSON.stringify(req.body, null, 2)); // ✅ Log full payload

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const receivedSignature = req.headers["x-razorpay-signature"];

  try {
    const isValid = Razorpay.validateWebhookSignature(
      JSON.stringify(req.body),
      receivedSignature,
      webhookSecret
    );

    if (!isValid) {
      console.error("❌ Invalid webhook signature");
      return res.status(400).send("Invalid webhook signature");
    }

    console.log("✅ Webhook signature verified");

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === "subscription.charged" || event === "subscription.activated") {
      const subscriptionId = payload.subscription.entity.id;
      const status = payload.subscription.entity.status;
      const planId = payload.subscription.entity.plan_id;
      const amount = payload.subscription.entity.total_amount / 100;
      const email = payload.subscription.entity.notes.email;

      console.log("Extracted Subscription ID:", subscriptionId);
      console.log("Status:", status);
      console.log("Plan ID:", planId);
      console.log("Email:", email);
      console.log("Total Amount:", amount);

      const { data: user, error: userError } = await supabase
        .from("profiles") // ✅ Ensure it uses profiles
        .select("id, email") // ✅ Explicitly select fields
        .eq("email", email)
        .single();

      if (userError || !user) {
        console.error("User not found:", userError);
        return res.status(400).json({ error: "User not found in Supabase" });
      }

      const userId = user.id;
      console.log("User found in Supabase:", user);
      
      const { error } = await supabase.from("subscriptions").upsert([
        {
          user_id: userId,
          plan_id: planId,
          status: status,
          amount: amount,
          razorpay_subscription_id: subscriptionId,
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("❌ Error inserting subscription:", error);
        return res.status(500).json({ error: "Failed to save subscription" });
      } else {
        console.log("✅ Subscription inserted successfully");
      }
    }
    res.status(200).send("Webhook processed successfully");
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    res.status(500).send("Internal server error");
  }
};
