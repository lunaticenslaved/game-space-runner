import { addUserFromCookie } from '@server/middlewares';
import { createRoutes } from '../_utils';

import { signIn } from './sign-in';
import { signUp } from './sign-up';
import { logout } from './logout';

export const addAuthRoutes = createRoutes(app => {
  app.post('/api/auth/sign-in', addUserFromCookie, signIn);
  app.post('/api/auth/sign-up', addUserFromCookie, signUp);
  app.post('/api/auth/logout', addUserFromCookie, logout);
});
