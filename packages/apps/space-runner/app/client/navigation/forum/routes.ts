import { AccessLevel } from '../types';

export const forumRoutes = {
  root: { path: '/topics', access: AccessLevel.Common },
  topic: { path: '/topics/:topicId', access: AccessLevel.Common },
};
