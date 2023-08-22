import { Button } from '@client/shared/components/button';
import { Dialog } from '@client/shared/components/dialog';
import { Input } from '@client/shared/components/input';
import { useFileField, useForm } from '@libs/validate-react';

import styles from './avatar-editor.module.scss';

export type AvatarEditorForm = {
  file: File;
};

export type AvatarEditorProps = {
  isOpen: boolean;
  onSubmit: (value: AvatarEditorForm) => Promise<void>;
  onClose: () => void;
};

export const AvatarEditor = ({ isOpen, onSubmit, onClose }: AvatarEditorProps) => {
  const fileField = useFileField({
    name: 'file',
    rules: [value => (value ? null : 'Выберите файл')],
  });

  const form = useForm({
    fields: [fileField],
    onSubmit: async () => {
      if (!fileField.value) return;

      await onSubmit({ file: fileField.value });
    },
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
