import { Button } from '@client/shared/components/button';
import { Dialog } from '@client/shared/components/dialog';
import { Input } from '@client/shared/components/input';
import { useUpdatePasswordMutation } from '@client/shared/api/viewer';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { validationRules } from '@libs/validate';

import styles from './password-editor.module.scss';
import { useCallback } from 'react';

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
  const [updatePassword] = useUpdatePasswordMutation();
  const oldPassField = usePasswordField({
    value: '',
    name: 'oldPassword',
    rules: [],
  });
  const newPassField = usePasswordField({
    value: '',
    name: 'newPassword',
    rules: [validationRules.password()],
  });
  const repeatPassField = useTextField({
    value: '',
    name: 'repeatPassword',
    rules: [value => (newPassField.value === value ? null : 'Пароли должны совпадать')],
  });

  const onSubmit = useCallback(async () => {
    try {
      await updatePassword({});

      onSubmitSuccess();
    } catch (error) {
      console.error(error);
      onSubmitError();
    }
  }, []);

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

        <Button type="submit" loading={form.isSubmitting} disabled={form.isSubmitting}>
          Редактировать
        </Button>
      </form>
    </Dialog>
  );
};
