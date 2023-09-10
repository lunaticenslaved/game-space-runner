import { UploadedFile } from 'express-fileupload';

import { createAction } from '@server/controllers/_utils';
import { FileNotProvidedError } from '@shared/errors';
import { getUserFromRequest } from '@server/shared/utils';
import { objectStorage } from '@server/shared/object-storage';
import { UpdateViewerAvatarRequest, UpdateViewerAvatarResponse } from '@shared/api2';

export const updateAvatar = createAction<UpdateViewerAvatarRequest, UpdateViewerAvatarResponse>(
  async (request, _, context) => {
    const file = request.files?.file as UploadedFile | undefined;
    const user = getUserFromRequest(request);

    if (!file) {
      throw new FileNotProvidedError({
        errors: ['File not provided!'],
        status: 400,
      });
    }

    const { link } = await objectStorage.avatar.uploadFile(file);

    const updatedUser = await context.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatars: {
          create: {
            link,
          },
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
