import { addUserFromCookie, checkAuth } from '@server/middlewares';
import { createRoutes } from '../_utils';
import { viewerApi } from '@shared/api';

import { updateInfo } from './update-info';

export const addViewerRoutes = createRoutes(app => {
  app.post(viewerApi.updateInfo.url.raw, addUserFromCookie, checkAuth, updateInfo);
});
