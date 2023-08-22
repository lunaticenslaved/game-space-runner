import { useCallback, useMemo } from 'react';

import { QueryHandler } from '@client/shared/api';
import { SignInResponse, useSignInMutation } from '@client/shared/api/auth';
import { validationRules } from '@libs/validate';
import { usePasswordField, useTextField } from '@libs/validate-react';
import { useForm } from '@libs/validate-react';

export const useSignInForm = ({ onSuccess, onError }: QueryHandler<SignInResponse>) => {
  const [mutate] = useSignInMutation();

  const loginField = useTextField({
    name: 'login',
    rules: [validationRules.required()],
  });
  const passwordField = usePasswordField({
    name: 'password',
    rules: [validationRules.required()],
  });

  const signIn = useCallback(async () => {
    try {
      const response = await mutate({});

      if (onSuccess) onSuccess(response);
    } catch {
      if (onError) onError();
    }
  }, []);

  const fields = useMemo(() => [loginField, passwordField], []);
  const form = useForm({ fields, onSubmit: signIn });

  return useMemo(
    () => ({
      form,
      fields: {
        login: loginField,
        password: passwordField,
      },
    }),
    []
  );
};
