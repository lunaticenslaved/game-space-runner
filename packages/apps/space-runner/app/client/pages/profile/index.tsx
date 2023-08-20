import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routes } from '@client/navigation';

const ProfilePage = lazy(() => import('./profile'));

export const Router = () => {
  return <Route path={routes.profile.root.path} element={<ProfilePage />} />;
};
