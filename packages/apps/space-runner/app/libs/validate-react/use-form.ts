import { FormEventHandler, FormHTMLAttributes, useCallback, useState } from 'react';

import { FormFieldState } from '@libs/validate';

type HTMLFormProps = FormHTMLAttributes<HTMLFormElement>;

export type UseFormProps = {
  fields: FormFieldState[];
  onSubmit: () => Promise<void> | void;
};

export type UseFormState = {
  props: Pick<HTMLFormProps, 'onSubmit'>;
  isSubmitting: boolean;
  clear: () => void;
};

// ANCHOR - сделать так, чтобы в сабмите значение очищались от null и undefined

export const useForm = ({ fields, onSubmit: onSubmitProp }: UseFormProps): UseFormState => {
  const [isSubmitting, setSubmitting] = useState(false);

  const clear = useCallback(() => {
    fields.forEach(field => field.clear());
  }, [fields]);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async event => {
      event.preventDefault();

      const isFormValid = (await Promise.all(fields.map(field => field.isValid()))).every(
        isValid => isValid
      );

      if (isFormValid) {
        setSubmitting(true);

        try {
          await onSubmitProp();

          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);

          throw error;
        }
      }
    },
    [fields, onSubmitProp]
  );

  return {
    isSubmitting,
    clear,
    props: {
      onSubmit,
    },
  };
};
