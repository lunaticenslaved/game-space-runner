export type { SignInRequest, SignInResponse } from './sign-in';

import { signIn } from './sign-in';

export const authApi = {
  signIn,
};
