import React from 'react';
import { PageLayout } from './PageLayout';
import { Mail, Clock, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <PageLayout title="Contact Us">
      <div className="prose prose-lg max-w-none">
        <p className="mb-8">We'd love to hear from you! Whether you have a question, feedback, or need assistance with our service, our team is here to help. Please find the various ways to get in touch with us below.</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">1. Business Address</h2>
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-gray-800">
                  Sector-25, Panchkula,<br />
                  Haryana, India 134116
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. General Inquiries</h2>
            <p>For general questions or information about CandlyzeAI, feel free to reach out to us via email:</p>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <a href="mailto:support@candlyzeai.com" className="text-blue-600 hover:text-blue-800">
                support@candlyzeai.com
              </a>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              We aim to respond to all inquiries within 24-48 hours on business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. Customer Support</h2>
            <p>If you need help with technical issues, account-related queries, or require assistance with using CandlyzeAI, please contact our customer support team:</p>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <a href="mailto:support@candlyzeai.com" className="text-blue-600 hover:text-blue-800">
                support@candlyzeai.com
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Business Hours</h2>
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-semibold">Monday to Friday:</p>
                <p>9:00 AM - 5:00 PM (IST)</p>
                <p className="mt-2 font-semibold">Saturday and Sunday:</p>
                <p>Closed</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-semibold">We look forward to hearing from you!</p>
        </div>
      </div>
    </PageLayout>
  );
}
