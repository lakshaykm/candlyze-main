import { useState, useEffect } from 'react';

// Exchange rates (you should ideally fetch these from an API)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  INR: 83.12,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.35,
  // Add more currencies as needed
};

// Currency symbols and formatting options
export const CURRENCY_CONFIG: Record<string, { symbol: string, position: 'before' | 'after' }> = {
  USD: { symbol: '$', position: 'before' },
  INR: { symbol: '₹', position: 'before' },
  EUR: { symbol: '€', position: 'before' },
  GBP: { symbol: '£', position: 'before' },
  AUD: { symbol: 'A$', position: 'before' },
  CAD: { symbol: 'C$', position: 'before' },
};

// Function to convert price to target currency
export function convertPrice(priceUSD: number, targetCurrency: string): number {
  const rate = EXCHANGE_RATES[targetCurrency] || 1;
  return Math.round(priceUSD * rate * 100) / 100;
}

// Function to format price with currency symbol
export function formatPrice(price: number, currency: string): string {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  const formattedPrice = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return config.position === 'before' 
    ? `${config.symbol}${formattedPrice}`
    : `${formattedPrice}${config.symbol}`;
}
