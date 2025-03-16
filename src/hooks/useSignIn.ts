import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/auth-service';

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign in timeout. Please try again.')), 15000);
      });

      await Promise.race([
        signIn({ email, password }),
        timeoutPromise
      ]);

      navigate('/app');
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading, error };
}
