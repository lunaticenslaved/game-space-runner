import { addUserFromCookie, checkAuth } from '@server/middlewares';

import { createRoutes } from '../_utils';

import { getPlayers } from './get-players';

export const addPlayersRoutes = createRoutes(app => {
  app.get('/api/players', addUserFromCookie, checkAuth, getPlayers);
});
