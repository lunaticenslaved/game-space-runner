import { addUserFromCookie, checkAuth } from '@server/middlewares';

import { createRoutes } from '../_utils';

import { updateInfo } from './update-info';
import { updateAvatar } from './update-avatar';

export const addViewerRoutes = createRoutes(app => {
  app.post('/api/viewer/info', addUserFromCookie, checkAuth, updateInfo);
  app.post('/api/viewer/avatar', addUserFromCookie, checkAuth, updateAvatar);
});
