import { createAction, customFetch } from '../_utils';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from './types';
import { validators } from '@shared/validators';

export const authActions = {
  signIn: {
    action: createAction<SignInResponse, SignInRequest>(async data => {
      return await customFetch('/api/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      login: validators.login('required'),
      password: validators.password('required'),
    },
  },
  signUp: {
    action: createAction<SignUpResponse, SignUpRequest>(async data => {
      return await customFetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      login: validators.login('new'),
      password: validators.password('new'),
    },
  },
  logout: {
    action: createAction<void, void>(async () => {
      return await customFetch('/api/auth/logout', {
        method: 'POST',
      });
    }),
  },
};
