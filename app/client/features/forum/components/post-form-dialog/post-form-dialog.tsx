import { useCallback } from 'react';

import { Button } from '@libs/uikit/components/button';
import { Dialog, useDialog } from '@libs/uikit/components/dialog';
import { Input } from '@libs/uikit/components/input';
import { useForm, useTextField } from '@libs/validate-react';

import { Post } from '@shared/models/post';
import { API, useMutation } from '@shared/api';

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
    <Dialog dialog={dialog} contentClass="w-[900px] min-w-[900px] max-w-[900px]">
      <form {...props}>
        <Dialog.Title dialog={dialog}>Новый пост</Dialog.Title>
        <Dialog.Body>
          <Input.TextInput {...titleField.props} label="Тема" />
          <Input.TextArea {...contentField.props} label="Контент" />
        </Dialog.Body>
        <Dialog.Actions>
          <Button type="submit" loading={isSubmitting} width="full" disabled={isSubmitting}>
            Создать
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};
