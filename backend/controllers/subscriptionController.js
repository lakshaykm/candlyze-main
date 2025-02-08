const Razorpay = require("razorpay");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createSubscription = async (req, res) => {
    const { planId, customerEmail } = req.body;

    try {
        const subscription = await razorpayInstance.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: 12,
            notes: { email: customerEmail },
        });

        // Fetch user by email
        const { data: user, error: userError } = await supabase
            .from("auth.users")
            .select("id")
            .eq("email", customerEmail)
            .single();

        if (userError || !user) {
            console.error("User not found:", userError);
            return res.status(400).json({ error: "User not found in Supabase" });
        }

        const userId = user.id;

        // Insert a pending subscription record in Supabase
        const { error } = await supabase.from("subscriptions").insert([
            {
                user_id: userId,
                plan_id: planId,
                status: "pending",
                amount: 0, // Will update after payment confirmation
                razorpay_subscription_id: subscription.id,
            }
        ]);

        if (error) {
            console.error("Error inserting subscription:", error);
            return res.status(500).json({ error: "Failed to insert subscription" });
        }

        res.status(200).json({ success: true, subscriptionId: subscription.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
