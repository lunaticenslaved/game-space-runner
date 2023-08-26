import { ValidationError } from '@shared/errors';
import { createAction, validateObj } from '@server/shared/utils';
import { SignInRequest, authApi } from '@shared/api';

export const signIn = createAction<SignInRequest>(async ({ body }) => {
  const { errors } = await validateObj(authApi.signIn.validator)(body);

  console.log(body);

  if (errors) {
    throw new ValidationError({ errors });
  }

  return {
    id: 1,
    login: 'login',
  };
});
