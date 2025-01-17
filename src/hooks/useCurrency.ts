import { useState, useEffect } from 'react';

export function useCurrency() {
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function detectUserCurrency() {
      try {
        // Try to get user's location from IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Map country codes to currencies
        const countryCurrencyMap: Record<string, string> = {
          US: 'USD',
          IN: 'INR',
          GB: 'GBP',
          // Add more country-currency mappings as needed
          // Default to USD for unmapped countries
        };

        const detectedCurrency = countryCurrencyMap[data.country_code] || 'USD';
        setCurrency(detectedCurrency);
      } catch (error) {
        console.error('Error detecting currency:', error);
        setCurrency('USD'); // Fallback to USD
      } finally {
        setLoading(false);
      }
    }

    detectUserCurrency();
  }, []);

  return { currency, loading };
}
