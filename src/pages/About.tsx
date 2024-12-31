import React from 'react';
import { PageLayout } from './PageLayout';

export function About() {
  return (
    <PageLayout title="About Us">
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">Effective Date: 28/12/2024</p>

        <p className="mb-8">At CandlyzeAI, we believe in empowering traders, investors, and financial analysts by providing an intuitive and powerful platform for detailed candlestick chart analysis. Our cutting-edge AI-driven tool simplifies complex financial data, helping you make informed decisions with ease and precision.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">1. Our Story</h2>
        <p>CandlyzeAI was founded with one core mission: to revolutionize the way traders and analysts interact with candlestick charts. Trading can be a challenging experience, especially for those new to technical analysis. We started CandlyzeAI to help simplify this process and provide actionable insights using artificial intelligence.

With a team of passionate professionals in AI, finance, and technology, we have built a platform designed to meet the needs of both novice and experienced traders, making candlestick chart analysis accessible to everyone.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">2. Our Mission</h2>
        <p>At CandlyzeAI, our mission is to simplify trading and investing, actionable insights by leveraging the power of AI. We aim to equip our users with the tools they need to succeed in the fast-paced financial markets, enabling them to trade smarter and more effectively.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">3. What We Do?</h2>
        <p>We provide analysis based on the candlestick charts you upload. Please note that our platform only analyzes the patterns and trends shown in the screenshots you provide. We do not offer personalized financial advice or predictions based on external factors beyond the data presented in the charts.

Disclaimer: CandlyzeAI does not provide financial advice, nor are we responsible for any financial losses incurred from the use of our analysis. The charts we analyze are for informational purposes only and should not be interpreted as investment recommendations. Always conduct your own research or consult with a licensed financial advisor before making any trading or investment decisions.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">4. Subscription Plans</h2>
        <p>We offer flexible subscription plans designed to meet the needs of different traders:

Basic Plan: Ideal for beginners or long-term investors, offering essential features to get started with candlestick chart analysis.
Pro Plan: For intermediate users, offering advanced analysis tools and additional AI-powered insights.
Elite Plan: For advanced traders, offering premium features, in-depth analytics, and exclusive access to AI-driven forecasts.
Each plan is designed to scale with your trading needs, giving you the right set of tools for your journey.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">Contact Us</h2>
        <p>If you have any questions about this Refund Policy or need assistance with canceling your subscription, please contact us at:</p>
        
        <div className="mt-4">
          <p className="font-semibold">CandlyzeAI</p>
          <p>Email: support@candlyzeai.com</p>
        </div>
      </div>
    </PageLayout>
  );
}
