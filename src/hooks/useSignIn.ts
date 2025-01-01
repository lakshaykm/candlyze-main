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
      await signIn({ email, password });
      navigate('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading, error };
}