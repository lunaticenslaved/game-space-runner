import { useCallback, useState } from 'react';

import { QueryHandler } from '@client/shared/api';

export const useEditPassword = ({ onError, onSuccess }: QueryHandler) => {
  const [isFetching, setFetching] = useState(false);

  const mutate = useCallback(async () => {
    setFetching(true);

    try {
      onSuccess();
    } catch (error) {
      console.error(error);

      onError();
    }

    setFetching(false);
  }, [onError, onSuccess]);

  return { mutate, isFetching };
};
