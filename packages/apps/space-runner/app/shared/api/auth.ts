import { validationRules } from '@libs/validate';
import { ValidationObject } from '@shared/utils';

export type SignInRequest = {
  login: string;
  password: string;
};

export type SignInResponse = {
  id: string;
  login: string;
};

export const signInValidator: ValidationObject = {
  login: (value?: string) => validationRules.required('Login is required')(value),
  password: (value?: string) => validationRules.required('Password is required')(value),
};
