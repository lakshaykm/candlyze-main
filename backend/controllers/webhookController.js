const Razorpay = require("razorpay");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handleWebhook = async (req, res) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers["x-razorpay-signature"];
    const isValid = Razorpay.validateWebhookSignature(
        JSON.stringify(req.body),
        receivedSignature,
        webhookSecret
    );

    if (!isValid) {
        return res.status(400).send("Invalid webhook signature");
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === "subscription.charged" || event === "subscription.activated") {
        const subscriptionId = payload.subscription.entity.id;
        const status = payload.subscription.entity.status;
        const planId = payload.subscription.entity.plan_id;
        const amount = payload.subscription.entity.total_amount / 100; // Convert from paise to INR
        const email = payload.subscription.entity.notes.email; // Get email from Razorpay notes

        // Fetch user by email
        const { data: user, error: userError } = await supabase
            .from("auth.users")
            .select("id")
            .eq("email", email)
            .single();

        if (userError || !user) {
            console.error("User not found:", userError);
            return res.status(400).json({ error: "User not found in Supabase" });
        }

        const userId = user.id;

        // Insert or update subscription details in Supabase
        const { error } = await supabase.from("subscriptions").upsert([
            {
                user_id: userId,
                plan_id: planId,
                status: status,
                amount: amount,
                razorpay_subscription_id: subscriptionId,
                updated_at: new Date().toISOString(),
            }
        ]);

        if (error) {
            console.error("Error saving subscription:", error);
            return res.status(500).json({ error: "Failed to save subscription" });
        }

        return res.status(200).send("Subscription updated successfully");
    }

    res.status(200).send("Webhook processed");
};
