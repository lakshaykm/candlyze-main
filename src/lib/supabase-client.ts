import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Ensure environment variables are defined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase credentials. Please click "Connect to Supabase" button to set up your project.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);