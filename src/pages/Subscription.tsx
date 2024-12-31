import React from 'react';
import { PageLayout } from './PageLayout';

export function subscription() {
  return (
    <PageLayout title="Subscription Plans">
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">Effective Date: 28/12/2024</p>

        <p className="mb-8">We offer flexible subscription plans designed to meet the needs of different traders:</p>

        <h2 className="text-xl font-bold mt-8 mb-4">1. Basic Plan</h2>
        <p>Upload 75 Charts per Month: Upload up to 75 candlestick chart screenshots each month.
Detailed Analysis: Get insights on key support and resistance levels, trend direction, and pattern formations for each chart you upload.
AI-Powered Insights: Our AI provides real-time, actionable insights based on the patterns detected in the charts.
Affordable and Flexible: The Basic plan is an affordable option to get started with comprehensive chart analysis.
Price: $6.99/month
</p>

        <h2 className="text-xl font-bold mt-8 mb-4">2. Pro Plan</h2>
        <p>Upload 150 Charts per Month: Upload up to 150 candlestick chart screenshots every month for more in-depth analysis.
Advanced Analysis: In addition to the basic trend, level, and pattern analysis, the Pro plan includes more detailed insights into market momentum, volatility, and potential breakout points.
AI-Driven Alerts: Receive AI-powered notifications for key trends and patterns detected within your charts.
Extended Historical Data Access: Gain access to additional historical data to track your trades and learn from past patterns.
Price: $12.99/month</p>

        <h2 className="text-xl font-bold mt-8 mb-4">3. Elite Plan</h2>
        <p>Upload 300 Charts per Month: Upload up to 300 candlestick chart screenshots per month.
Comprehensive Analysis: Get full access to trend analysis, pattern recognition, and critical levels, with more granular detail to maximize your trading strategies.
Full Historical Data Access: Enjoy full access to historical data for extensive analysis, backtesting strategies, and improving trading decisions.
Priority Support: Elite users receive premium, priority support to ensure fast response times and personalized assistance.
Exclusive AI Insights: Access more in-depth AI-driven insights, including predictive trends, market forecasts, and advanced pattern identification to stay ahead of market changes.
Price: $22.99/month</p>
        
        <div className="mt-4">
          <p className="font-semibold">CandlyzeAI</p>
          <p>Email: support@candlyzeai.com</p>
        </div>
      </div>
    </PageLayout>
  );
}