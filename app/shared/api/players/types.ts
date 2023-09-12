import { Player } from '@shared/models';

export type GetPlayersRequest = void;
export type GetPlayersResponse = {
  players: Player[];
};

export type SavePlayerRequest = {
  score: number;
};
export type SavePlayerResponse = void;
