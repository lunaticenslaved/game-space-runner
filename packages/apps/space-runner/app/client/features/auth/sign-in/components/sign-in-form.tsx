import { useCallback } from 'react';

import { AuthForm } from '@client/entities/user';
import { Input } from '@client/shared/components/input';
import { routes } from '@client/navigation';
import { useSignInMutation } from '@client/shared/api/auth';
import { FormState, useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { authApi } from '@shared/api';
import { validationRules } from '@libs/validate';

export const SignInForm = () => {
  const [mutate] = useSignInMutation();

  const loginField = useTextField({
    name: 'login',
    rules: [authApi.signIn.validator.login],
  });
  const passwordField = usePasswordField({
    name: 'password',
    rules: [validationRules.required()],
  });

  const signIn = useCallback(
    async ({ clear, isSubmitting }: FormState) => {
      if (isSubmitting) return;

      try {
        await mutate({
          login: loginField.value,
          password: passwordField.value,
        }).unwrap();
        clear();
      } catch {
        alert('Cannot sign in!');
      }
    },
    [loginField, passwordField]
  );

  const form = useForm({
    fields: [loginField, passwordField],
    onSubmit: signIn,
  });

  return (
    <AuthForm
      title="Вход"
      submitText="Войти"
      form={form}
      appendLink={routes.auth.signUp.path}
      appendText="Нет укканта?"
      appendLinkText="Загеристрироваться">
      <Input.TextInput label="Login" {...loginField.props} />
      <Input.TextInput label="Password" {...passwordField.props} />
    </AuthForm>
  );
};
