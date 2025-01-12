import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserMenu } from './UserMenu';

export function AppHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex justify-end">
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
