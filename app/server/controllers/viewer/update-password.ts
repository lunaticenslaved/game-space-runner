import bcrypt from 'bcrypt';

import { createAction, createHash, validateRequest } from '@server/controllers/_utils';
import { getUserFromRequest } from '@server/shared/utils';
import {
  API_VALIDATORS,
  UpdateViewerPasswordRequest,
  UpdateViewerPasswordResponse,
} from '@shared/api2';
import { AuthenticationError } from '@shared/errors';

export const updatePassword = createAction<
  UpdateViewerPasswordRequest,
  UpdateViewerPasswordResponse
>(async (request, _, context) => {
  // TODO: наверное стоит это в экшн добавить
  await validateRequest(API_VALIDATORS.viewer.updatePassword, request.body);

  const user = await context.prisma.user.findFirst({
    where: {
      id: { equals: getUserFromRequest(request).id },
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    throw Error('Unknown user!');
  }

  const { oldPassword, newPassword } = request.body;

  if (!(await bcrypt.compare(oldPassword, user.password))) {
    throw new AuthenticationError({ errors: [`Password is incorrect`] });
  }

  const updatedUser = await context.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: {
        set: await createHash(newPassword),
      },
    },
    select: {
      id: true,
      login: true,
      avatars: true,
    },
  });

  return updatedUser;
});
