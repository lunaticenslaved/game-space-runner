import { ReactNode, useCallback } from 'react';

import { Button } from '@client/shared/components/button';
import { Dialog } from '@client/shared/components/dialog';
import { Input } from '@client/shared/components/input';
import { useForm, useTextField } from '@libs/validate-react';

import styles from './post-form-dialog.module.scss';
import { Post } from '@shared/models/post';
import { API, useMutation } from '@shared/api';

export type PostFormDialogValues = {
  title: string;
  content: string;
};

export interface PostFormDialogProps {
  caller?: ReactNode;
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

  return (
    <Dialog title="Новый пост" isOpen={isOpen} onClose={onClose} contentClass={styles.dialog}>
      <form {...props}>
        <Input.TextInput {...titleField.props} label="Тема" />
        <Input.TextArea {...contentField.props} label="Контент" />
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Создать
        </Button>
      </form>
    </Dialog>
  );
};
