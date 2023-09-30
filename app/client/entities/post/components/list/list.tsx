import { useCallback } from 'react';
import block from 'bem-cn-lite';

import { Post } from '@shared/models/post';
import { dateConvert } from '@client/shared/utils/dates';
import { API, useQuery } from '@shared/api';
import { ViewPlaceholder } from '@client/shared/components/view-placeholder';

import './list.scss';

const bList = block('entities-post-list');
const bItem = block('entities-post-list__item');
const bItemInfo = block('entities-post-list__item-info');
const bItemComments = block('entities-post-list__item-comments');
const bItemLastComment = block('entities-post-list__last-comment');

export interface PostsListProps {
  onPostClick: (post: Post) => void;
}

export const PostsList = ({ onPostClick }: PostsListProps) => {
  const { data } = useQuery('get-posts', () => API.posts.getPosts.action());

  const handlePostClick = useCallback(
    (post: Post) => {
      return () => onPostClick(post);
    },
    [onPostClick],
  );

  if (!data) {
    return <ViewPlaceholder />;
  }

  return (
    <ul className={bList()}>
      {data.posts.map(post => (
        <div key={post.id} className={bItem()} onClick={handlePostClick(post)}>
          <div className={bItemInfo()}>
            <p className={bItemInfo('title')}>
              <strong>{post.title}</strong>
            </p>
            <div className={bItemInfo('minor')}>
              <time dateTime={post.createdAt} className={bItemInfo('start-date')}>
                {dateConvert(post.createdAt)}
              </time>
            </div>
          </div>
          <div className={bItemComments()}>
            <p>{post.count?.comments || 0}</p>
          </div>
          <div className={bItemLastComment()}>
            <p>{post.lastComment ? dateConvert(post.lastComment.createdAt) : '-'}</p>
          </div>
        </div>
      ))}
    </ul>
  );
};
