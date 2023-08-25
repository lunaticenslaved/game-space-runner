import { createRoutes } from '@server/utils';
import { signIn } from './sign-in';

export const addAuthRoutes = createRoutes(app => {
  app.use('/api/', signIn);
});
