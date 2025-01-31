import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SubscriptionPlans } from '../components/SubscriptionPlans';

export function SubscriptionPlansPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h1>
          <SubscriptionPlans />
        </div>
      </main>
      <Footer />
    </div>
  );
}
