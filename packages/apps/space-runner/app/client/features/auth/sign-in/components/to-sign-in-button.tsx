import { routes } from '@client/shared/navigation';
import { Button } from '@client/shared/components/button';

export const ToSignInButton = () => {
  return <Button href={routes.auth.signIn.path}>Войти</Button>;
};
