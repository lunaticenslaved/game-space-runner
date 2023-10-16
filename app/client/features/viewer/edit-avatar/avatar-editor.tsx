import { useCallback } from 'react';

import { Button } from '@libs/uikit/components/button';
import { Dialog, DialogInterface } from '@libs/uikit/components/dialog';
import { Input } from '@libs/uikit/components/input';
import { useFileField, useForm } from '@libs/validate-react';
import { API, useMutation } from '@shared/api';

export type AvatarEditorForm = {
  file: File;
};

export type AvatarEditorProps = {
  dialog: DialogInterface;
  onSuccess: () => void;
};

export const AvatarEditor = ({ dialog, onSuccess }: AvatarEditorProps) => {
  const mutation = useMutation('auth-update-avatar', API.viewer.updateAvatar.action);
  const fileField = useFileField({
    name: 'file',
    rules: [value => (value ? null : 'Выберите файл')],
  });

  const editAvatar = useCallback(async () => {
    if (!fileField.value) {
      return;
    }

    await mutation.mutateAsync(
      { file: fileField.value },
      {
        onSuccess,
        onError(error) {
          alert(error.errors[0]);
        },
      },
    );
  }, [fileField.value, mutation, onSuccess]);

  const form = useForm({
    fields: [fileField],
    onSubmit: editAvatar,
  });

  return (
    <Dialog dialog={dialog}>
      <form {...form.props}>
        <Dialog.Title dialog={dialog}>Редактировать аватар</Dialog.Title>
        <Dialog.Body>
          <Input.File {...fileField.props} label="Новый аватар" />
        </Dialog.Body>
        <Dialog.Actions>
          <Button
            type="submit"
            width="full"
            loading={form.isSubmitting}
            disabled={form.isSubmitting}>
            Редактировать
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};
