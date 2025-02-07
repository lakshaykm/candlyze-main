const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require("body-parser");
const crypto = require("crypto");
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase
const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use a secure env variable
);

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.VITE_RAZORPAY_KEY_ID,
    key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
});

// Route to check subscription status
app.get("/check-subscription", async (req, res) => {
    const { email } = req.query;

    try {
        // Fetch user subscription data from Supabase
        const { data, error } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("email", email)
            .eq("status", "active");

        if (error) throw error;
        
        const isActive = data.length > 0;
        res.json({ isActive });
    } catch (error) {
        console.error("Error fetching subscription:", error);
        res.status(500).json({ isActive: false, error: "Failed to fetch subscription" });
    }
});

// Route to create a new subscription
app.post("/create-subscription", async (req, res) => {
    try {
        const { planId, customerEmail, userId } = req.body;

        const subscription = await razorpay.subscriptions.create({
            plan_id: planId, // Razorpay Plan ID
            customer_notify: 1,
            total_count: 12, // Number of billing cycles (monthly)
            notes: { email: customerEmail, user_id: userId },
        });

        res.json({ subscriptionId: subscription.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Razorpay Webhook Endpoint for Payment Confirmation
app.post("/webhook", async (req, res) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const signature = req.headers["x-razorpay-signature"];
        const body = JSON.stringify(req.body);

        // Verify Razorpay Signature
        const expectedSignature = crypto.createHmac("sha256", secret)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            return res.status(400).json({ error: "Invalid signature" });
        }

        const event = req.body;

        if (event.event === "subscription.activated") {
            const userId = event.payload.subscription.entity.notes.user_id;
            const email = event.payload.subscription.entity.notes.email;
            const planId = event.payload.subscription.entity.plan_id;

            // Update Supabase to mark subscription as active
            const { data, error } = await supabase
                .from("subscriptions")
                .insert([{ 
                    user_id: userId,
                    email: email,
                    status: "active",
                    plan_id: planId,
                    start_date: new Date()
                }]);

            if (error) throw error;
            console.log("Subscription activated:", data);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
