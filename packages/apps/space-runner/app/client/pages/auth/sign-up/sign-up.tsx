import { Input } from '@client/shared/components/input';
import { AuthForm, useSignUpForm, useOAuthSignIn } from '@client/features/auth';
import { AuthLayout } from '@client/widgets/page-layouts/auth';
import { routes } from '@client/navigation';

export const SignUpPage = () => {
  document.title = 'Регистрация';

  const { form, fields } = useSignUpForm({});
  const { signIn: oauthSignIn } = useOAuthSignIn();

  // TODO вынести пароль как отдельный тип ввода

  return (
    <AuthLayout>
      <AuthForm
        title="Регистрация"
        submitText="Зарегистрироваться"
        appendLink={routes.auth.signIn.path}
        appendText="Уже есть аккаунт?"
        appendLinkText="Войти"
        form={form}
        onOAuthSubmit={oauthSignIn}>
        <Input.TextInput label="E-mail" {...fields.email.props} />
        <Input.TextInput label="Логин" {...fields.login.props} />
        <Input.TextInput label="Имя" {...fields.name.props} />
        <Input.TextInput label="Телефон" {...fields.phone.props} />
        <Input.TextInput label="Пароль" {...fields.password.props} />
        <Input.TextInput label="Повторите пароль" {...fields.passwordConfirm.props} />
      </AuthForm>
    </AuthLayout>
  );
};
