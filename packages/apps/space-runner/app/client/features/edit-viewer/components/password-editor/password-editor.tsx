import { Button } from '@client/shared/components/button';
import { Dialog } from '@client/shared/components/dialog';
import { Input } from '@client/shared/components/input';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';

import styles from './password-editor.module.scss';
import { validationRules } from '@libs/validate';

export type PasswordEditorForm = {
  oldPassword: string;
  newPassword: string;
};

export type PasswordEditorProps = {
  isOpen: boolean;
  onSubmit: (values: PasswordEditorForm) => Promise<void>;
  onClose: () => void;
};

export const PasswordEditor = ({ isOpen, onSubmit, onClose }: PasswordEditorProps) => {
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

  const form = useForm({
    fields: [oldPassField, newPassField, repeatPassField],
    onSubmit: async () => {
      await onSubmit({
        oldPassword: oldPassField.value,
        newPassword: newPassField.value,
      });
    },
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
