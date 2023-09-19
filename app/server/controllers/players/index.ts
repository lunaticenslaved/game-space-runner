import { addUserFromCookie, checkAuth } from '@server/middlewares';

import { createRoutes } from '../_utils';

import { getPlayers } from './get-players';
import { savePlayer } from './save-player';

export const addPlayersRoutes = createRoutes(app => {
  app.get('/api/players', addUserFromCookie, checkAuth, getPlayers);
  app.post('/api/players', addUserFromCookie, checkAuth, savePlayer);
});
