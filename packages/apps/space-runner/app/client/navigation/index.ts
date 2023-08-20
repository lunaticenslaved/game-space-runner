export { useForumNavigation } from './forum/use-navigation';
export { useAuthNavigation } from './auth/use-navigation';

import { forumRoutes } from './forum/routes';
import { authRoutes } from './auth/routes';

export const routes = {
  forum: forumRoutes,
  auth: authRoutes,
};
