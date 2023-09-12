import { useCallback } from 'react';
import cn from 'classnames';

import { API, useMutation, useQuery } from '@shared/api';

import { Empty, List } from './views';
import { CommentInput } from './components/comment-input';

import styles from './comments-list.module.scss';

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
    <section className={cn(styles.root, className)}>
      <div className={styles.header}>
        <h4>Комментарии</h4>
      </div>

      {comments.length === 0 && <Empty />}
      {comments.length > 0 && <List comments={comments} />}

      <CommentInput onSubmit={createComment} />
    </section>
  );
};
