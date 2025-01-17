import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';
import { UserCredits } from '../types';

export function useCredits() {
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_credits')
        .select('credits, plan')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setCredits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch credits');
    } finally {
      setLoading(false);
    }
  };

  const updateCredits = async (newCredits: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_credits')
        .update({ credits: newCredits })
        .eq('user_id', user.id);

      if (error) throw error;
      setCredits(prev => prev ? { ...prev, credits: newCredits } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update credits');
      throw err;
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return {
    credits,
    loading,
    error,
    updateCredits,
    refreshCredits: fetchCredits
  };
}
