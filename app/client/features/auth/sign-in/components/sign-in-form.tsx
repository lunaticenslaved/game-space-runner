import { useCallback, useState } from 'react';

import { AuthForm } from '@client/entities/user';
import { Input } from '@client/shared/components/input';
import { routes, useAppNavigation } from '@client/shared/navigation';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { setViewer, useAppDispatch } from '@client/shared/store';
import { API, API_VALIDATORS, useMutation } from '@shared/api2';

export const SignInForm = () => {
  const mutation = useMutation('sign-in', API.auth.signIn);
  const [authError, setAuthError] = useState<string>();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const loginField = useTextField({
    name: 'login',
    rules: [API_VALIDATORS.auth.signIn.login],
  });
  const passwordField = usePasswordField({
    name: 'password',
    rules: [API_VALIDATORS.auth.signIn.password],
  });

  const signIn = useCallback(async () => {
    setAuthError(undefined);
    await mutation.mutateAsync(
      {
        login: loginField.value,
        password: passwordField.value,
      },
      {
        onSuccess(viewer) {
          console.log(viewer);
          dispatch(setViewer(viewer));
          navigation.home.toRoot();
        },
        onError(error) {
          setAuthError(error.errors.join('\n'));
        },
      },
    );
  }, [dispatch, loginField.value, mutation, navigation.home, passwordField.value]);

  const form = useForm({
    fields: [loginField, passwordField],
    onSubmit: signIn,
  });

  return (
    <AuthForm
      title="Вход"
      submitText="Войти"
      form={form}
      authError={authError}
      appendLink={routes.auth.signUp.path}
      appendText="Нет аккаунта?"
      appendLinkText="Зарегистрироваться">
      <Input.TextInput label="Login" {...loginField.props} />
      <Input.TextInput label="Password" {...passwordField.props} />
    </AuthForm>
  );
};
