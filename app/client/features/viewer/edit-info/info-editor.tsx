import { useCallback } from 'react';

import { Button } from '@client/shared/components/button';
import { Input } from '@client/shared/components/input';
import { Dialog } from '@client/shared/components/dialog';
import { User } from '@client/entities/user';
import { useTextField, useForm } from '@libs/validate-react';
import { setViewer, useAppDispatch } from '@client/shared/store';
import { API, API_VALIDATORS, useMutation } from '@shared/api2';

import styles from './info-editor.module.scss';

export type InfoEditorFormValue = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
};

export type InfoEditorProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

export const InfoEditor = ({ user, isOpen, onClose, onUpdated }: InfoEditorProps) => {
  const mutation = useMutation('auth-update-info', API.viewer.updateInfo);
  const dispatch = useAppDispatch();

  const loginField = useTextField({
    value: user.login,
    name: 'login',
    rules: [API_VALIDATORS.viewer.updateInfo.login],
  });

  const onSubmit = useCallback(async () => {
    await mutation.mutateAsync(
      {
        login: loginField.value,
      },
      {
        onSuccess(viewer) {
          dispatch(setViewer(viewer));
          onUpdated();
        },
        onError(error) {
          console.error(error);
          alert('Cannot update user!');
        },
      },
    );
  }, [loginField.value, onUpdated, dispatch, mutation]);

  const { props, isSubmitting } = useForm({
    fields: [loginField],
    onSubmit,
  });

  return (
    <Dialog
      title="Редактировать данные"
      isOpen={isOpen}
      onClose={onClose}
      contentClass={styles.dialog}>
      <form {...props}>
        <Input.TextInput {...loginField.props} label="Логин" />

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Редактировать
        </Button>
      </form>
    </Dialog>
  );
};
