import { useCallback } from 'react';

import { Button } from '@client/shared/components/button';
import { Input } from '@client/shared/components/input';
import { Dialog } from '@client/shared/components/dialog';
import { User } from '@client/entities/user';
import { useUpdateInfoMutation } from '@client/shared/api/viewer';

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
  onClose: () => void;
  onSubmitSuccess: () => void;
  onSubmitError: () => void;
};

export const InfoEditor = ({
  user,
  isOpen,
  onClose,
  onSubmitSuccess,
  onSubmitError,
}: InfoEditorProps) => {
  const [mutate] = useUpdateInfoMutation();

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

  const onSubmit = useCallback(async () => {
    try {
      await mutate({});

      onSubmitSuccess();
    } catch (error) {
      console.error(error);
      onSubmitError();
    }
  }, []);

  const { props, isSubmitting } = useForm({
    fields: [emailField, loginField, firstNameField, secondNameField, phoneField],
    onSubmit,
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
