import { routes } from '@client/shared/navigation';
import { Button } from '@mui/material';

export const ToSignInButton = () => {
  return <Button href={routes.auth.signIn.path}>Войти</Button>;
};
