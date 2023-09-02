import { useCallback } from 'react';

import { Button } from '@client/shared/components/button';
import { useLogoutMutation } from '@client/shared/api/auth';
import { unwrapOperation } from '@shared/utils';
import { useAppNavigation } from '@client/shared/navigation';
import { setViewer, useAppDispatch } from '@client/shared/store';

export const LogoutButton = () => {
  const [mutate, { isLoading }] = useLogoutMutation();
  const appNavigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const logout = useCallback(async () => {
    unwrapOperation({
      response: await mutate(),
      onSuccess() {
        dispatch(setViewer(undefined));
        appNavigation.home.toRoot();
      },
      onError() {
        dispatch(setViewer(undefined));
        appNavigation.home.toRoot();
      },
    });
  }, []);

  return (
    <Button onClick={logout} disabled={isLoading} loading={isLoading}>
      Выйти
    </Button>
  );
};
