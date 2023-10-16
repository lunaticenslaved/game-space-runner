import { User, Comment } from '@shared/models';

export type Post = {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  count?: {
    comments: number;
  };
  lastComment?: Pick<Comment, 'createdAt'>;
};
