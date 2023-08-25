import { ValidationError } from '@server/errors/validation';
import { createAction, validateObj } from '@server/utils';
import { SignInRequest, signInValidator } from '@shared/api/auth';

export const signIn = createAction<SignInRequest>(async ({ body }) => {
  const { errors } = await validateObj(signInValidator)(body);

  if (errors) {
    throw new ValidationError(errors);
  }
});
