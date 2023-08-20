import { useMemo } from 'react';

import { Input } from '@client/shared/components/input';
import { AuthForm } from '@client/features/auth/_components/auth-form';
import { useOAuthSignIn } from '@client/features/auth/oauth';
import { useSignUp } from '@client/features/auth/sign-up';
import { AuthLayout } from '@client/widgets/page-layouts/layouts/auth';
import { usePasswordField, useTextField } from '@libs/validate-react';
import { validationRules } from '@libs/validate';

export const SignUpPage = () => {
  document.title = 'Регистрация';

  const emailField = useTextField({ name: 'email', rules: [validationRules.required()] });
  const loginField = useTextField({ name: 'login', rules: [validationRules.required()] });
  const firstNameField = useTextField({ name: 'firstName', rules: [validationRules.required()] });
  const secondNameField = useTextField({ name: 'secondName', rules: [validationRules.required()] });
  const phoneField = useTextField({ name: 'phone', rules: [validationRules.required()] });
  const passwordField = usePasswordField({ name: 'password', rules: [validationRules.required()] });
  const passwordConfirmField = usePasswordField({
    name: 'passwordConfirm',
    rules: [validationRules.required()],
  });
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
