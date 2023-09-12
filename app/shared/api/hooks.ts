import { QueryKey, useMutation as useMutationBase, useQuery as useQueryBase } from 'react-query';

import { ApiError } from '@shared/errors';

export function useMutation<TRequest, TResponse>(
  ...args: Parameters<typeof useMutationBase<TRequest, ApiError, TResponse, unknown>>
) {
  return useMutationBase(...args);
}

export function useQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  ...[queryKey, queryFn, options]: Parameters<
    typeof useQueryBase<TQueryFnData, ApiError, TData, TQueryKey>
  >
) {
  return useQueryBase(queryKey, queryFn, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    ...options,
  });
}
