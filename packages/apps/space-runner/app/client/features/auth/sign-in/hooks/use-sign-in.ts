import { useCallback } from 'react';

export const useSignIn = () => {
  const signIn = useCallback(() => {
    console.log('sign-in');
  }, []);

  return { signIn };
};
