import { useCallback, useMemo } from 'react';

import { QueryHandler } from '@client/shared/api';
import { AccessLevel } from '@client/navigation';

export const useViewer = () => {
  const isAuthenticated = useMemo(() => true, []);
  const access = useMemo(() => {
    const list = [AccessLevel.Common, AccessLevel.Public];

    if (isAuthenticated) {
      list.push(AccessLevel.Private);
    }

    return list;
  }, []);

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
    access,
    get,
  };
};
