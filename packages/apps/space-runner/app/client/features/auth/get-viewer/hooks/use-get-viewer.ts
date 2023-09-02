import { useCallback, useMemo } from 'react';

import { QueryHandler } from '@client/shared/api';
import { AccessLevel } from '@client/shared/navigation';

export const useViewer = () => {
  const isAuthenticated = useMemo(() => false, []);
  const access = useMemo(() => {
    const list = [AccessLevel.Common];

    if (isAuthenticated) {
      list.push(AccessLevel.Private);
    } else {
      list.push(AccessLevel.Public);
    }

    return list;
  }, []);

  const get = useCallback(async ({ onError, onSuccess }: QueryHandler) => {
    try {
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      if (onError) onError();
    }
  }, []);

  return {
    viewer: undefined,
    isAuthenticated,
    access,
    get,
  };
};
