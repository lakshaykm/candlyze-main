import React from 'react';
import { PageLayout } from './PageLayout';

export function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">Effective Date: 28/12/2024</p>

        <p className="mb-8">CandlyzeAI is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit and use our web application, CandlyzeAI.</p>

        <p className="mb-8">By using CandlyzeAI, you agree to the terms of this Privacy Policy. Please read it carefully.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect the following types of information when you use CandlyzeAI:</p>

        <h3 className="text-lg font-semibold mt-6 mb-3">a) Personal Information</h3>
        <p>Personal information is information that can be used to identify you. This may include:</p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Account Information:</strong> If you create an account with CandlyzeAI, we collect information such as your email address, username, and any other data you provide during registration.</li>
          <li><strong>Communication Data:</strong> We may collect data from your communications with us, such as emails, support inquiries, or feedback.</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-3">b) Usage Data</h3>
        <p>Usage data is automatically collected when you access CandlyzeAI. This may include:</p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Log Data:</strong> Your IP address, browser type, operating system, referring/exit pages, date and time of your visit, and other system activity.</li>
          <li><strong>Analytics:</strong> Data related to your interactions with the website, including the pages you visit, the features you use, and how long you spend on them.</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-3">c) Cookies and Tracking Technologies</h3>
        <p>We use cookies and similar tracking technologies to monitor activity on CandlyzeAI. Cookies help us improve your experience, provide personalized content, and understand user behavior. You can configure your browser to refuse cookies, but some parts of the Service may not function properly.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>To provide and improve the Service: We use your data to maintain and enhance the performance of CandlyzeAI, including features like chart analysis and user interactions.</li>
          <li>To communicate with you: We may send you emails or notifications regarding your account, service updates, or promotional materials (if you opt in).</li>
          <li>To analyze usage patterns: We use usage data and analytics to optimize the performance and usability of CandlyzeAI.</li>
          <li>To comply with legal obligations: We may use your data to comply with applicable laws, regulations, and enforce our Terms of Service.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">3. Sharing of Your Information</h2>
        <p>We do not sell or rent your personal information. However, we may share your information in the following cases:</p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Service Providers:</strong> We may share your data with third-party service providers who assist us in operating CandlyzeAI and providing services (e.g., hosting, analytics, customer support).</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you if this happens.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid legal requests, such as a court order or government inquiry.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">4. Data Security</h2>
        <p>We take reasonable precautions to protect your information from unauthorized access, alteration, or disclosure. However, no method of data transmission over the internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">5. Your Rights and Choices</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Access and Correction:</strong> You can request access to the personal information we hold about you and request corrections if any of the data is inaccurate.</li>
          <li><strong>Deletion:</strong> You can request the deletion of your personal information, subject to certain conditions and legal obligations.</li>
          <li><strong>Opt-out of Marketing Communications:</strong> You can unsubscribe from marketing emails by following the instructions in the email or contacting us directly.</li>
          <li><strong>Cookie Preferences:</strong> You can adjust your browser settings to block or delete cookies.</li>
        </ul>
        <p>If you would like to exercise any of these rights, please contact us at support@candlyzeai.com.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">6. Retention of Data</h2>
        <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When your information is no longer needed, we will delete or anonymize it.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
        <p>CandlyzeAI is not intended for use by individuals under the age of 18, and we do not knowingly collect personal information from children under 18. If we discover that we have inadvertently collected personal information from a child under 18, we will take steps to delete such information as soon as possible.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated Privacy Policy on this page and updating the "Effective Date" at the top. We encourage you to review this Privacy Policy periodically.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">9. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at:</p>
        <p className="mt-4">Email: support@candlyzeai.com</p>
      </div>
    </PageLayout>
  );
}