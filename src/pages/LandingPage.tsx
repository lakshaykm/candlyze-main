import React from 'react';
import { ArrowRight, BarChart2, LineChart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { PricingSection } from '../components/PricingSection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Candlestick Chart Analysis
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get instant, accurate analysis of your trading charts powered by advanced AI technology.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <LineChart className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pattern Recognition</h3>
            <p className="text-gray-600">
              Instantly identify key candlestick patterns and formations in your charts.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
            <p className="text-gray-600">
              Get detailed trend analysis with support and resistance levels.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BarChart2 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Price Targets</h3>
            <p className="text-gray-600">
              Receive AI-generated price targets based on chart patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />
    </div>
  );
}