import { useCallback, useState } from 'react';

import { QueryHandler } from '@shared/api2';

export const useListTopic = ({ onError, onSuccess }: QueryHandler) => {
  const [isFetching, setFetching] = useState(false);

  const query = useCallback(async () => {
    setFetching(true);

    try {
      if (onSuccess) onSuccess();
    } catch {
      if (onError) onError();
    }

    setFetching(false);

    return Promise.resolve();
  }, [onError, onSuccess]);

  return { isFetching, query, topics: [] };
};
