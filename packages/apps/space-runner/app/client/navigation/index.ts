export { useForumNavigation } from './forum/use-navigation';
export { useAuthNavigation } from './auth/use-navigation';
export { useGameNavigation } from './game/use-navigation';
export { useProfileNavigation } from './profile/use-navigation';
export { useErrorNavigation } from './error/use-navigation';
export { AccessLevel, type RouteSetting } from './types';

import { forumRoutes } from './forum/routes';
import { authRoutes } from './auth/routes';
import { gameRoutes } from './game/routes';
import { profileRoutes } from './profile/routes';
import { errorRoutes } from './error/routes';
import { AccessLevel } from './types';

export const routes = {
  home: { path: '/', access: AccessLevel.Common },
  leaderBoard: { path: '/leader-board', access: AccessLevel.Common },
  profile: profileRoutes,
  forum: forumRoutes,
  auth: authRoutes,
  game: gameRoutes,
  error: errorRoutes,
};
