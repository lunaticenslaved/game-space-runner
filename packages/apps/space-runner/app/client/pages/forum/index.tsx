import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routes } from '@client/navigation';

const TopicsPage = lazy(() => import('./topics'));
const TopicPage = lazy(() => import('./topic'));

export const Router = () => {
  return (
    <Route>
      <Route path={routes.forum.root} element={<TopicsPage />} />
      <Route path={routes.forum.topic} element={<TopicPage />} />
    </Route>
  );
};
