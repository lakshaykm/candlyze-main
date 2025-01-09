import React from 'react';
import { BarChart2, Home, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BarChart2 className="w-8 h-8" />
            <h1 className="text-xl md:text-2xl font-bold">CandlyzeAI</h1>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            {user && (
              <UserMenu 
                fullName={user.user_metadata.full_name || 'User'} 
                onSignOut={signOut} 
              />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-blue-500">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              {user && (
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-left text-white hover:bg-blue-700 rounded-lg transition-colors w-full"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
