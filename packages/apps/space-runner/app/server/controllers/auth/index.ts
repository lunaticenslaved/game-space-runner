import { createRoutes } from '@server/shared/utils';
import { authApi } from '@shared/api';

import { signIn } from './sign-in';

export const addAuthRoutes = createRoutes(app => {
  app.post(authApi.signIn.url.raw, signIn);
});
