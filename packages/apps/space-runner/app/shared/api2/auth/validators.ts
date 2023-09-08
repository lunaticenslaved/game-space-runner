import { validators } from '@shared/validators';

export const authValidators = {
  signIn: {
    login: validators.login('required'),
    password: validators.password('required'),
  },
  signUp: {
    login: validators.login('new'),
    password: validators.password('new'),
  },
};
