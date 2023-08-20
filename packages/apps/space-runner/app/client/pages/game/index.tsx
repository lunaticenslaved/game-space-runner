import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routes } from '@client/navigation';

const StartPage = lazy(() => import('./start'));
const EndPage = lazy(() => import('./end'));
const GamePage = lazy(() => import('./process'));

export const Router = () => {
  return (
    <Route>
      <Route path={routes.game.start} element={<StartPage />} />
      <Route path={routes.game.end} element={<EndPage />} />
      <Route path={routes.game.root} element={<GamePage />} />
    </Route>
  );
};
