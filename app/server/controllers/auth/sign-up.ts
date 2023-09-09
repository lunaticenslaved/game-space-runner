import { ConflictError, ValidationError } from '@shared/errors';
import { SignUpRequest, API_VALIDATORS, SignUpResponse } from '@shared/api2';

import { createAction, createHash, validateRequest } from '../_utils';

import { createTokens } from './_utils';

export const signUp = createAction<SignUpRequest, SignUpResponse>(
  async ({ body, headers }, response, context) => {
    await validateRequest(API_VALIDATORS.auth.signUp, body);

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
      select: {
        id: true,
        login: true,
        avatars: true,
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

    return createdUser;
  },
);
