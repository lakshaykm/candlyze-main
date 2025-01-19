import { supabase } from '../lib/supabase-client';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

interface Plan {
  id: string;
  name: string;
  priceUSD: number;
  description: string;
  chartLimit: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export async function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

export async function createSubscription(plan: Plan, email: string, name: string) {
  try {
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Create a subscription record in pending state
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan_id: plan.id,
        status: 'pending',
        amount: plan.priceUSD * 100 // Convert to cents
      })
      .select()
      .single();

    if (subError) throw subError;

    // Create Razorpay order
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan_id: plan.id,
        subscription_id: subscription.id,
        amount: plan.priceUSD * 100
      })
    });

    const { order } = await response.json();

    // Initialize Razorpay checkout
    const options = {
      key: RAZORPAY_KEY_ID,
      subscription_id: order.id,
      name: 'CandlyzeAI',
      description: `${plan.name} Plan Subscription`,
      image: 'https://your-logo-url.png',
      handler: async function(response: any) {
        // Verify payment on the backend
        await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
            subscription_id: subscription.id
          })
        });

        // Update subscription status
        await supabase
          .from('subscriptions')
          .update({ 
            status: 'active',
            razorpay_subscription_id: response.razorpay_subscription_id
          })
          .eq('id', subscription.id);

        // Update user credits
        await supabase
          .from('user_credits')
          .upsert({
            user_id: user.id,
            credits: plan.chartLimit,
            plan: plan.name
          });
      },
      prefill: {
        name,
        email
      },
      theme: {
        color: '#2563EB'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription_id: subscriptionId })
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    // Update subscription status in database
    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('id', subscriptionId);

  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
}
