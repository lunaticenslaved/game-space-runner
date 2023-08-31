import { Button } from '@client/shared/components/button';

export const LogoutButton = () => {
  const logout = () => {
    console.log('logout');
  };

  return <Button onClick={logout}>Выйти</Button>;
};
