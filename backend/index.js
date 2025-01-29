const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

app.use("/payment", require("./src/components/payment"));

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: '*', // Update this with your frontend URL in production
  credentials: true
}));

app.use(express.json());

// Add health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'CandlyzeAI Backend',
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID ? 'configured' : 'missing',
      keySecret: process.env.RAZORPAY_KEY_SECRET ? 'configured' : 'missing'
    }
  });
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Add a test endpoint to verify Razorpay credentials
app.get('/api/test-razorpay', async (req, res) => {
  try {
    // Try to fetch a list of plans to verify credentials
    const plans = await razorpay.plans.all();
    res.json({ 
      status: 'success',
      message: 'Razorpay credentials are valid',
      plans_count: plans.count
    });
  } catch (error) {
    console.error('Razorpay test error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Razorpay credentials are invalid',
      error: error.message
    });
  }
});

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment endpoint
app.post('/api/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
