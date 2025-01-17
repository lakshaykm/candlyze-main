import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase-client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastVisitedPage, setLastVisitedPage] = useState<string>('/app');

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
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
