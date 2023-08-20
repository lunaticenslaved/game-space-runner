import { useCallback } from 'react';

import { AuthLayout } from '@client/pages/__layouts__/auth-layout';
import { Input } from '@client/shared/components/input';
import { AuthForm } from '@client/features/auth/components/auth-form';

export const SignInPage = () => {
  // TODO вынести пароль как отдельный тип ввода
  const signIn = useCallback(() => {
    console.log('sign-in');
  }, []);
  const gotoAuthSignIn = useCallback(() => {
    console.log('gotoAuthSignIn');
  }, []);

  return (
    <AuthLayout>
      <AuthForm
        title="Sign In"
        submitText="Sign In"
        onSubmit={signIn}
        fields={[]}
        onOAuthSubmit={gotoAuthSignIn}>
        <Input.TextInput name="login" label="Login" />
        <Input.TextInput name="password" label="Password" />
      </AuthForm>
    </AuthLayout>
  );
};
