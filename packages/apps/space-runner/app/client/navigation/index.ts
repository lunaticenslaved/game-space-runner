export { useForumNavigation } from './forum/use-navigation';
export { useAuthNavigation } from './auth/use-navigation';
export { useGameNavigation } from './game/use-navigation';

import { forumRoutes } from './forum/routes';
import { authRoutes } from './auth/routes';
import { gameRoutes } from './game/routes';

export const routes = {
  forum: forumRoutes,
  auth: authRoutes,
  game: gameRoutes,
};
