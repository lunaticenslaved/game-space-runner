import { useCallback, useMemo } from 'react';

import { QueryHandler } from '@client/shared/api';
import { SignUpResponse, useSignUpMutation } from '@client/shared/api/auth';
import { validationRules } from '@libs/validate';
import { usePasswordField, useTextField } from '@libs/validate-react';
import { useForm } from '@libs/validate-react';

export const useSignUpForm = ({ onSuccess, onError }: QueryHandler<SignUpResponse>) => {
  const [mutate] = useSignUpMutation();

  const emailField = useTextField({ name: 'email', rules: [validationRules.required()] });
  const loginField = useTextField({ name: 'login', rules: [validationRules.required()] });
  const nameField = useTextField({ name: 'firstName', rules: [validationRules.required()] });
  const phoneField = useTextField({ name: 'phone', rules: [validationRules.required()] });
  const passwordField = usePasswordField({ name: 'password', rules: [validationRules.required()] });
  const passwordConfirmField = usePasswordField({
    name: 'passwordConfirm',
    rules: [validationRules.required()],
  });
  const fields = useMemo(
    () => [emailField, nameField, phoneField, passwordField, passwordConfirmField],
    [emailField, nameField, passwordConfirmField, passwordField, phoneField]
  );

  const signUp = useCallback(async () => {
    try {
      const response = await mutate({});

      if (onSuccess) onSuccess(response);
    } catch {
      if (onError) onError();
    }
  }, []);

  const form = useForm({ fields, onSubmit: signUp });

  return useMemo(
    () => ({
      form,
      fields: {
        email: emailField,
        name: nameField,
        phone: phoneField,
        login: loginField,
        passwordConfirm: passwordConfirmField,
        password: passwordField,
      },
    }),
    []
  );
};
