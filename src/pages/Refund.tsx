import React from 'react';
import { PageLayout } from './PageLayout';

export function Refund() {
  return (
    <PageLayout title="Refund Policy">
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">Effective Date: 28/12/2024</p>

        <p className="mb-8">At CandlyzeAI, we strive to provide the best service possible to our users. By subscribing to our service, you agree to the terms of this Refund Policy. Please read it carefully.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">1. No Refund Policy</h2>
        <p>All payments made to CandlyzeAI are non-refundable. Once a payment has been processed, it is final, and no refunds will be issued under any circumstances.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">2. Subscription Cancellation</h2>
        <p>While we do not offer refunds, we understand that circumstances may change, and you may no longer wish to use our service. If you decide that you no longer want to use CandlyzeAI, you can cancel your subscription at any time before the next billing cycle to avoid future charges.</p>

        <h3 className="text-lg font-semibold mt-6 mb-3">How to Cancel Your Subscription:</h3>
        <p>To cancel your subscription, please contact us at support@candlyzeai.com</p>

        <h2 className="text-xl font-bold mt-8 mb-4">3. Subscription Renewal</h2>
        <p>Subscriptions to CandlyzeAI are automatically renewed at the end of each billing cycle unless canceled by the user. By canceling your subscription, you will stop the renewal process, and your subscription will not renew for the next term.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">4. Changes to the Refund Policy</h2>
        <p>CandlyzeAI reserves the right to update or modify this Refund Policy at any time. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this policy periodically for any updates.</p>

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