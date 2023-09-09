import bcrypt from 'bcrypt';

import { AuthenticationError, ValidationError } from '@shared/errors';
import { SignInRequest, API_VALIDATORS, SignInResponse } from '@shared/api2';

import { createAction, createHash, validateRequest } from '../_utils';
import { createTokens } from './_utils';

export const signIn = createAction<SignInRequest, SignInResponse>(
  async ({ body, headers }, response, context) => {
    await validateRequest(API_VALIDATORS.auth.signIn, body);

    const userAgent = headers['user-agent'];
    const user = await context.prisma.user.findFirst({
      where: { login: { equals: body.login } },
      select: { id: true, avatars: true, password: true, login: true },
    });

    if (!userAgent) {
      throw new ValidationError({ errors: [`Unknown user agent`] });
    }

    if (!user) {
      throw new AuthenticationError({ errors: [`User with the login '${body.login}' not found`] });
    }

    const receivedPassword = await createHash(body.password);
    const { password: savedPassword, ...savedUser } = user;

    if (await bcrypt.compare(receivedPassword, savedPassword)) {
      throw new AuthenticationError({ errors: [`Invalid login or password`] });
    }

    const { refreshToken, accessToken } = createTokens();

    // find a session for user and agent
    let session = await context.prisma.session.findFirst({
      where: {
        userAgent: { equals: userAgent },
        userId: { equals: user.id },
      },
    });

    if (session) {
      // update session with new tockens
      await context.prisma.session.update({
        where: { id: session.id },
        data: {
          accessToken: { set: accessToken },
          refreshToken: { set: refreshToken },
        },
      });
    } else {
      // save new session
      session = await context.prisma.session.create({
        data: {
          user: { connect: { id: user.id } },
          accessToken,
          refreshToken,
          userAgent,
        },
      });
    }

    response.cookie('accessToken', accessToken);

    return savedUser;
  },
);
