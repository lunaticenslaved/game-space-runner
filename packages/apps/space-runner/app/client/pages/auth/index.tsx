import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routes } from '@client/navigation';
import { RouteGuard } from '@client/navigation/route-guard';

const SignInPage = lazy(() => import('./sign-in'));
const SignUpPage = lazy(() => import('./sign-up'));

export const Router = [
  <Route
    key={1}
    path={routes.auth.signIn.path}
    element={<RouteGuard route={routes.auth.signIn} element={<SignInPage />} />}
  />,
  <Route
    key={2}
    path={routes.auth.signUp.path}
    element={<RouteGuard route={routes.auth.signUp} element={<SignUpPage />} />}
  />,
];
