export * from './auth/types';
export * from './viewer/types';
export * from './posts/types';
export * from './players/types';
export * from './hooks';

import { authActions } from './auth/actions';
import { viewerActions } from './viewer/actions';
import { postsActions } from './posts/actions';
import { playersActions } from './players/actions';

export const API = {
  auth: authActions,
  viewer: viewerActions,
  posts: postsActions,
  players: playersActions,
};
