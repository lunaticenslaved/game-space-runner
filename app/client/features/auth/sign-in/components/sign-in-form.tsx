import { useCallback, useState } from 'react';

import { UserComponent } from '@client/entities/user';
import { Input } from '@libs/uikit/components/input';
import { routes, useAppNavigation } from '@client/shared/navigation';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { setViewer, useAppDispatch } from '@shared/store';
import { API, useMutation } from '@shared/api';

export const SignInForm = () => {
  const mutation = useMutation('sign-in', API.auth.signIn.action);
  const [authError, setAuthError] = useState<string>();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const loginField = useTextField({
    name: 'login',
    rules: [API.auth.signIn.validators.login],
  });
  const passwordField = usePasswordField({
    name: 'password',
    rules: [API.auth.signIn.validators.password],
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
    <UserComponent.AuthForm
      title="Вход"
      submitText="Войти"
      form={form}
      authError={authError}
      appendLink={routes.auth.signUp.path}
      appendText="Нет аккаунта?"
      appendLinkText="Зарегистрироваться">
      <Input.TextInput label="Login" {...loginField.props} />
      <Input.TextInput label="Password" {...passwordField.props} />
    </UserComponent.AuthForm>
  );
};
