import { useMemo } from 'react';

import { Input } from '@client/shared/components/input';
import { AuthForm } from '@client/features/auth/_components/auth-form';
import { useOAuthSignIn } from '@client/features/auth/oauth';
import { useSignIn } from '@client/features/auth/sign-in';
import { AuthLayout } from '@client/widgets/page-layouts/layouts/auth';
import { usePasswordField, useTextField } from '@libs/validate-react';
import { validationRules } from '@libs/validate';

export const SignInPage = () => {
  document.title = 'Вход';

  const loginField = useTextField({
    name: 'login',
    rules: [validationRules.required()],
  });
  const passwordField = usePasswordField({
    name: 'password',
    rules: [validationRules.required()],
  });
  const fields = useMemo(() => [loginField, passwordField], [loginField, passwordField]);

  const { signIn } = useSignIn();
  const { signIn: oauthSignIn } = useOAuthSignIn();

  // TODO вынести пароль как отдельный тип ввода

  return (
    <AuthLayout>
      <AuthForm
        title="Sign In"
        submitText="Sign In"
        fields={fields}
        onSubmit={signIn}
        onOAuthSubmit={oauthSignIn}>
        <Input.TextInput label="Login" {...loginField.props} error={loginField.error} />
        <Input.TextInput label="Password" {...passwordField.props} error={passwordField.error} />
      </AuthForm>
    </AuthLayout>
  );
};
