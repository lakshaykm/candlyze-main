import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserMenu } from './UserMenu';
import { CreditBalance } from './CreditBalance';

export function AppHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <CreditBalance />
        {user && (
          <UserMenu 
            fullName={user.user_metadata.full_name || 'User'} 
            onSignOut={signOut}
          />
        )}
      </div>
    </header>
  );
}
