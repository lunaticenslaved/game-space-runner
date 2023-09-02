import { createRoutes } from '@server/shared/utils';
import { authApi } from '@shared/api';

import { signIn } from './sign-in';
import { signUp } from './sign-up';

export const addAuthRoutes = createRoutes(app => {
  app.post(authApi.signIn.url.raw, signIn);
  app.post(authApi.signUp.url.raw, signUp);
});
