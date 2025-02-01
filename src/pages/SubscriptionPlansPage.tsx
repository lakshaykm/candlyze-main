import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingSectionNew } from '../components/PricingSectionNew';
import { UserMenu } from '../components/UserMenu';
import { useAuth } from '../hooks/useAuth';

export function SubscriptionPlansPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-end">
            <UserMenu 
              fullName={user.user_metadata.full_name || 'User'} 
              onSignOut={signOut}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to CandlyzeAI
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Choose a plan to start analyzing your charts
            </p>
          </div>
        </div>
        <PricingSectionNew />
      </main>
    </div>
  );
}
