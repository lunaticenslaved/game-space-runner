import { routes } from '@client/navigation';
import { Button } from '@client/shared/components/button';

export const ToSignInButton = () => {
  return <Button href={routes.auth.signIn.path}>Войти</Button>;
};
