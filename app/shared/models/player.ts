import { User } from '@shared/models/user';

export type Player = {
  id: string;
  score: number;
  user: User;
};
