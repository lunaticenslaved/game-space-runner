import { useCallback } from 'react';

import { Button } from '@libs/uikit/components/button';
import { Input } from '@libs/uikit/components/input';
import { Dialog, DialogInterface } from '@libs/uikit/components/dialog';
import { User } from '@shared/models/user';
import { useTextField, useForm } from '@libs/validate-react';
import { setViewer, useAppDispatch } from '@shared/store';
import { API, useMutation } from '@shared/api';

export type InfoEditorFormValue = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
};

export type InfoEditorProps = {
  user: User;
  dialog: DialogInterface;
  onSuccess: () => void;
};

export const InfoEditor = ({ user, dialog, onSuccess }: InfoEditorProps) => {
  const mutation = useMutation('auth-update-info', API.viewer.updateInfo.action);
  const dispatch = useAppDispatch();

  const loginField = useTextField({
    value: user.login,
    name: 'login',
    rules: [API.viewer.updateInfo.validators.login],
  });

  const onSubmit = useCallback(async () => {
    await mutation.mutateAsync(
      {
        login: loginField.value,
      },
      {
        onSuccess(viewer) {
          dispatch(setViewer(viewer));
          onSuccess();
        },
        onError(error) {
          console.error(error);
          alert('Cannot update user!');
        },
      },
    );
  }, [loginField.value, onSuccess, dispatch, mutation]);

  const { props, isSubmitting } = useForm({
    fields: [loginField],
    onSubmit,
  });

  return (
    <Dialog dialog={dialog}>
      <form {...props}>
        <Dialog.Title dialog={dialog}>Редактировать данные</Dialog.Title>
        <Dialog.Body>
          <Input.TextInput {...loginField.props} label="Логин" />
        </Dialog.Body>
        <Dialog.Actions>
          <Button type="submit" width="full" loading={isSubmitting} disabled={isSubmitting}>
            Редактировать
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};
