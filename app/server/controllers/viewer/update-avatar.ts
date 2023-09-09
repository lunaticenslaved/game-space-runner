import { UploadedFile } from 'express-fileupload';

import { createAction } from '@server/controllers/_utils';
import { FileNotProvidedError } from '@shared/errors';
import { getUserFromRequest } from '@server/shared/utils';
import { Avatar } from '@prisma/client';
// import { generateFilePath } from '@server/shared/files';
import { objectStorage } from '@server/shared/object-storage';

export type UploadFileResponse = Avatar;

export const updateAvatar = createAction(async (request, _, context) => {
  const file = request.files?.file as UploadedFile | undefined;
  const user = getUserFromRequest(request);

  if (!file) {
    throw new FileNotProvidedError({
      errors: ['File not provided!'],
      status: 400,
    });
  }

  const { link } = await objectStorage.avatar.uploadFile(file);

  const createdFile = await context.prisma.avatar.create({
    data: {
      link,
      user: { connect: { id: user.id } },
    },
  });

  return createdFile;
});
