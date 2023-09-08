import { useCallback, useState } from 'react';

import { QueryHandler } from '@shared/api2';

export interface UseListCommentProps extends QueryHandler {
  topicId: number;
}

export const useListComment = ({ onError, onSuccess }: UseListCommentProps) => {
  const [isFetching, setFetching] = useState(false);

  const fetch = useCallback(async () => {
    setFetching(true);

    try {
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);

      if (onError) onError();
    }

    setFetching(false);
  }, [onError, onSuccess]);

  return { fetch, comments: [], isFetching };
};
