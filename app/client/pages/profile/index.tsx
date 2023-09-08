import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routes } from '@client/shared/navigation';

const ProfilePage = lazy(() => import('./profile'));

export const Router = [<Route key={1} path={routes.profile.root.path} element={<ProfilePage />} />];
