import { UpdateViewerInfoRequest, API_VALIDATORS, UpdateViewerInfoResponse } from '@shared/api2';

import { createAction, validateRequest } from '../_utils';
import { AuthenticationError } from '@shared/errors';

export const updateInfo = createAction<UpdateViewerInfoRequest, UpdateViewerInfoResponse>(
  async (request, _, context) => {
    const user = request.user;

    if (!user) {
      throw new AuthenticationError({ errors: ['User not found!'] });
    }

    await validateRequest(API_VALIDATORS.viewer.updateInfo, request.body);

    const updatedUser = await context.prisma.user.update({
      where: { id: user.id },
      data: {
        login: {
          set: request.body.login,
        },
      },
      select: {
        id: true,
        login: true,
        avatars: true,
      },
    });

    return updatedUser;
  },
);
