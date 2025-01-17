import React from 'react';
import { Coins } from 'lucide-react';
import { useCredits } from '../hooks/useCredits';

export function CreditBalance() {
  const { credits, loading } = useCredits();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <Coins className="w-5 h-5" />
        <span>Loading credits...</span>
      </div>
    );
  }

  if (!credits) return null;

  return (
    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
      <Coins className="w-5 h-5 text-blue-600" />
      <span className="font-medium text-blue-900">{credits.credits} Credits</span>
      <span className="text-sm text-blue-600">({credits.plan} Plan)</span>
    </div>
  );
}
