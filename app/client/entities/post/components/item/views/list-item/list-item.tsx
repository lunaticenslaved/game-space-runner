import { useCallback } from 'react';
import block from 'bem-cn-lite';

import { dateConvert } from '@client/shared/utils/dates';

import { PostItemProps } from '../../types';

import './list-item.scss';

const bItem = block('post-item-list');
const bItemInfo = block('post-item-list__info');
const bItemComments = block('post-item-list__comments');
const bItemLastComment = block('post-item-list__last-comment');

export function PostListItem({ post, onSelect }: PostItemProps) {
  const handlePostSelect = useCallback(() => {
    onSelect && onSelect(post);
  }, [onSelect, post]);

  return (
    <div className={bItem()} onClick={handlePostSelect}>
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
  );
}
