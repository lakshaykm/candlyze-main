const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.VITE_RAZORPAY_KEY_ID,
    key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
});

// Route to create a new subscription
app.post("/create-subscription", async (req, res) => {
    try {
        const { planId, customerEmail } = req.body;

        const subscription = await razorpay.subscriptions.create({
            plan_id: planId, // Pass Razorpay Plan ID
            customer_notify: 1,
            total_count: 12, // Number of billing cycles (monthly)
            notes: { email: customerEmail },
        });

        res.json({ subscriptionId: subscription.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to verify payment (Webhook endpoint)
app.post("/verify-payment", async (req, res) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const crypto = require("crypto");

        const shasum = crypto.createHmac("sha256", secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (digest === req.headers["x-razorpay-signature"]) {
            console.log("Payment is verified", req.body);
            res.json({ status: "success" });
        } else {
            res.status(400).json({ error: "Invalid signature" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
