import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase-client';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastVisitedPage, setLastVisitedPage] = useState<string>('/app');
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check if user has an active subscription
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('status', 'active')
          .single();

        if (!subscription) {
          navigate('/subscription-plans');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Redirect to landing page after sign out
  };

  const updateLastVisitedPage = (path: string) => {
    // Only update if it's an app page
    if (path.startsWith('/app')) {
      setLastVisitedPage(path);
    }
  };

  return {
    user,
    loading,
    signOut,
    lastVisitedPage,
    updateLastVisitedPage
  };
}
