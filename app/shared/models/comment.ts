import { User } from '@shared/models';

export type Comment = {
  id: string;
  text: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};
