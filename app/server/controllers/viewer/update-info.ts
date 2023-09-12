import { UpdateViewerInfoRequest, API, UpdateViewerInfoResponse } from '@shared/api';
import { getUserFromRequest } from '@server/shared/utils';

import { createAction, validateRequest } from '../_utils';

export const updateInfo = createAction<UpdateViewerInfoRequest, UpdateViewerInfoResponse>(
  async (request, _, context) => {
    const user = getUserFromRequest(request);

    await validateRequest(API.viewer.updateInfo.validators, request.body);

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
