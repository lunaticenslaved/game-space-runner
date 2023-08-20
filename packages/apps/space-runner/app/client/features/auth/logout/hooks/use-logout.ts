import { useCallback } from 'react';

export const useLogout = () => {
  const logout = useCallback(() => {}, []);

  return { logout };
};
