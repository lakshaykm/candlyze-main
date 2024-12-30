import React from 'react';
import { BarChart2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BarChart2 className="w-8 h-8" />
            <h1 className="text-2xl font-bold">CandlyzeAI</h1>
          </Link>
          
          <nav>
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </nav>

          {user && (
            <UserMenu 
              fullName={user.user_metadata.full_name || 'User'} 
              onSignOut={signOut} 
            />
          )}
        </div>
      </div>
    </header>
  );
}