import { useCallback } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import { API, useMutation, useQuery } from '@shared/api';

import { Empty, List } from './views';
import { CommentInput } from '../input/input';

import './list.scss';

const bList = block('entities-comment-list');
const bHeader = block('entities-comment-list__header');
const bContent = block('entities-comment-list__content');

export interface CommentsListProps {
  postId: string;
  className?: string;
}

export const CommentsList = ({ postId, className }: CommentsListProps) => {
  const { data, refetch } = useQuery('get-comments', () => {
    return API.posts.getComments.action({ postId });
  });
  const mutation = useMutation('create-comment', API.posts.createComment.action);
  const createComment = useCallback(
    async (text: string) => {
      await mutation.mutateAsync(
        {
          postId,
          text,
        },
        {
          onSuccess() {
            refetch();
          },
          onError() {
            alert('cannot create comment!');
          },
        },
      );
    },
    [mutation, postId, refetch],
  );

  if (!data) {
    return <div>Loading comments</div>;
  }

  const { comments } = data;

  return (
    <section className={cn(bList(), className)}>
      <div className={bHeader()}>
        <h4>Комментарии</h4>
      </div>

      {comments.length === 0 && <Empty />}
      {comments.length > 0 && (
        <div className={bContent()}>
          <List comments={comments} />
        </div>
      )}

      <CommentInput onSubmit={createComment} />
    </section>
  );
};
