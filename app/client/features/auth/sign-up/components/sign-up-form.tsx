import { useCallback, useMemo, useState } from 'react';

import { AuthForm } from '@client/entities/user';
import { Input } from '@client/shared/components/input';
import { routes, useAppNavigation } from '@client/shared/navigation';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { validationRules } from '@libs/validate';
import { setViewer, useAppDispatch } from '@client/shared/store';
import { API, API_VALIDATORS, useMutation } from '@shared/api2';

export const SignUpForm = () => {
  const mutation = useMutation('sign-up', API.auth.signUp);
  const [authError, setAuthError] = useState<string>();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const loginField = useTextField({
    name: 'login',
    rules: [API_VALIDATORS.auth.signUp.login],
  });
  const passwordField = usePasswordField({
    name: 'password',
    rules: [API_VALIDATORS.auth.signUp.password],
  });
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
    [loginField, passwordConfirmField, passwordField],
  );

  const signUp = useCallback(async () => {
    setAuthError(undefined);
    await mutation.mutateAsync(
      {
        login: loginField.value,
        password: passwordField.value,
      },
      {
        onSuccess(viewer) {
          dispatch(setViewer(viewer));
          navigation.home.toRoot();
        },
        onError(error) {
          setAuthError(error.errors.join('\n'));
        },
      },
    );
  }, [dispatch, loginField.value, mutation, navigation.home, passwordField.value]);

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
