import { routes } from '@client/shared/navigation';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const LeaderBoardPage = lazy(() => import('./leader-board'));

export const Router = [
  <Route key={0} path={routes.leaderBoard.path} element={<LeaderBoardPage />} />,
];
