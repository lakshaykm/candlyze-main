import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { signIn, signUp } from '../services/auth-service';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { SignInFormData, SignUpFormData } from '../types/auth';

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = async (data: SignInFormData) => {
    setLoading(true);
    setError(null);
    try {
      await signIn(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    setError(null);
    try {
      await signUp(data);
      setError('Successfully signed up! You can now sign in.');
      setMode('signin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-600">
      <div className="pt-8 pb-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <BarChart2 className="w-12 h-12 text-white" />
          <h1 className="text-4xl font-bold text-white">CandlyzeAI</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-8 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {mode === 'signin' ? (
            <SignInForm onSubmit={handleSignIn} loading={loading} />
          ) : (
            <SignUpForm onSubmit={handleSignUp} loading={loading} />
          )}

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign Up" 
                : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}