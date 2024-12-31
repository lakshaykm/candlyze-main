import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainApp } from './pages/MainApp';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { subscription } from './pages/subscription';
import { Privacy } from './pages/Privacy';
import { Refund } from './pages/Refund';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/subscription" element={<subscription />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
