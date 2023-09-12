import { Express } from 'express';

import { NotFoundError } from '@shared/errors';

import { addAuthRoutes } from './auth';
import { addViewerRoutes } from './viewer';
import { addPostsRoutes } from './posts';

export const addRouter = (app: Express) => {
  addAuthRoutes(app);
  addViewerRoutes(app);
  addPostsRoutes(app);

  app.use('/api/*', (_, response) => {
    response.status(404).json(
      new NotFoundError({
        errors: ['Resource not found'],
        status: 400,
      }),
    );
  });
};
