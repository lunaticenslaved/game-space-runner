import { useCallback } from 'react';

import { useForm, useTextField } from '@libs/validate-react';

import { Post } from '@shared/models/post';
import { API, useMutation } from '@shared/api';
import { useDialog } from '@client/shared/hooks';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export type PostFormDialogValues = {
  title: string;
  content: string;
};

export interface PostFormDialogProps {
  isOpen: boolean;
  onSubmit: (post: Post) => void;
  onClose: () => void;
}

export const PostFormDialog = ({ isOpen, onSubmit, onClose }: PostFormDialogProps) => {
  const mutation = useMutation('create-post', API.posts.createPost.action);

  const titleField = useTextField({
    name: 'title',
    rules: [API.posts.createPost.validators.title],
  });
  const contentField = useTextField({
    name: 'content',
    rules: [API.posts.createPost.validators.content],
  });

  const createPost = useCallback(async () => {
    if (!titleField.value) return;

    await mutation.mutateAsync(
      {
        title: titleField.value,
        content: contentField.value,
      },
      {
        onSuccess(post) {
          onSubmit(post);
        },
        onError() {
          alert('cannot create post');
        },
      },
    );
  }, [contentField.value, mutation, onSubmit, titleField.value]);

  const { isSubmitting, props } = useForm({
    fields: [titleField, contentField],
    onSubmit: createPost,
  });
  const dialog = useDialog({
    isOpen,
    beforeClose: onClose,
  });

  return (
    <Dialog open={dialog.isOpen} className="w-[900px] min-w-[900px] max-w-[900px]">
      <form {...props}>
        <DialogTitle>Новый пост</DialogTitle>
        <DialogContent>
          <TextField {...titleField.props} error={!!titleField.props} label="Тема" />
          <TextField
            {...contentField.props}
            multiline
            error={!!contentField.props}
            label="Контент"
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            className="w-full"
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}>
            Создать
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
