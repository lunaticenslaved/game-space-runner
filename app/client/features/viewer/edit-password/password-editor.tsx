import { useCallback } from 'react';

import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { API, useMutation } from '@shared/api';
import { DialogInterface } from '@client/shared/hooks';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export type PasswordEditorProps = {
  dialog: DialogInterface;
  onSuccess: () => void;
};

export const PasswordEditor = ({ dialog, onSuccess }: PasswordEditorProps) => {
  const mutation = useMutation('auth-update-password', API.viewer.updatePassword.action);
  const oldPassField = usePasswordField({
    value: '',
    name: 'oldPassword',
    rules: [API.viewer.updatePassword.validators.oldPassword],
  });
  const newPassField = usePasswordField({
    value: '',
    name: 'newPassword',
    rules: [API.viewer.updatePassword.validators.newPassword],
  });
  const repeatPassField = useTextField({
    value: '',
    name: 'repeatPassword',
    rules: [value => (newPassField.value === value ? null : 'Пароли должны совпадать')],
  });

  const onSubmit = useCallback(async () => {
    await mutation.mutateAsync(
      {
        oldPassword: oldPassField.value,
        newPassword: newPassField.value,
      },
      {
        onSuccess() {
          onSuccess();
        },
        onError(error) {
          alert(error.errors[0]);
        },
      },
    );
  }, [mutation, newPassField.value, oldPassField.value, onSuccess]);

  const form = useForm({
    fields: [oldPassField, newPassField, repeatPassField],
    onSubmit,
  });

  return (
    <Dialog open={dialog.isOpen}>
      <form {...form.props}>
        <DialogTitle>Редактировать пароль</DialogTitle>
        <DialogContent>
          <TextField {...oldPassField.props} error={!!oldPassField.props} label="Старый пароль" />
          <TextField {...newPassField.props} error={!!newPassField.props} label="Новый пароль" />
          <TextField
            {...repeatPassField.props}
            error={!!repeatPassField.props}
            label="Повторите пароль"
          />
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
