import { useCallback } from 'react';

import { Button } from '@client/shared/components/button';
import { Dialog } from '@client/shared/components/dialog';
import { Input } from '@client/shared/components/input';
import { useUpdateAvatarMutation } from '@client/shared/api/viewer';
import { useFileField, useForm } from '@libs/validate-react';

import styles from './avatar-editor.module.scss';

export type AvatarEditorForm = {
  file: File;
};

export type AvatarEditorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  onSubmitError: () => void;
};

export const AvatarEditor = ({
  isOpen,
  onClose,
  onSubmitError,
  onSubmitSuccess,
}: AvatarEditorProps) => {
  const [mutate] = useUpdateAvatarMutation();

  const fileField = useFileField({
    name: 'file',
    rules: [value => (value ? null : 'Выберите файл')],
  });

  const editAvatar = useCallback(async () => {
    try {
      await mutate({});

      onSubmitSuccess();
    } catch (error) {
      console.error(error);
      onSubmitError();
    }
  }, []);

  const form = useForm({
    fields: [fileField],
    onSubmit: editAvatar,
  });

  return (
    <Dialog
      title="Редактировать аватар"
      isOpen={isOpen}
      onClose={onClose}
      contentClass={styles.dialog}>
      <form {...form.props}>
        <Input.File {...fileField.props} label="Новый аватар" />

        <Button type="submit" loading={form.isSubmitting} disabled={form.isSubmitting}>
          Редактировать
        </Button>
      </form>
    </Dialog>
  );
};
