import { useCallback, useState } from 'react';

import { QueryHandler } from '@client/shared/api';

import { Topic } from '..';

export const useCreateTopic = ({ onError, onSuccess }: QueryHandler<Topic>) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const createPost = useCallback(async () => {
    setSubmitting(true);

    try {
      onSuccess({ id: 1, title: '', createdAt: '', content: '' });
    } catch (error) {
      console.log(error);
      onError();
    }

    setSubmitting(false);
  }, [onError, onSuccess]);

  return { createPost, isSubmitting };
};
