import { useCallback, useState } from 'react';

import { QueryHandler } from '@shared/api2';

import { Topic } from '..';

export const useCreateTopic = ({ onError, onSuccess }: QueryHandler<Topic>) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const createPost = useCallback(async () => {
    setSubmitting(true);

    try {
      if (onSuccess) onSuccess({ id: 1, title: '', createdAt: '', content: '' });
    } catch (error) {
      console.log(error);
      if (onError) onError();
    }

    setSubmitting(false);
  }, [onError, onSuccess]);

  return { createPost, isSubmitting };
};
