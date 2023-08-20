import { useCallback, useState } from 'react';

import { QueryHandler } from '@client/shared/api';
import { Topic } from '..';

export interface UseGetTopicProps extends QueryHandler {
  id: number;
}

export const useGetTopic = ({ onError, onSuccess }: UseGetTopicProps) => {
  const [isFetching, setFetching] = useState(false);
  const [topic] = useState<Topic | void>();

  const fetch = useCallback(async () => {
    setFetching(true);

    try {
      onSuccess();
    } catch (error) {
      console.log(error);
      onError();
    }

    setFetching(false);
  }, [onError, onSuccess]);

  return { topic, fetch, isFetching };
};
