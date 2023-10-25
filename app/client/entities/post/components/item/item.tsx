import { PostItemProps } from './types';
import { PostListItem } from './views/list-item';
import { PostCard } from './views/card';

export type { PostItemProps };

export function PostItem(props: PostItemProps) {
  const view = props.view || 'list-item';

  if (view === 'list-item') {
    return <PostListItem {...props} />;
  }

  if (view === 'card') {
    return <PostCard {...props} />;
  }

  return null;
}
