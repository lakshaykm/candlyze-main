import React, { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../hooks/useCurrency";
import { convertPrice, formatPrice } from "../utils/currencyUtils";
import { useAuth } from "../hooks/useAuth";

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
    id: "plan_Pl068ztAi9mX4o",
    name: "Basic",
    priceUSD: 6.99,
    description: "Perfect for beginners and casual traders",
    chartLimit: 75,
    features: [
      { text: "Upload up to 75 charts per week", included: true },
      { text: "Key Support and Resistance levels", included: true },
      { text: "Trend direction analysis", included: true },
      { text: "Historical data access", included: true },
      { text: "Basic historical data access", included: true },
      { text: "24/7 Email support", included: true },
      { text: "Advanced pattern recognition", included: false },
      { text: "Chart analysis with indicator", included: false },
      { text: "Advanced Price Prediction", included: false },
    ],
  },
  {
    id: "plan_Pl06njh855KGVZ",
    name: "Pro",
    priceUSD: 12.99,
    description: "For serious traders who need more power",
    chartLimit: 150,
    highlighted: true,
    features: [
      { text: "Upload up to 150 charts per week", included: true },
      { text: "Key Support and Resistance levels", included: true },
      { text: "Trend direction analysis", included: true },
      { text: "Historical data access", included: true },
      { text: "Basic historical data access", included: true },
      { text: "24/7 Email support", included: true },
      { text: "Advanced pattern recognition", included: true },
      { text: "Chart analysis with indicator", included: true },
      { text: "Advanced Price Prediction", included: false },
    ],
  },
  {
    id: "plan_Pl07O84sDPzQIN",
    name: "Elite",
    priceUSD: 22.99,
    description: "Maximum power for professional traders",
    chartLimit: 300,
    features: [
      { text: "Upload up to 300 charts per week", included: true },
      { text: "Key Support and Resistance levels", included: true },
      { text: "Trend direction analysis", included: true },
      { text: "Historical data access", included: true },
      { text: "Basic historical data access", included: true },
      { text: "24/7 Email support", included: true },
      { text: "Advanced pattern recognition", included: true },
      { text: "Chart analysis with indicator", included: true },
      { text: "Advanced Price Prediction", included: true },
    ],
  },
];

export function PricingSection() {
  const { currency, loading } = useCurrency();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingPayment, setLoadingPayment] = useState(false);

  const handleSubscribe = async (plan: PricingPlan) => {
    if (!user) {
      localStorage.setItem("selectedPlan", JSON.stringify(plan));
      navigate("/signin");
      return;
    }

    setLoadingPayment(true);

    try {
      const response = await fetch("https://candlyze-main-1.onrender.com/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, customerEmail: user.email }),
      });

      const data = await response.json();
      setLoadingPayment(false);

      if (data.subscriptionId) {
        const options = {
          key: "rzp_test_olwgvDPZtHPkhp", // Replace with your actual Razorpay Key ID
          subscription_id: data.subscriptionId,
          name: "CandlyzeAI",
          description: "Subscription Payment",
          handler: function (response: any) {
            console.log("Payment successful", response);
            alert("Subscription successful!");
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      setLoadingPayment(false);
      console.error("Error creating subscription", error);
      alert("Failed to process subscription. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a plan that best fits your trading needs
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
                  plan.highlighted ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
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
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                    disabled={loadingPayment}
                  >
                    {loadingPayment ? "Processing..." : "Get Started"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
