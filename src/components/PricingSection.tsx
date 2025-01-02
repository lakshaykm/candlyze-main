import React from 'react';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Basic Plan',
    price: '$6.99/week',
    description: 'Perfect for beginners and casual traders',
    features: [
      'Upload 75 charts per month',
      'Detailed analysis of support and resistance levels',
      'Trend direction insights',
      'Pattern formation detection',
      'AI-powered real-time insights',
      'Basic email support'
    ],
    buttonText: 'Get Started'
  },
  {
    name: 'Pro Plan',
    price: '$12.99/week',
    description: 'Ideal for active traders',
    features: [
      'Upload 150 charts per month',
      'Advanced trend and pattern analysis',
      'Market momentum indicators',
      'Volatility analysis',
      'Breakout point detection',
      'AI-driven alerts',
      'Extended historical data',
      'Priority email support'
    ],
    buttonText: 'Upgrade to Pro'
  },
  {
    name: 'Elite Plan',
    price: '$22.99/week',
    description: 'For professional traders',
    features: [
      'Upload 300 charts per month',
      'Comprehensive pattern recognition',
      'Full historical data access',
      'Advanced AI predictions',
      'Market forecasts',
      'Exclusive trading insights',
      'Priority 24/7 support',
      'Custom analysis reports'
    ],
    buttonText: 'Go Elite'
  }
];

export function PricingSection() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Trading Edge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your trading needs and take your analysis to the next level
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {plan.price}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}