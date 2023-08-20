import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routes } from '@client/navigation';

const Error404Page = lazy(() => import('./error-404'));
const Error500Page = lazy(() => import('./error-500'));

export const Router = () => {
  return (
    <Route>
      <Route path={routes.error.error500.path} element={<Error500Page />} />
      <Route path={routes.error.error404.path} element={<Error404Page />} />
    </Route>
  );
};
