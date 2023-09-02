import { useCallback, useMemo, useState } from 'react';

import { AuthForm } from '@client/entities/user';
import { Input } from '@client/shared/components/input';
import { routes, useAppNavigation } from '@client/shared/navigation';
import { useSignUpMutation } from '@client/shared/api/auth';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { validationRules } from '@libs/validate';
import { unwrapOperation } from '@shared/utils';

export const SignUpForm = () => {
  const [mutate] = useSignUpMutation();
  const [authError, setAuthError] = useState<string>();
  const navigation = useAppNavigation();

  const loginField = useTextField({ name: 'login', rules: [validationRules.required()] });
  const passwordField = usePasswordField({ name: 'password', rules: [validationRules.required()] });
  const passwordConfirmField = usePasswordField({
    name: 'passwordConfirm',
    rules: [
      validationRules.required(),
      value => {
        return Promise.resolve(value !== passwordField.value ? 'Password not match' : null);
      },
    ],
  });
  const fields = useMemo(
    () => [loginField, passwordField, passwordConfirmField],
    [loginField, passwordConfirmField, passwordField]
  );

  const signUp = useCallback(async () => {
    setAuthError(undefined);
    unwrapOperation({
      response: await mutate({
        login: loginField.value,
        password: passwordField.value,
      }),
      onSuccess: () => {
        navigation.home.toRoot();
      },
      onError: error => {
        setAuthError(error.errors.join('\n'));
      },
    });
  }, [loginField, passwordField]);

  const form = useForm({ fields, onSubmit: signUp });

  return (
    <AuthForm
      title="Регистрация"
      submitText="Зарегистрироваться"
      authError={authError}
      appendLink={routes.auth.signIn.path}
      appendText="Уже есть аккаунт?"
      appendLinkText="Войти"
      form={form}>
      <Input.TextInput label="Логин" {...loginField.props} />
      <Input.TextInput label="Пароль" {...passwordField.props} />
      <Input.TextInput label="Повторите пароль" {...passwordConfirmField.props} />
    </AuthForm>
  );
};
