import { Button } from '@client/shared/components/button';
import { Dialog } from '@client/shared/components/dialog';
import { Input } from '@client/shared/components/input';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';

import styles from './password-editor.module.scss';
import { useCallback } from 'react';
import { API, useMutation } from '@shared/api';

export type PasswordEditorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  onSubmitError: () => void;
};

export const PasswordEditor = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  onSubmitError,
}: PasswordEditorProps) => {
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
          onSubmitSuccess();
        },
        onError(error) {
          alert(error.errors[0]);
          onSubmitError();
        },
      },
    );
  }, [mutation, newPassField.value, oldPassField.value, onSubmitError, onSubmitSuccess]);

  const form = useForm({
    fields: [oldPassField, newPassField, repeatPassField],
    onSubmit,
  });

  return (
    <Dialog
      title="Редактировать пароль"
      isOpen={isOpen}
      onClose={onClose}
      contentClass={styles.dialog}>
      <form {...form.props}>
        <Input.TextInput {...oldPassField.props} label="Старый пароль" />
        <Input.TextInput {...newPassField.props} label="Новый пароль" />
        <Input.TextInput {...repeatPassField.props} label="Повторите пароль" />

        <Button type="submit" width="full" loading={form.isSubmitting} disabled={form.isSubmitting}>
          Редактировать
        </Button>
      </form>
    </Dialog>
  );
};
