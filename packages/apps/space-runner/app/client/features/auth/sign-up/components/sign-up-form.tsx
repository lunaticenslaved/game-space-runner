import { useCallback, useMemo } from 'react';

import { AuthForm } from '@client/entities/user';
import { Input } from '@client/shared/components/input';
import { routes } from '@client/navigation';
import { useSignUpMutation } from '@client/shared/api/auth';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { validationRules } from '@libs/validate';

export const SignUpForm = () => {
  const [mutate] = useSignUpMutation();

  const emailField = useTextField({ name: 'email', rules: [validationRules.required()] });
  const loginField = useTextField({ name: 'login', rules: [validationRules.required()] });
  const nameField = useTextField({ name: 'firstName', rules: [validationRules.required()] });
  const passwordField = usePasswordField({ name: 'password', rules: [validationRules.required()] });
  const passwordConfirmField = usePasswordField({
    name: 'passwordConfirm',
    rules: [validationRules.required()],
  });
  const fields = useMemo(
    () => [emailField, nameField, passwordField, passwordConfirmField],
    [emailField, nameField, passwordConfirmField, passwordField]
  );

  const signUp = useCallback(async () => {
    try {
      await mutate({});
    } catch {
      alert('Cannot sign up!');
    }
  }, []);

  const form = useForm({ fields, onSubmit: signUp });

  return (
    <AuthForm
      title="Регистрация"
      submitText="Зарегистрироваться"
      appendLink={routes.auth.signIn.path}
      appendText="Уже есть аккаунт?"
      appendLinkText="Войти"
      form={form}>
      <Input.TextInput label="E-mail" {...emailField.props} />
      <Input.TextInput label="Логин" {...loginField.props} />
      <Input.TextInput label="Имя" {...nameField.props} />
      <Input.TextInput label="Пароль" {...passwordField.props} />
      <Input.TextInput label="Повторите пароль" {...passwordConfirmField.props} />
    </AuthForm>
  );
};
