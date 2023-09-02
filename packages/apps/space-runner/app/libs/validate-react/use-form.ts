import { FormEventHandler, FormHTMLAttributes, useCallback, useMemo, useState } from 'react';

import { FormFieldState } from '@libs/validate';

type HTMLFormProps = FormHTMLAttributes<HTMLFormElement>;

export type UseFormProps = {
  fields: FormFieldState[];
  onSubmit: (form: FormState) => Promise<void> | void;
};

export type FormState = {
  props: Pick<HTMLFormProps, 'onSubmit'>;
  isSubmitting: boolean;
  clear: () => void;
};

// ANCHOR - сделать так, чтобы в сабмите значение очищались от null и undefined

export const useForm = ({ fields, onSubmit: onSubmitProp }: UseFormProps): FormState => {
  const [isSubmitting, setSubmitting] = useState(false);

  const clear = useCallback(() => {
    fields.forEach(field => field.clear());
  }, [fields]);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async event => {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      const isFormValid = (await Promise.all(fields.map(field => field.isValid()))).every(
        isValid => isValid
      );

      if (isFormValid) {
        setSubmitting(true);

        try {
          await onSubmitProp(formState);

          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);

          throw error;
        }
      }
    },
    [fields, onSubmitProp]
  );

  const formState = useMemo(
    () => ({
      isSubmitting,
      clear,
      props: {
        onSubmit,
      },
    }),
    [isSubmitting, clear, onSubmit]
  );

  return formState;
};
