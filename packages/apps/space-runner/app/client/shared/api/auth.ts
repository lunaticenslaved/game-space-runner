import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  authApi as aithApiBase,
} from '@shared/api';
export type { SignInRequest, SignInResponse } from '@shared/api/auth';

import { api } from '.';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<SignInResponse, SignInRequest>({
      query: body => ({
        body,
        url: aithApiBase.signIn.url.get(),
        method: 'POST',
      }),
    }),
    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: body => ({
        body,
        url: aithApiBase.signUp.url.get(),
        method: 'POST',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: aithApiBase.logout.url.get(),
        method: 'POST',
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useLogoutMutation } = authApi;
