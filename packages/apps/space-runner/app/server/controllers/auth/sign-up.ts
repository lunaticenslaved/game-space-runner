import { ConflictError, ValidationError } from '@shared/errors';
import { createAction, createHash, validateRequest } from '@server/shared/utils';
import { SignUpRequest, authApi } from '@shared/api';

import { createTokens, createUserDTO } from './_utils';

export const signUp = createAction<SignUpRequest>(async ({ body, headers }, response, context) => {
  await validateRequest(authApi.signUp.validator, body);

  const user = await context.prisma.user.findFirst({
    where: { login: { equals: body.login } },
  });

  if (user) {
    throw new ConflictError({ errors: [`User with the login '${body.login}' already exists`] });
  }

  const hashedPassword = await createHash(body.password);
  const createdUser = await context.prisma.user.create({
    data: {
      ...body,
      password: hashedPassword,
    },
  });

  const userAgent = headers['user-agent'];

  if (!userAgent) {
    throw new ValidationError({ errors: [`Unknown user agent`] });
  }

  const { refreshToken, accessToken } = createTokens();
  await context.prisma.session.create({
    data: {
      user: { connect: { id: createdUser.id } },
      refreshToken,
      accessToken,
      userAgent,
    },
  });

  response.cookie('accessToken', accessToken);

  return createUserDTO(createdUser);
});
