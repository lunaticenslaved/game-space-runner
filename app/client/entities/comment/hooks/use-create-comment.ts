import { useCallback, useState } from 'react';

import { QueryHandler } from '@shared/api2';

export interface UseCreateCommentProps extends QueryHandler {
  topicId: number;
}

export const useCreateComment = ({ onError, onSuccess }: UseCreateCommentProps) => {
  const [isFetching, setFetching] = useState(false);

  const mutate = useCallback(async () => {
    setFetching(true);

    try {
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      if (onError) onError();
    }

    setFetching(false);
  }, [onError, onSuccess]);

  return { isFetching, mutate };
};
