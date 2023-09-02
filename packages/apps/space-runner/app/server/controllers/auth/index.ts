import { addUserFromCookie } from '@server/middlewares';
import { createRoutes } from '../_utils';
import { authApi } from '@shared/api';

import { signIn } from './sign-in';
import { signUp } from './sign-up';
import { logout } from './logout';

export const addAuthRoutes = createRoutes(app => {
  app.post(authApi.signIn.url.raw, addUserFromCookie, signIn);
  app.post(authApi.signUp.url.raw, addUserFromCookie, signUp);
  app.post(authApi.logout.url.raw, addUserFromCookie, logout);
});
