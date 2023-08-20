import { AccessLevel } from '../types';

export const gameRoutes = {
  start: { path: '/game/start', access: AccessLevel.Private },
  end: { path: '/game/end', access: AccessLevel.Private },
  root: { path: '/game', access: AccessLevel.Private },
};
