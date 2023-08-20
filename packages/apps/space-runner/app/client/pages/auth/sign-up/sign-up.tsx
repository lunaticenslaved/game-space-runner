import { useMemo } from 'react';

import { Input } from '@client/shared/components/input';
import { AuthForm } from '@client/features/auth/auth-form';
import { useOAuthSignIn, useSignUp } from '@client/features/auth/hooks';
import { usePasswordField, useTextField } from '@libs/validate-react';
import { required } from '@libs/validate';
import { AuthLayout } from '@client/widgets/page-layouts/layouts/auth';

export const SignUpPage = () => {
  document.title = 'Регистрация';

  const emailField = useTextField({ name: 'email', rules: [required()] });
  const loginField = useTextField({ name: 'login', rules: [required()] });
  const firstNameField = useTextField({ name: 'firstName', rules: [required()] });
  const secondNameField = useTextField({ name: 'secondName', rules: [required()] });
  const phoneField = useTextField({ name: 'phone', rules: [required()] });
  const passwordField = usePasswordField({ name: 'password', rules: [required()] });
  const passwordConfirmField = usePasswordField({ name: 'passwordConfirm', rules: [required()] });
  const fields = useMemo(
    () => [
      emailField,
      firstNameField,
      secondNameField,
      phoneField,
      passwordField,
      passwordConfirmField,
    ],
    [emailField, firstNameField, passwordConfirmField, passwordField, phoneField, secondNameField]
  );

  const { signUp } = useSignUp();
  const { signIn: oauthSignIn } = useOAuthSignIn();

  // TODO вынести пароль как отдельный тип ввода

  return (
    <AuthLayout>
      <AuthForm
        title="Sign In"
        submitText="Sign In"
        fields={fields}
        onSubmit={signUp}
        onOAuthSubmit={oauthSignIn}>
        <Input.TextInput label="Email" {...emailField.props} />
        <Input.TextInput label="Login" {...loginField.props} />
        <Input.TextInput label="First Name" {...firstNameField.props} />
        <Input.TextInput label="Second Name" {...secondNameField.props} />
        <Input.TextInput label="Phone" {...phoneField.props} />
        <Input.TextInput label="Password" {...passwordField.props} />
        <Input.TextInput label="Password Repeat" {...passwordConfirmField.props} />
      </AuthForm>
    </AuthLayout>
  );
};
