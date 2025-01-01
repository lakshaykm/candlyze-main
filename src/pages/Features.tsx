import React from 'react';
import { LineChart, TrendingUp, BarChart2, History, AlertTriangle, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export function Features() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Smart Trading
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how CandlyzeAI can help you make better trading decisions with our advanced features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<LineChart className="w-8 h-8 text-blue-600" />}
            title="Pattern Recognition"
            description="Advanced AI algorithms identify common and complex candlestick patterns with high accuracy."
          />
          
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
            title="Trend Analysis"
            description="Get detailed trend analysis with support and resistance levels identified automatically."
          />
          
          <FeatureCard
            icon={<BarChart2 className="w-8 h-8 text-blue-600" />}
            title="Price Targets"
            description="Receive AI-generated price targets based on historical patterns and current market conditions."
          />
          
          <FeatureCard
            icon={<History className="w-8 h-8 text-blue-600" />}
            title="Historical Analysis"
            description="Access your past analyses and track the accuracy of predictions over time."
          />
          
          <FeatureCard
            icon={<AlertTriangle className="w-8 h-8 text-blue-600" />}
            title="Risk Assessment"
            description="Get insights into potential risks and optimal position sizes for your trades."
          />
          
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-blue-600" />}
            title="Real-time Updates"
            description="Instant analysis of your charts with real-time pattern detection and alerts."
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}