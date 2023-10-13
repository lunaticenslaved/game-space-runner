import { Input } from '@client/shared/components/input';
import { Button } from '@libs/uikit/components/button';
import { useForm, useTextField } from '@libs/validate-react';

export interface CommentInputProps {
  onSubmit: (text: string) => Promise<void> | void;
}

export const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const textField = useTextField({
    name: 'text',
    rules: [value => (value ? null : 'Укажите текст')],
  });

  const form = useForm({
    fields: [textField],
    onSubmit: async () => {
      if (!textField.value) return;

      await onSubmit(textField.value);
      form.clear();
    },
  });

  return (
    <form {...form.props}>
      <Input.TextArea {...textField.props} label="Текст комментария" rows={5} />
      <Button type="submit" loading={form.isSubmitting} disabled={form.isSubmitting}>
        Отправить
      </Button>
    </form>
  );
};
