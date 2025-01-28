import React, { useEffect, useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { PageTransition } from '../components/PageTransition';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase-client';
import { Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  created_at: string;
}

interface UserCredits {
  credits: number;
  plan: string;
}

export function SubscriptionPage() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubscriptionData() {
      try {
        if (!user) return;

        // Fetch active subscription
        const { data: subData, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (subError && subError.code !== 'PGRST116') {
          throw subError;
        }

        // Fetch user credits
        const { data: creditData, error: creditError } = await supabase
          .from('user_credits')
          .select('credits, plan')
          .eq('user_id', user.id)
          .single();

        if (creditError) throw creditError;

        setSubscription(subData);
        setCredits(creditData);
      } catch (err) {
        console.error('Error fetching subscription data:', err);
        setError('Failed to load subscription information');
      } finally {
        setLoading(false);
      }
    }

    fetchSubscriptionData();
  }, [user]);

  if (loading) {
    return (
      <PageTransition>
        <AppLayout>
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </AppLayout>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8">Subscription & Credits</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Current Plan */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Plan Type</span>
                <span className="font-medium">{credits?.plan || 'Free'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  subscription ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {subscription ? 'Active' : 'No Active Subscription'}
                </span>
              </div>
              {subscription && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium">
                    {new Date(subscription.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Credits */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Available Credits</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {credits?.credits || 0}
              </div>
              <p className="text-gray-600">Remaining Analysis Credits</p>
            </div>
          </div>

          {/* Plan Features */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Plan Features</h2>
            <ul className="space-y-3">
              {credits?.plan === 'Elite' ? (
                <>
                  <Feature text="Upload up to 300 charts per week" />
                  <Feature text="Advanced pattern recognition" />
                  <Feature text="Chart analysis with indicator" />
                  <Feature text="Advanced Price Prediction" />
                  <Feature text="Priority support" />
                </>
              ) : credits?.plan === 'Pro' ? (
                <>
                  <Feature text="Upload up to 150 charts per week" />
                  <Feature text="Advanced pattern recognition" />
                  <Feature text="Chart analysis with indicator" />
                  <Feature text="Basic historical data access" />
                </>
              ) : credits?.plan === 'Basic' ? (
                <>
                  <Feature text="Upload up to 75 charts per week" />
                  <Feature text="Key Support and Resistance levels" />
                  <Feature text="Trend direction analysis" />
                  <Feature text="Basic historical data access" />
                </>
              ) : (
                <li className="text-gray-600">No active plan features</li>
              )}
            </ul>
          </div>

          {/* Upgrade Button */}
          {(!subscription || credits?.plan !== 'Elite') && (
            <div className="mt-8 text-center">
              <Link
                to="/pricing"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upgrade Your Plan
              </Link>
            </div>
          )}
        </div>
      </AppLayout>
    </PageTransition>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
}
