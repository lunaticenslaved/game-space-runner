export type { SignInRequest, SignInResponse } from './sign-in';
export type { SignUpRequest, SignUpResponse } from './sign-up';

import { signIn } from './sign-in';
import { signUp } from './sign-up';
import { logout } from './logout';

export const authApi = {
  signIn,
  signUp,
  logout,
};