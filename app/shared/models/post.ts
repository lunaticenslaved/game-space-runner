import { User } from '@shared/models/user';

export type Post = {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};
