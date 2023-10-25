import { useCallback } from 'react';

import { dateConvert } from '@client/shared/utils/dates';
import { Text } from '@libs/uikit/components/text';

import { PostItemProps } from '../types';

export function PostListItem({ post, onSelect }: PostItemProps) {
  const handlePostSelect = useCallback(() => {
    onSelect && onSelect(post);
  }, [onSelect, post]);

  return (
    <div
      className="flex p-4 -mx-4 hover:bg-white/10 rounded-md cursor-pointer"
      onClick={handlePostSelect}>
      <div className="grow">
        <Text as="p" className="mb-1">
          <strong>{post.title}</strong>
        </Text>
        <time dateTime={post.createdAt}>{dateConvert(post.createdAt)}</time>
      </div>

      <Text as="span" className="w-12 text-end">
        {post.count?.comments || 0}
      </Text>

      <time className="w-24 text-center">
        {post.lastComment ? dateConvert(post.lastComment.createdAt) : '-'}
      </time>
    </div>
  );
}
