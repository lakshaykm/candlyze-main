import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

export default function App() {
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
      <Route path="/terms" element={<Terms />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
