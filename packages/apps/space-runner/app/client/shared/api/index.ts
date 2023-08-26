import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type QueryHandler<T = void> = {
  onSuccess?: T extends void ? () => void : (data: T) => void;
  onError?: () => void;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
});
