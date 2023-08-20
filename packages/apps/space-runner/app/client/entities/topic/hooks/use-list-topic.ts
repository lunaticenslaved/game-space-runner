import { useCallback, useState } from 'react';

import { QueryHandler } from '@client/shared/api';

export const useListTopic = ({ onError, onSuccess }: QueryHandler) => {
  const [isFetching, setFetching] = useState(false);

  const query = useCallback(async () => {
    setFetching(true);

    try {
      onSuccess();
    } catch {
      onError;
    }

    setFetching(false);

    return Promise.resolve();
  }, [onError, onSuccess]);

  return { isFetching, query, topics: [] };
};
