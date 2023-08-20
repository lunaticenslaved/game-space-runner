import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routes } from '@client/navigation';

const TopicsPage = lazy(() => import('./topics'));
const TopicPage = lazy(() => import('./topic'));

export const Router = [
  <Route key={0} path={routes.forum.root.path} element={<TopicsPage />} />,
  <Route key={1} path={routes.forum.topic.path} element={<TopicPage />} />,
];
