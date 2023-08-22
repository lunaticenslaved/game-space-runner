import { useCallback } from 'react';

export const useOAuthSignIn = () => {
  const signIn = useCallback(() => {
    console.log('oauth sign-in');
  }, []);

  return { signIn };
};
