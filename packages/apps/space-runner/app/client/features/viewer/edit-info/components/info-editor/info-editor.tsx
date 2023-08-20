import { Button } from '@client/shared/components/button';
import { Input } from '@client/shared/components/input';
import { Dialog } from '@client/shared/components/dialog';
import { User } from '@client/entities/user';

import { validationRules } from '@libs/validate';
import { useTextField, useForm } from '@libs/validate-react';

import styles from './info-editor.module.scss';

export type InfoEditorFormValue = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
};

export type InfoEditorProps = {
  user: User;
  isOpen: boolean;
  onSubmit: (values: InfoEditorFormValue) => Promise<void> | void;
  onClose: () => void;
};

export const InfoEditor = ({ user, isOpen, onSubmit, onClose }: InfoEditorProps) => {
  const emailField = useTextField({
    value: user.email || '',
    name: 'email',
    rules: [validationRules.email()],
  });
  const loginField = useTextField({
    value: user.login || '',
    name: 'login',
    rules: [validationRules.login()],
  });
  const firstNameField = useTextField({
    value: user.firstName || '',
    name: 'first_name',
    rules: [validationRules.name()],
  });
  const secondNameField = useTextField({
    value: user.secondName || '',
    name: 'second_name',
    rules: [validationRules.name()],
  });
  const phoneField = useTextField({
    value: user.phone || '',
    name: 'phone',
    rules: [validationRules.phone()],
  });
  const { props, isSubmitting } = useForm({
    fields: [emailField, loginField, firstNameField, secondNameField, phoneField],
    onSubmit: async () => {
      await onSubmit({
        login: loginField.value,
        email: emailField.value,
        firstName: firstNameField.value,
        secondName: secondNameField.value,
        phone: phoneField.value,
      });
    },
  });

  return (
    <Dialog
      title="Редактировать данные"
      isOpen={isOpen}
      onClose={onClose}
      contentClass={styles.dialog}>
      <form {...props}>
        <Input.TextInput {...emailField.props} label="E-mail" />
        <Input.TextInput {...loginField.props} label="Логин" />
        <Input.TextInput {...firstNameField.props} label="Имя" />
        <Input.TextInput {...secondNameField.props} label="Фамилия" />
        <Input.TextInput {...phoneField.props} label="Телефон" />

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Редактировать
        </Button>
      </form>
    </Dialog>
  );
};
