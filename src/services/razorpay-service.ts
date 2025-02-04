import { supabase } from '../lib/supabase-client';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_URL = import.meta.env.VITE_API_URL;

// Map plan IDs to Razorpay plan IDs
const PLAN_TO_RAZORPAY_MAP: Record<string, string> = {
  'basic': 'plan_MxEXwgmPWHBVZr',  // Weekly Basic Plan
  'pro': 'plan_MxEY9HwJ7VMz2p',    // Weekly Pro Plan
  'elite': 'plan_MxEYRBHwgCZKMv'   // Weekly Elite Plan
};

// Map plan IDs to credit amounts
const PLAN_CREDITS: Record<string, number> = {
  'basic': 7500,    // 75 charts per week
  'pro': 15000,     // 150 charts per week
  'elite': 30000    // 300 charts per week
};

interface Plan {
  id: string;
  name: string;
  priceUSD: number;
  description: string;
  chartLimit: number;
}

interface Subscription {
  id: string;
  status: string;
  plan_id: string;
  razorpay_subscription_id: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export async function checkActiveSubscription(userId: string): Promise<Subscription | null> {
  try {
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      throw error;
    }

    return subscription;
  } catch (error) {
    console.error('Error checking subscription:', error);
    throw error;
  }
}

export async function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

export async function createSubscription(plan: Plan, email: string, name: string) {
  try {
    await loadRazorpayScript();
    
    if (!window.Razorpay) {
      throw new Error('Razorpay failed to load');
    }

    if (!RAZORPAY_KEY_ID) {
      throw new Error('Razorpay key is not configured');
    }

    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if user already has an active subscription
    const activeSubscription = await checkActiveSubscription(user.id);
    if (activeSubscription) {
      throw new Error('You already have an active subscription');
    }

    const razorpayPlanId = PLAN_TO_RAZORPAY_MAP[plan.id];
    if (!razorpayPlanId) {
      throw new Error('Invalid plan selected');
    }

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

    // Create Razorpay subscription
    const response = await fetch(`${API_URL}/api/create-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan_id: razorpayPlanId,
        subscription_id: subscription.id,
        amount: plan.priceUSD * 100
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create subscription');
    }

    const { subscription: razorpaySubscription } = await response.json();

    // Initialize Razorpay checkout
    const options = {
      key: RAZORPAY_KEY_ID,
      subscription_id: razorpaySubscription.id,
      name: 'CandlyzeAI',
      description: `${plan.name} Plan Subscription`,
      handler: async function(response: any) {
        try {
          // Verify payment on the backend
          const verifyResponse = await fetch(`${API_URL}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          // Update subscription status
          const { error: updateSubError } = await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              razorpay_subscription_id: response.razorpay_subscription_id
            })
            .eq('id', subscription.id)
            .eq('user_id', user.id);

          if (updateSubError) throw updateSubError;

          // Update user credits
          const { error: updateCreditsError } = await supabase
            .from('user_credits')
            .upsert({
              user_id: user.id,
              credits: PLAN_CREDITS[plan.id] || 0,
              plan: plan.name
            });

          if (updateCreditsError) throw updateCreditsError;

          // Show success message and redirect
          alert('Subscription activated successfully! Redirecting to app...');
          window.location.href = '/app';
        } catch (error) {
          console.error('Error in payment handler:', error);
          alert('Payment processed but activation failed. Please contact support.');
          
          // Log the error details for debugging
          const errorDetails = error instanceof Error ? error.message : 'Unknown error';
          console.error('Detailed error:', errorDetails);
        }
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
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert('Failed to create subscription. Please try again.');
    }
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Cancel subscription with Razorpay
    const response = await fetch(`${API_URL}/api/cancel-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription_id: subscriptionId })
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription with Razorpay');
    }

    // Update subscription status in database
    const { error: updateSubError } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('id', subscriptionId)
      .eq('user_id', user.id);

    if (updateSubError) throw updateSubError;

    // Reset user credits
    const { error: updateCreditsError } = await supabase
      .from('user_credits')
      .update({ 
        credits: 0,
        plan: 'Free'
      })
      .eq('user_id', user.id);

    if (updateCreditsError) throw updateCreditsError;

  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
}
