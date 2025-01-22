const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createSubscription = async (req, res) => {
    const { planId } = req.body;
    try {
        const subscription = await razorpayInstance.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: 12,
        });
        res.status(200).json({ success: true, subscriptionId: subscription.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
