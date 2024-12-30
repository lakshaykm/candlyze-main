import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase-client';
import { SignUpFormData, SignInFormData } from '../types/auth';

export async function signIn({ email, password }: SignInFormData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });
  
  if (error) {
    if (error.message === 'Invalid login credentials') {
      throw new Error('Invalid email or password');
    }
    throw new Error(error.message);
  }
  
  return data;
}

export async function signUp({ email, password, fullName }: SignUpFormData) {
  try {
    // First check if user exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email.trim())
      .single();

    if (existingUser) {
      throw new Error('You are already registered! Please Sign In');
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered') || 
          error.message.includes('already exists') ||
          error.message.includes('User already registered')) {
        throw new Error('You are already registered! Please Sign In');
      }
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}