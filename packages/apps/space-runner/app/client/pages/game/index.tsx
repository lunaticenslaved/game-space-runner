import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routes } from '@client/navigation';

const StartPage = lazy(() => import('./start'));
const EndPage = lazy(() => import('./end'));
const GamePage = lazy(() => import('./process'));

export const Router = [
  <Route key={0} path={routes.game.start.path} element={<StartPage />} />,
  <Route key={1} path={routes.game.end.path} element={<EndPage />} />,
  <Route key={2} path={routes.game.root.path} element={<GamePage />} />,
];
