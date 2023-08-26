import { validationRules } from '@libs/validate';

export type SignInRequest = {
  login: string;
  password: string;
};

export type SignInResponse = {
  id: string;
  login: string;
};

export const signIn = {
  url: {
    raw: '/api/auth/sign-in',
    get: () => '/api/auth/sign-in',
  },
  validator: {
    login: validationRules.required('Login is required'),
    password: validationRules.required('Password is required'),
  },
};
