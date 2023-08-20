import { useCallback, useState } from 'react';

import { QueryHandler } from '@client/shared/api';

export interface UseListCommentProps extends QueryHandler {
  topicId: number;
}

export const useListComment = ({ onError, onSuccess }: UseListCommentProps) => {
  const [isFetching, setFetching] = useState(false);

  const fetch = useCallback(async () => {
    setFetching(true);

    try {
      onSuccess();
    } catch (error) {
      console.error(error);

      onError();
    }

    setFetching(false);
  }, [onError, onSuccess]);

  return { fetch, comments: [], isFetching };
};
