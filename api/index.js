import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));

app.use(express.json());

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a subscription
app.post('/api/create-subscription', async (req, res) => {
  try {
    const { plan_id, subscription_id, amount } = req.body;

    console.log('Creating subscription:', { plan_id, subscription_id, amount });

    const subscription = await razorpay.subscriptions.create({
      plan_id,
      total_count: 12, // 12 months
      quantity: 1,
      customer_notify: 1,
      notes: {
        subscription_id
      }
    });

    console.log('Subscription created:', subscription);
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

    console.log('Verifying payment:', {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature
    });

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      console.log('Payment verified successfully');
      res.json({ verified: true });
    } else {
      console.error('Invalid signature');
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
    console.log('Cancelling subscription:', subscription_id);
    
    const subscription = await razorpay.subscriptions.cancel(subscription_id);
    console.log('Subscription cancelled:', subscription);
    
    res.json({ subscription });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('API endpoints:');
  console.log('  - GET  /api/health');
  console.log('  - POST /api/create-subscription');
  console.log('  - POST /api/verify-payment');
  console.log('  - POST /api/cancel-subscription');
});
