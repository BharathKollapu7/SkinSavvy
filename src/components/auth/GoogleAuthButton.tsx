import React from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const GoogleIcon = () => (
  <svg className="h-5 w-5 mr-3" viewBox="0 0 48 48">
    <g>
      <path fill="#4285f4" d="M24 9.5c3.54 0 6.04 1.53 7.44 2.81l5.54-5.39C33.36 3.36 28.94 1.5 24 1.5 14.82 1.5 6.85 7.26 3.43 15.02l6.61 5.13C12.12 14.53 17.55 9.5 24 9.5z"/>
      <path fill="#34a853" d="M46.15 24.55c0-1.63-.15-3.18-.44-4.68H24v9.13h12.46c-.54 2.93-2.17 5.41-4.63 7.09l7.19 5.59c4.18-3.86 6.58-9.56 6.58-16.13z"/>
      <path fill="#fbbc04" d="M10.04 28.15A14.5 14.5 0 019.5 24c0-1.45.25-2.85.7-4.15l-6.61-5.13A23.93 23.93 0 001.5 24c0 3.89.93 7.58 2.59 10.85l6.61-5.13z"/>
      <path fill="#ea4335" d="M24 46.5c6.48 0 11.92-2.14 15.9-5.82l-7.19-5.59c-2 1.35-4.54 2.16-8.71 2.16-6.44 0-11.87-4.97-13.72-11.56l-6.61 5.13C6.85 40.74 14.82 46.5 24 46.5z"/>
      <path fill="none" d="M1.5 1.5h45v45h-45z"/>
    </g>
  </svg>
);

interface GoogleAuthButtonProps {
  mode: 'signin' | 'signup';
  onLoading: (loading: boolean) => void;
  onError: (error: string) => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ mode, onLoading, onError }) => {
  const handleGoogleAuth = async () => {
    try {
      onLoading(true);
      onError('');

      // Important: Remove local Supabase session before new OAuth flow to avoid stale sessions
      Object.keys(localStorage)
        .filter((key) => key.startsWith('sb-'))
        .forEach((key) => localStorage.removeItem(key));

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        onError(error.message);
      }
    } catch (err: any) {
      onError('Failed to authenticate with Google. Please try again.');
      console.error('Google auth error:', err);
    } finally {
      onLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleAuth}
      className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
    >
      <GoogleIcon />
      <span className="font-medium text-gray-700">
        {mode === 'signin' ? 'Continue with Google' : 'Sign up with Google'}
      </span>
    </Button>
  );
};

export default GoogleAuthButton;
