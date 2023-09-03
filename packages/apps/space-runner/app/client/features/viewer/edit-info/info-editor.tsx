import { useCallback } from 'react';

import { Button } from '@client/shared/components/button';
import { Input } from '@client/shared/components/input';
import { Dialog } from '@client/shared/components/dialog';
import { User } from '@client/entities/user';
import { useUpdateInfoMutation } from '@client/shared/api/viewer';
import { unwrapOperation } from '@shared/utils';
import { useTextField, useForm } from '@libs/validate-react';
import { viewerApi } from '@shared/api';
import { setViewer, useAppDispatch } from '@client/shared/store';

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
  const [mutate] = useUpdateInfoMutation();
  const dispatch = useAppDispatch();

  const loginField = useTextField({
    value: user.login,
    name: 'login',
    rules: [viewerApi.updateInfo.validator.login],
  });

  const onSubmit = useCallback(async () => {
    unwrapOperation({
      response: await mutate({
        login: loginField.value,
      }),
      onSuccess: viewer => {
        dispatch(setViewer(viewer));
        onUpdated();
      },
      onError: () => alert('Cannot update user!'),
    });
  }, [loginField.value, onUpdated, dispatch, mutate]);

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
