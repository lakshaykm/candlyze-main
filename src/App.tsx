import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LandingPage } from './pages/LandingPage';
import { Features } from './pages/Features';
import { About } from './pages/About';
import { MainApp } from './pages/MainApp';
import { Terms } from './pages/Terms';
import { Subscription } from './pages/Subscription';
import { Privacy } from './pages/Privacy';
import { Refund } from './pages/Refund';
import { Contact } from './pages/Contact';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { KeyLevelsAnalysis } from './pages/KeyLevelsAnalysis';
import { TrendAnalysis } from './pages/TrendAnalysis';
import { PatternRecognition } from './pages/PatternRecognition';
import { IndicatorAnalysis } from './pages/IndicatorAnalysis';
import { PricePrediction } from './pages/PricePrediction';
import { ShippingDelivery } from './pages/ShippingDelivery';
import { AnalysisHistory } from './pages/AnalysisHistory';
import { Payment } from './components/Payment';
import { supabase } from './lib/supabase-client';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateLastVisitedPage } = useAuth();

  React.useEffect(() => {
    // Update last visited page when location changes
    if (location.pathname.startsWith('/app')) {
      updateLastVisitedPage(location.pathname);
    }

    const checkUserAndSubscription = async () => {
      if (user) {
        try {
          // Check if user has an active subscription
          const { data: subscription, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .single();

          if (error) {
            console.error('Error checking subscription:', error);
          }

          // Get selected plan from localStorage
          const selectedPlan = localStorage.getItem('selectedPlan');

          // If user is trying to access app routes without subscription
          if (location.pathname.startsWith('/app')) {
            if (!subscription) {
              if (selectedPlan) {
                // If they have a selected plan, send them to payment
                const plan = JSON.parse(selectedPlan);
                navigate('/payment', { state: { plan } });
              } else {
                // If no plan is selected, send them to subscription page
                navigate('/subscription');
              }
              return;
            }
          }

          // Handle post-signin flow
          if (location.pathname === '/signin' || location.pathname === '/signup') {
            if (!subscription && selectedPlan) {
              // No active subscription and coming from pricing - go to payment
              const plan = JSON.parse(selectedPlan);
              localStorage.removeItem('selectedPlan');
              navigate('/payment', { state: { plan } });
            } else if (subscription) {
              // Has active subscription - go to app
              navigate('/app');
            }
          }
        } catch (error) {
          console.error('Error in subscription check:', error);
        }
      }
    };

    checkUserAndSubscription();
  }, [location, updateLastVisitedPage, user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/app" element={<MainApp />} />
      <Route path="/app/analysis/key-levels" element={<KeyLevelsAnalysis />} />
      <Route path="/app/analysis/trend" element={<TrendAnalysis />} />
      <Route path="/app/analysis/patterns" element={<PatternRecognition />} />
      <Route path="/app/analysis/indicators" element={<IndicatorAnalysis />} />
      <Route path="/app/analysis/prediction" element={<PricePrediction />} />
      <Route path="/app/history" element={<AnalysisHistory />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/shipping-delivery" element={<ShippingDelivery />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}
