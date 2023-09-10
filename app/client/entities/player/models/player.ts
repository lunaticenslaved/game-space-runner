import { User } from '@shared/models/user';

export type Player = {
  id: number;
  position: number;
  score: number;
  imgSrc: string;
  login: string;
  user: User;
};
