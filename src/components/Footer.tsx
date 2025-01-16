import React from 'react';
import { Link } from './Link';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between md:items-center">
          <div className="text-center md:text-left">
            <span className="text-sm">© {new Date().getFullYear()} CandlyzeAI. All rights reserved.</span>
          </div>
          <div className="grid grid-cols-2 md:flex md:gap-6 text-center md:text-left">
            <Link href="/about" className="py-2 md:py-0">About Us</Link>
            <Link href="/terms" className="py-2 md:py-0">Terms & Conditions</Link>
            <Link href="/subscription" className="py-2 md:py-0">Subscription Plans</Link>
            <Link href="/privacy" className="py-2 md:py-0">Privacy Policy</Link>
            <Link href="/refund" className="py-2 md:py-0">Refund Policy</Link>
            <Link href="/shipping-delivery" className="py-2 md:py-0">Shipping & Delivery</Link>
            <Link href="/contact" className="py-2 md:py-0">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
