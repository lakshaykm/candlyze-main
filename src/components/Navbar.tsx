import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

export function Navbar() {
  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BarChart2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CandlyzeAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <a 
              href="#pricing" 
              onClick={scrollToPricing}
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Pricing
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}