import { useCallback } from 'react';

import { dateConvert } from '@client/shared/utils/dates';
import { ListItem, ListItemText } from '@mui/material';

import { PostItemProps } from '../types';

export function PostListItem({ post, onSelect }: PostItemProps) {
  const handlePostSelect = useCallback(() => {
    onSelect && onSelect(post);
  }, [onSelect, post]);

  return (
    <ListItem
      className="flex hover:bg-white/10 rounded-md cursor-pointer"
      onClick={handlePostSelect}>
      <ListItemText
        className="!grow"
        primary={post.title}
        secondary={<time dateTime={post.createdAt}>{dateConvert(post.createdAt)}</time>}
      />

      <ListItemText
        className="grow-0"
        primary={post.count?.comments || 0}
        secondary={
          <time className="w-24 text-center">
            {post.lastComment ? dateConvert(post.lastComment.createdAt) : '-'}
          </time>
        }
      />
    </ListItem>
  );
}
