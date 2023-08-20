import { routes } from '@client/navigation';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const HomePage = lazy(() => import('./landing'));

export const Router = () => {
  return <Route path={routes.home.path} element={<HomePage />} />;
};
