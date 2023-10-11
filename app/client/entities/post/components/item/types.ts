import { Post } from '@shared/models';

export type PostItemProps = {
  post: Post;
  view?: 'card' | 'list-item';
  onSelect?: (post: Post) => void;
};
