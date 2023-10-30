import { useCallback } from 'react';
import { Grid, Typography } from '@mui/material';

import { API, useMutation, useQuery } from '@shared/api';

import { List } from './views/list';
import { Empty } from './views/empty';
import { CommentInput } from '../input/input';

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
    <Grid container component="section" direction="column" className={className}>
      <Grid>
        <Typography variant="h5" gutterBottom>
          Комментарии
        </Typography>
      </Grid>

      <Grid flexGrow={1}>{comments.length === 0 ? <Empty /> : <List comments={comments} />}</Grid>

      <Grid className="mt-4">
        <CommentInput onSubmit={createComment} />
      </Grid>
    </Grid>
  );
};
