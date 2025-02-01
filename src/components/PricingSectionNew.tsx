import React from 'react';
import { Check } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
import { convertPrice, formatPrice } from '../utils/currencyUtils';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase-client';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  priceUSD: number;
  description: string;
  features: PricingFeature[];
  chartLimit: number;
  highlighted?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'plan_Pl068ztAi9mX4o',
    name: 'Basic',
    priceUSD: 6.99,
    description: 'Perfect for beginners and casual traders',
    chartLimit: 75,
    features: [
      { text: 'Upload up to 75 charts per week', included: true },
      { text: 'Advanced pattern recognition', included: false },
      { text: 'Chart analysis with indicator', included: false },
    ],
  },
  {
    id: 'plan_Pl06njh855KGVZ',
    name: 'Pro',
    priceUSD: 12.99,
    description: 'For serious traders who need more power',
    chartLimit: 150,
    highlighted: true,
    features: [
      { text: 'Upload up to 150 charts per week', included: true },
      { text: 'Advanced pattern recognition', included: true },
      { text: 'Chart analysis with indicator', included: true },
    ],
  },
  {
    id: 'plan_Pl07O84sDPzQIN',
    name: 'Elite',
    priceUSD: 22.99,
    description: 'Maximum power for professional traders',
    chartLimit: 300,
    features: [
      { text: 'Upload up to 300 charts per week', included: true },
      { text: 'Advanced pattern recognition', included: true },
      { text: 'Chart analysis with indicator', included: true },
    ],
  },
];

export function PricingSection() {
  const { currency, loading } = useCurrency();
  const { user } = useAuth();

  const handleSubscribe = async (plan: PricingPlan) => {
    try {
      if (!user) {
        alert('Please sign in to subscribe.');
        return;
      }

      // Check if the user already has an active subscription
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (subscription) {
        alert('You already have an active subscription.');
        return;
      }

      // Create a subscription on the server
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId: plan.id, email: user.email }),
      });

      const { subscriptionId, razorpayKey } = await response.json();

      if (!subscriptionId) {
        alert('Failed to create subscription.');
        return;
      }

      // Open Razorpay Payment Page
      const options = {
        key: razorpayKey, // Razorpay Key ID from backend
        subscription_id: subscriptionId,
        name: 'Trading SaaS App',
        description: `Subscription for ${plan.name} Plan`,
        handler: function (response: any) {
          alert('Payment successful!');
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to process subscription. Please try again.');
    }
  };

  return (
    <div id="pricing" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Trading Edge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your trading needs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105 ${
                  plan.highlighted ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(convertPrice(plan.priceUSD, currency), currency)}
                    </span>
                    <span className="text-gray-600">/week</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full px-6 py-3 rounded-md font-medium transition-colors ${
                      plan.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </button>
                </div>

                <div className="border-t border-gray-100 px-8 py-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 mt-0.5 ${
                            feature.included ? 'text-green-500' : 'text-gray-300'
                          }`}
                        />
                        <span
                          className={feature.included ? 'text-gray-700' : 'text-gray-400'}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
