import { Input } from '@client/shared/components/input';
import { AuthForm, useOAuthSignIn } from '@client/features/auth';
import { AuthLayout } from '@client/widgets/page-layouts/auth';
import { routes } from '@client/navigation';
import { useSignInForm } from '@client/features/auth/hooks/use-sign-in';

export const SignInPage = () => {
  document.title = 'Вход';

  const { fields, form } = useSignInForm({});
  const { signIn: oauthSignIn } = useOAuthSignIn();

  // TODO вынести пароль как отдельный тип ввода

  return (
    <AuthLayout>
      <AuthForm
        title="Вход"
        submitText="Войти"
        form={form}
        appendLink={routes.auth.signUp.path}
        appendText="Нет укканта?"
        appendLinkText="Загеристрироваться"
        onOAuthSubmit={oauthSignIn}>
        <Input.TextInput label="Login" {...fields.login.props} />
        <Input.TextInput label="Password" {...fields.password.props} />
      </AuthForm>
    </AuthLayout>
  );
};
