import { Express } from 'express';

import { addAuthRoutes } from '@server/controllers/auth';

export const addRouter = (app: Express) => {
  addAuthRoutes(app);
};
