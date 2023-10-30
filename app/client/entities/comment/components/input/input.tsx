import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

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
      <TextField label="Текст комментария" className="w-full" multiline rows={5} />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        loading={form.isSubmitting}
        disabled={form.isSubmitting}
        className="mt-4">
        Отправить
      </LoadingButton>
    </form>
  );
};
