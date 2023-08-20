import { routes } from '@client/navigation';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const LeaderBoardPage = lazy(() => import('./leader-board'));

export const Router = () => {
  return <Route path={routes.leaderBoard.path} element={<LeaderBoardPage />} />;
};
