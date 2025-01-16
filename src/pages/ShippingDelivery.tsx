import React from 'react';
import { PageLayout } from './PageLayout';
import { PageTransition } from '../components/PageTransition';

export function ShippingDelivery() {
  return (
    <PageTransition>
      <PageLayout title="Shipping and Delivery">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Last Updated: 29/12/2024</p>

          <h1 className="text-3xl font-bold mb-6">Shipping and Delivery Policy</h1>

          <p className="mb-8">Welcome to CandlyzeAI! We strive to ensure a seamless and efficient experience for all our subscribers. Below, you'll find details about our shipping and delivery policies:</p>

          <h2 className="text-xl font-bold mt-8 mb-4">Digital Product Delivery</h2>
          <p>As a subscription-based service, CandlyzeAI offers digital products and services exclusively. Once your subscription is confirmed, you will receive instant access to the features and resources included in your chosen plan.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">Access to Services</h2>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-2">Instant Access: After successful payment, your account will automatically gain access to all subscription features.</li>
            <li className="mb-2">Confirmation Email: A confirmation email will be sent to the registered email address, including details of your subscription and login credentials, if applicable.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">No Physical Shipping</h2>
          <p>Since our offerings are entirely digital, no physical shipping is required. If you have concerns about accessing our services or receiving confirmation emails, please reach out to our support team.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">Subscription Upgrades and Downgrades</h2>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-2">Upgrades to higher-tier plans are processed immediately after payment confirmation.</li>
            <li className="mb-2">Downgrades will take effect at the end of your current billing cycle.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">Troubleshooting Access Issues</h2>
          <p>If you experience any delays or problems accessing your subscription, please:</p>
          <ol className="list-decimal ml-6 mb-4">
            <li className="mb-2">Check your spam or junk folder for the confirmation email.</li>
            <li className="mb-2">Ensure the payment was successfully processed.</li>
            <li className="mb-2">Contact our customer support team at support@candlyzeai.com for further assistance.</li>
          </ol>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-blue-800">Need Help?</p>
            <p className="text-blue-700">If you have any questions about our shipping and delivery policy, please contact our support team at:</p>
            <p className="text-blue-700 mt-2">Email: support@candlyzeai.com</p>
          </div>
        </div>
      </PageLayout>
    </PageTransition>
  );
}
