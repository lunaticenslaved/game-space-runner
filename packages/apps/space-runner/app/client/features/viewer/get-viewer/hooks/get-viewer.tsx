import { useCallback, useMemo } from 'react';

import { QueryHandler } from '@client/shared/api';

export const useViewer = () => {
  const isAuthenticated = useMemo(() => true, []);

  const get = useCallback(async ({ onError, onSuccess }: QueryHandler) => {
    try {
      onSuccess();
    } catch (error) {
      console.error(error);
      onError();
    }
  }, []);

  return {
    viewer: undefined,
    isAuthenticated,
    get,
  };
};
