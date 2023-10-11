import { useCallback } from 'react';
import block from 'bem-cn-lite';

import { Post } from '@shared/models/post';
import { API, useQuery } from '@shared/api';
import { ViewPlaceholder } from '@client/shared/components/view-placeholder';
import { PostItemProps, PostItem } from '@client/entities/post';

import './list.scss';

const bList = block('entities-post-list');

export interface PostsListProps {
  onPostSelect: (post: Post) => void;
  view?: PostItemProps['view'];
}

export const PostsList = ({ onPostSelect, view = 'list-item' }: PostsListProps) => {
  const { data } = useQuery('get-posts', () => API.posts.getPosts.action());
  const handlePostClick = useCallback(
    (post: Post) => {
      onPostSelect(post);
    },
    [onPostSelect],
  );

  if (!data) {
    return <ViewPlaceholder />;
  }

  return (
    <ul className={bList()}>
      {data.posts.map(post => (
        <PostItem key={post.id} view={view} post={post} onSelect={handlePostClick} />
      ))}
    </ul>
  );
};
