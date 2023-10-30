import { AuthLayout } from '@client/widgets/page-layouts';
import { SignUpForm } from '@client/features/auth/sign-up';

export const SignUpPage = () => {
  document.title = 'Регистрация';

  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};
