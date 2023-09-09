import { createAction, customFetch } from '../_utils';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from './types';

export const authActions = {
  signIn: createAction<SignInResponse, SignInRequest>(async data => {
    return await customFetch('/api/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }),
  signUp: createAction<SignUpResponse, SignUpRequest>(async data => {
    return await customFetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }),
  logout: createAction<void, void>(async () => {
    return await customFetch('/api/auth/logout', {
      method: 'POST',
    });
  }),
};
