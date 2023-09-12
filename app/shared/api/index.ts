export * from './auth/types';
export * from './viewer/types';
export * from './posts/types';
export * from './hooks';

import { authActions } from './auth/actions';
import { viewerActions } from './viewer/actions';
import { postsActions } from './posts/actions';

export const API = {
  auth: authActions,
  viewer: viewerActions,
  posts: postsActions,
};
