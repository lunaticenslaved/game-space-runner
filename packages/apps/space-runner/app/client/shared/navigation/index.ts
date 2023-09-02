import { AccessLevel } from './types';

export { AccessLevel, type RouteSetting } from './types';
export { useAppNavigation } from './use-navigation';

export const routes = {
  home: {
    path: '/',
    access: AccessLevel.Common,
  },
  leaderBoard: { path: '/leader-board', access: AccessLevel.Common },
  forum: {
    root: { path: '/topics', access: AccessLevel.Common },
    topic: { path: '/topics/:topicId', access: AccessLevel.Common },
  },
  auth: {
    signIn: { path: '/auth/sign-in', access: AccessLevel.Public },
    signUp: { path: '/auth/sign-up', access: AccessLevel.Public },
  },
  game: {
    start: { path: '/game/start', access: AccessLevel.Private },
    end: { path: '/game/end', access: AccessLevel.Private },
    root: { path: '/game', access: AccessLevel.Private },
  },
  error: {
    error404: { path: '*', access: AccessLevel.Common },
    error500: { path: '/error-500', access: AccessLevel.Common },
  },
  profile: {
    root: { access: AccessLevel.Private, path: '/profile' },
  },
};
