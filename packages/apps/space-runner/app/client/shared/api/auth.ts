import { SignInRequest, SignInResponse, authApi as aithApiBase } from '@shared/api';
export type { SignInRequest, SignInResponse } from '@shared/api/auth';
import { transformResponse } from '@shared/utils';

import { api } from '.';

export type SignUpRequest = {};
export type SignUpResponse = {};

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<SignInResponse, SignInRequest>({
      transformResponse,
      query: body => ({
        body,
        url: aithApiBase.signIn.url.get(),
        method: 'POST',
      }),
    }),
    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      transformResponse,
      query: () => ({
        url: '/example',
        method: 'POST',
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
