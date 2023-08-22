import { api } from '.';

export type SignInRequest = {};
export type SignInResponse = {};

export type SignUpRequest = {};
export type SignUpResponse = {};

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<SignInResponse, SignInRequest>({
      query: () => ({
        url: '/example',
      }),
    }),
    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: () => ({
        url: '/example',
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
