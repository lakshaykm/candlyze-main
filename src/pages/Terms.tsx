import React from 'react';
import { PageLayout } from './PageLayout';

export function Terms() {
  return (
    <PageLayout title="Terms & Conditions">
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">Last Updated: 29/12/2024</p>

        <p className="mb-8">Welcome to CandlyzeAI. By using our service, you agree to the following Terms & Conditions. If you do not agree, please refrain from using the Service.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using CandlyzeAI, you agree to comply with and be legally bound by these Terms & Conditions. We reserve the right to update or change these Terms at any time. Please check this page periodically for updates.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">2. Service Description</h2>
        <p>CandlyzeAI provides candlestick chart analysis. Users can upload images of their charts, and we provide detailed analysis based on the uploaded chart. The Service is intended for informational purposes only and should not be considered financial advice.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">3. Account Registration</h2>
        <p>To use certain features of the Service, you may need to create an account. You agree to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Provide accurate information during registration.</li>
          <li>Keep your account details confidential.</li>
          <li>Notify us immediately if you suspect any unauthorized access to your account.</li>
        </ul>
        <p>You are responsible for all activities that occur under your account.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">4. Uploading Charts</h2>
        <p>When you upload a chart, you grant us permission to analyze it and provide the requested analysis. You confirm that you own the rights to the chart or have permission to use it. We do not store your chart data long-term unless explicitly stated.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">5. User Responsibilities</h2>
        <p>You agree not to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Use the Service for any unlawful or fraudulent purposes.</li>
          <li>Upload any content that violates the rights of others or is offensive.</li>
          <li>Attempt to disrupt or interfere with the Service's functionality.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">6. Pricing and Payments</h2>
        <p>You agree to pay the fees associated with the services you select. Payments will be processed through Paddle payment gateway, and are subject to their terms and conditions.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">7. Disclaimers</h2>
        <p>The analysis provided by CandlyzeAI is based on historical data and patterns and is for informational purposes only. We do not guarantee the accuracy of the analysis or that it will lead to profitable outcomes. All decisions based on the analysis are at your own risk.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
        <p>We are not responsible for any loss or damage that occurs from using the Service, including financial losses or errors in the analysis. The Service is provided "as is," and we disclaim all warranties.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">9. Privacy Policy</h2>
        <p>Your use of the Service is also governed by our Privacy Policy, which explains how we collect and use your data. Please read it carefully.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">10. Termination</h2>
        <p>We may suspend or terminate your access to the Service if you violate these Terms. Upon termination, you must stop using the Service and destroy any materials obtained from it.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">11. Contact Us</h2>
        <p>If you have any questions or concerns about these Terms, please contact us at:</p>
        <p>Email: support@candlyzeai.com</p>

        <p className="mt-8">By using CandlyzeAI, you confirm that you have read and agree to these Terms & Conditions.</p>
      </div>
    </PageLayout>
  );
}