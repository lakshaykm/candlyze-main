import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase-client';
import { PageLayout } from '../pages/PageLayout';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const plan = location.state?.plan;

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (!plan) {
      navigate('/');
      return;
    }

    checkSubscription();
  }, [user, plan, navigate]);

  const checkSubscription = async () => {
    try {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .single();

      if (subscription) {
        navigate('/app');
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handlePayment = async () => {
    console.log('Checking Razorpay:', window.Razorpay);
    try {
      setLoading(true);

      // Create order
      const response = await fetch('https://candlyze-main-1.onrender.com/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: plan.priceUSD * 100,
          currency: 'INR',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();

      const options = {
        key: 'rzp_test_olwgvDPZtHPkhp',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'CandlyzeAI',
        description: `${plan.name} Plan Subscription`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            // Create subscription record
            const { error: subscriptionError } = await supabase
              .from('subscriptions')
              .insert({
                user_id: user?.id,
                plan_id: plan.id,
                status: 'active',
                amount: plan.priceUSD * 100,
                razorpay_subscription_id: response.razorpay_payment_id
              });

            if (subscriptionError) throw subscriptionError;

            // Update user credits
            const { error: creditsError } = await supabase
              .from('user_credits')
              .upsert({
                user_id: user?.id,
                credits: plan.chartLimit,
                plan: plan.name
              });

            if (creditsError) throw creditsError;

            navigate('/app');
          } catch (error) {
            console.error('Error updating subscription:', error);
            alert('Payment successful but failed to activate subscription. Please contact support.');
          }
        },
        prefill: {
          name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#2563EB'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <PageLayout title="Complete Your Subscription">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name} Plan</h2>
            <p className="text-gray-600">{plan.description}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subscription Price</span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{(plan.priceUSD * 82).toFixed(2)}/week
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            By subscribing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
