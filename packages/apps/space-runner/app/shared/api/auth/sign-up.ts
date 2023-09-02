import { validationRules } from '@libs/validate';

export type SignUpRequest = {
  login: string;
  password: string;
};

export type SignUpResponse = {
  id: string;
  login: string;
};

export const signUp = {
  url: {
    raw: '/api/auth/sign-up',
    get: () => '/api/auth/sign-up',
  },
  validator: {
    login: validationRules.required('Login is required'),
    password: validationRules.required('Password is required'),
  },
};
