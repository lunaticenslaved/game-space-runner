import { useCallback } from 'react';

import { Button } from '@client/shared/components/button';
import { Dialog } from '@client/shared/components/dialog';
import { Input } from '@client/shared/components/input';
import { useFileField, useForm } from '@libs/validate-react';
import { API, useMutation } from '@shared/api';

import styles from './avatar-editor.module.scss';

export type AvatarEditorForm = {
  file: File;
};

export type AvatarEditorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  onSubmitError?: () => void;
};

export const AvatarEditor = ({
  isOpen,
  onClose,
  onSubmitError,
  onSubmitSuccess,
}: AvatarEditorProps) => {
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
      {
        file: fileField.value,
      },
      {
        onSuccess() {
          onSubmitSuccess();
        },
        onError(error) {
          alert(error.errors[0]);

          if (onSubmitError) {
            onSubmitError();
          }
        },
      },
    );
  }, [fileField.value, mutation, onSubmitError, onSubmitSuccess]);

  const form = useForm({
    fields: [fileField],
    onSubmit: editAvatar,
  });

  return (
    <Dialog
      title="Редактировать аватар"
      isOpen={isOpen}
      onClose={onClose}
      contentClass={styles.dialog}>
      <form {...form.props}>
        <Input.File {...fileField.props} label="Новый аватар" />

        <Button type="submit" loading={form.isSubmitting} disabled={form.isSubmitting}>
          Редактировать
        </Button>
      </form>
    </Dialog>
  );
};
