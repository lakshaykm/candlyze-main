import { supabase } from '../lib/supabase-client';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_URL = import.meta.env.VITE_API_URL;

interface PaymentOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  orderId: string;
  email: string;
  contact: string;
}

export async function initializePayment(options: PaymentOptions) {
  try {
    if (!window.Razorpay) {
      throw new Error('Razorpay SDK not loaded');
    }

    const razorpayOptions = {
      key: RAZORPAY_KEY_ID,
      amount: options.amount * 100, // Razorpay expects amount in paise
      currency: options.currency,
      name: options.name,
      description: options.description,
      order_id: options.orderId,
      prefill: {
        email: options.email,
        contact: options.contact,
      },
      handler: async function(response: any) {
        try {
          // Verify payment
          const verifyResponse = await fetch(`${API_URL}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          // Update payment status in your database
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          await supabase
            .from('payments')
            .insert({
              user_id: user.id,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              amount: options.amount,
              status: 'completed'
            });

          return { success: true, paymentId: response.razorpay_payment_id };
        } catch (error) {
          console.error('Payment verification error:', error);
          throw error;
        }
      },
      theme: {
        color: '#2563EB'
      }
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
    
    return new Promise((resolve, reject) => {
      razorpay.on('payment.success', resolve);
      razorpay.on('payment.error', reject);
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
}

export async function createOrder(amount: number, currency: string = 'INR') {
  try {
    const response = await fetch(`${API_URL}/api/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
}
