import { useCallback } from 'react';

import { useFileField, useForm } from '@libs/validate-react';
import { API, useMutation } from '@shared/api';
import { DialogInterface } from '@client/shared/hooks';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

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
    <Dialog open={dialog.isOpen}>
      <form {...form.props}>
        <DialogTitle>Редактировать аватар</DialogTitle>
        <DialogContent>
          <TextField {...fileField.props} error={!!fileField.props} label="Новый аватар" />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            className="w-full"
            loading={form.isSubmitting}
            disabled={form.isSubmitting}>
            Редактировать
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
