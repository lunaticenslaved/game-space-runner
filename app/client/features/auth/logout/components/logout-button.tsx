import { useCallback } from 'react';

import { Button } from '@client/shared/components/button';
import { useAppNavigation } from '@client/shared/navigation';
import { setViewer, useAppDispatch } from '@client/shared/store';
import { API, useMutation } from '@shared/api';

export const LogoutButton = () => {
  const mutation = useMutation('logout', API.auth.logout.action);
  const appNavigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const logout = useCallback(async () => {
    mutation.mutateAsync(undefined, {
      onSuccess() {
        dispatch(setViewer(undefined));
        appNavigation.home.toRoot();
      },
      onError() {
        dispatch(setViewer(undefined));
        appNavigation.home.toRoot();
      },
    });
  }, [appNavigation.home, dispatch, mutation]);

  return (
    <Button onClick={logout} disabled={mutation.isLoading} loading={mutation.isLoading}>
      Выйти
    </Button>
  );
};
