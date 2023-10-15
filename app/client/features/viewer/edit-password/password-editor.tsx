import { useCallback } from 'react';

import { Button } from '@libs/uikit/components/button';
import { Dialog, DialogInterface } from '@libs/uikit/components/dialog';
import { Input } from '@libs/uikit/components/input';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { API, useMutation } from '@shared/api';

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
    <Dialog dialog={dialog}>
      <form {...form.props}>
        <Dialog.Title dialog={dialog}>Редактировать пароль</Dialog.Title>
        <Dialog.Body>
          <Input.TextInput {...oldPassField.props} label="Старый пароль" />
          <Input.TextInput {...newPassField.props} label="Новый пароль" />
          <Input.TextInput {...repeatPassField.props} label="Повторите пароль" />
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
