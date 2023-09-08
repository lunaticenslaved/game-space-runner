import { UnauthorizedError } from '@shared/errors';
import { Request } from 'express';

export const getUserFromRequest = (request: Request<unknown, unknown, unknown, unknown>) => {
  const user = request.user;

  if (!user) {
    throw new UnauthorizedError({ errors: ['User not found'], status: 403 });
  }

  return user;
};
