import { addUserFromCookie, checkAuth } from '@server/middlewares';

import { createRoutes } from '../_utils';

import { updateInfo } from './update-info';
import { updateAvatar } from './update-avatar';
import { updatePassword } from './update-password';

export const addViewerRoutes = createRoutes(app => {
  app.put('/api/viewer/info', addUserFromCookie, checkAuth, updateInfo);
  app.put('/api/viewer/avatar', addUserFromCookie, checkAuth, updateAvatar);
  app.put('/api/viewer/password', addUserFromCookie, checkAuth, updatePassword);
});
