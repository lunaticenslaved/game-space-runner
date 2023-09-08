import { useMutation as useMutationBase } from 'react-query';

import { ApiError } from '@shared/errors';

export function useMutation<TRequest, TResponse>(
  ...args: Parameters<typeof useMutationBase<TRequest, ApiError, TResponse, unknown>>
) {
  const mutation = useMutationBase(...args);
  return mutation;
}
