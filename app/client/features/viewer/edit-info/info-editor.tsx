import { useCallback } from 'react';

import { User } from '@shared/models/user';
import { useTextField, useForm } from '@libs/validate-react';
import { setViewer, useAppDispatch } from '@shared/store';
import { API, useMutation } from '@shared/api';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DialogInterface } from '@client/shared/hooks';

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
    <Dialog open={dialog.isOpen}>
      <form {...props}>
        <DialogTitle>Редактировать данные</DialogTitle>
        <DialogContent>
          <TextField {...loginField.props} error={!!loginField.props} label="Логин" />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            className="w-full"
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}>
            Редактировать
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
