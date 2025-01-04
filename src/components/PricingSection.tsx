import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  chartLimit: number;
  highlighted?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '$6.99/week',
    description: 'Perfect for beginners and casual traders',
    chartLimit: 75,
    features: [
      { text: 'Upload up to 75 charts per week', included: true },
      { text: 'Key Support and Resistance levels', included: true },
      { text: 'Trend direction analysis', included: true },
      { text: 'Historical data access', included: true },
      { text: 'Basic historical data access', included: true },
      { text: '24/7 Email support', included: true },
      { text: 'Advanced pattern recognition', included: false }, 
      { text: 'Chart analysis with indicator', included: false },
      { text: 'Advanced Price Prediction', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$12.99/week',
    description: 'For serious traders who need more power',
    chartLimit: 150,
    highlighted: true,
    features: [
      { text: 'Upload up to 150 charts per week', included: true },
      { text: 'Key Support and Resistance levels', included: true },
      { text: 'Trend direction analysis', included: true },
      { text: 'Historical data access', included: true },
      { text: 'Basic historical data access', included: true },
      { text: '24/7 Email support', included: true },
      { text: 'Advanced pattern recognition', included: true }, 
      { text: 'Chart analysis with indicator', included: true },
      { text: 'Advanced Price Prediction', included: false },
    ],
  },
  {
    name: 'Elite',
    price: '$22.99/week',
    description: 'Maximum power for professional traders',
    chartLimit: 300,
    features: [
      { text: 'Upload up to 300 charts per week', included: true },
      { text: 'Key Support and Resistance levels', included: true },
      { text: 'Trend direction analysis', included: true },
      { text: 'Historical data access', included: true },
      { text: 'Basic historical data access', included: true },
      { text: '24/7 Email support', included: true },
      { text: 'Advanced pattern recognition', included: true }, 
      { text: 'Chart analysis with indicator', included: true },
      { text: 'Advanced Price Prediction', included: true },
    ],
  },
];

export function PricingSection() {
  return (
    <div id="pricing" className="bg-gray-50 py-20">
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
                    {plan.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link
                  to="/signup"
                  className={`block text-center px-6 py-3 rounded-md font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
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
                        className={
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }
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
      </div>
    </div>
  );
}
