import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a subscription
app.post('/api/create-subscription', async (req, res) => {
  try {
    const { plan_id, subscription_id, amount } = req.body;

    const subscription = await razorpay.subscriptions.create({
      plan_id,
      total_count: 12, // 12 months
      quantity: 1,
      customer_notify: 1,
      notes: {
        subscription_id
      }
    });

    res.json({ subscription });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature
    } = req.body;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel subscription
app.post('/api/cancel-subscription', async (req, res) => {
  try {
    const { subscription_id } = req.body;
    const subscription = await razorpay.subscriptions.cancel(subscription_id);
    res.json({ subscription });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook handler
app.post('/api/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const generatedSignature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature === generatedSignature) {
      const event = req.body;
      
      switch (event.event) {
        case 'subscription.charged':
          // Handle successful subscription payment
          break;
        case 'subscription.cancelled':
          // Handle subscription cancellation
          break;
        case 'subscription.paused':
          // Handle subscription pause
          break;
        case 'subscription.resumed':
          // Handle subscription resume
          break;
      }

      res.json({ received: true });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});