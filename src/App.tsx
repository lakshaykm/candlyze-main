import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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



const App: React.FC = () => {
  const plans = [
    { name: 'Basic', price: 581.01 },
    { name: 'Pro', price: 1079.73 },
    { name: 'Elite', price: 1910.93 },
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Choose Your Subscription Plan</h1>
      {plans.map((plan) => (
        <Payment key={plan.name} planName={plan.name} planPrice={plan.price} />
      ))}
    </div>
  );
};




export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateLastVisitedPage } = useAuth();

  useEffect(() => {
    // Update last visited page when location changes
    if (location.pathname.startsWith('/app')) {
      updateLastVisitedPage(location.pathname);
    }
    if (user && location.pathname === '/signin') {
      const selectedPlan = localStorage.getItem('selectedPlan');
      if (selectedPlan) {
        const plan = JSON.parse(selectedPlan);
        localStorage.removeItem('selectedPlan');
        navigate('/payment', { state: { plan } });
      } else {
        navigate('/app');
      }
    }
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
