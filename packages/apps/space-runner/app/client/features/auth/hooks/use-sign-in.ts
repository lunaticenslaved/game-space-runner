import { useCallback, useMemo } from 'react';

import { QueryHandler } from '@client/shared/api';
import { SignInResponse, useSignInMutation } from '@client/shared/api/auth';
import { validationRules } from '@libs/validate';
import { FormState, usePasswordField, useTextField } from '@libs/validate-react';
import { useForm } from '@libs/validate-react';
import { authApi } from '@shared/api';

export const useSignInForm = ({ onSuccess, onError }: QueryHandler<SignInResponse>) => {
  const [mutate] = useSignInMutation();

  const loginField = useTextField({
    name: 'login',
    rules: [authApi.signIn.validator.login],
  });
  const passwordField = usePasswordField({
    name: 'password',
    rules: [validationRules.required()],
  });

  const signIn = useCallback(
    async ({ clear, isSubmitting }: FormState) => {
      if (isSubmitting) return;

      try {
        const response = await mutate({
          login: loginField.value,
          password: passwordField.value,
        }).unwrap();

        if (onSuccess) onSuccess(response);

        clear();
      } catch {
        if (onError) onError();
      }
    },
    [loginField, passwordField]
  );

  const form = useForm({
    fields: [loginField, passwordField],
    onSubmit: signIn,
  });

  return useMemo(
    () => ({
      form,
      fields: {
        login: loginField,
        password: passwordField,
      },
    }),
    [form, loginField, passwordField]
  );
};
