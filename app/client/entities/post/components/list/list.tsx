import { useCallback } from 'react';

import { Post } from '@shared/models/post';
import { API, useQuery } from '@shared/api';
import { Placeholder } from '@libs/uikit/components/placeholder';
import { PostItemProps, PostItem } from '@client/entities/post';

import { List } from '@mui/material';

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
    return <Placeholder />;
  }

  return (
    <List>
      {data.posts.map(post => (
        <PostItem key={post.id} view={view} post={post} onSelect={handlePostClick} />
      ))}
    </List>
  );
};
