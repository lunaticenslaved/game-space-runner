import { AuthLayout } from '@client/widgets/page-layouts';
import { SignInForm } from '@client/features/auth/sign-in';

export const SignInPage = () => {
  document.title = 'Вход';

  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};
