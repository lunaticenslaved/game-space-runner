import { useCallback, useState } from 'react';

import { AuthForm } from '@client/entities/user';
import { Input } from '@client/shared/components/input';
import { routes, useAppNavigation } from '@client/shared/navigation';
import { useSignInMutation } from '@client/shared/api/auth';
import { useForm, usePasswordField, useTextField } from '@libs/validate-react';
import { authApi } from '@shared/api';
import { validationRules } from '@libs/validate';
import { unwrapOperation } from '@shared/utils';
import { setViewer, useAppDispatch } from '@client/shared/store';

export const SignInForm = () => {
  const [mutate] = useSignInMutation();
  const [authError, setAuthError] = useState<string>();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const loginField = useTextField({
    name: 'login',
    rules: [authApi.signIn.validator.login],
  });
  const passwordField = usePasswordField({
    name: 'password',
    rules: [validationRules.required()],
  });

  const signIn = useCallback(async () => {
    setAuthError(undefined);
    unwrapOperation({
      response: await mutate({
        login: loginField.value,
        password: passwordField.value,
      }),
      onSuccess: viewer => {
        dispatch(setViewer(viewer));
        navigation.home.toRoot();
      },
      onError: error => {
        setAuthError(error.errors.join('\n'));
      },
    });
  }, [loginField, passwordField]);

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
