import { Button } from '@client/shared/components/button';
import { Dialog } from '@client/shared/components/dialog';
import { Input } from '@client/shared/components/input';
import { useForm, useTextField } from '@libs/validate-react';

import styles from './topic-form-dialog.module.scss';

export type TopicFormDialogValues = {
  title: string;
  content: string;
};

export interface TopicFormDialogProps {
  isOpen: boolean;
  onSubmit: (values: TopicFormDialogValues) => Promise<void> | void;
  onClose: () => void;
}

export const TopicFormDialog = ({ isOpen, onSubmit, onClose }: TopicFormDialogProps) => {
  const titleField = useTextField({
    name: 'title',
    rules: [value => (value ? null : 'Укажите заголовок поста')],
  });
  const contentField = useTextField({
    name: 'content',
    rules: [value => (value ? null : 'Укажите контент поста')],
  });

  const { isSubmitting, props } = useForm({
    fields: [titleField, contentField],
    onSubmit: async () => {
      if (!titleField.value) return;

      await onSubmit({ title: titleField.value, content: contentField.value });
    },
  });

  return (
    <Dialog title="Новый пост" isOpen={isOpen} onClose={onClose} contentClass={styles.dialog}>
      <form {...props}>
        <Input.TextInput {...titleField.props} label="Тема" />
        <Input.TextArea {...contentField.props} label="Контент" />
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Создать
        </Button>
      </form>
    </Dialog>
  );
};
