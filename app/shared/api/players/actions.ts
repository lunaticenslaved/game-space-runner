import {
  GetPlayersRequest,
  GetPlayersResponse,
  SavePlayerRequest,
  SavePlayerResponse,
} from './types';
import { createAction, customFetch } from '../_utils';
import { validationRules } from '@libs/validate';

export const playersActions = {
  getPlayers: {
    action: createAction<GetPlayersResponse, GetPlayersRequest>(async () => {
      return await customFetch('/api/players', {
        method: 'GET',
      });
    }),
    validators: {},
  },
  savePlayer: {
    action: createAction<SavePlayerResponse, SavePlayerRequest>(async data => {
      return await customFetch('/api/players', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      score: validationRules.required('Score is required'),
    },
  },
};
