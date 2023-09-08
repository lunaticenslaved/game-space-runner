import { UploadedFile } from 'express-fileupload';

import { createAction } from '@server/controllers/_utils';
import { FileNotProvidedError } from '@shared/errors';
import { getUserFromRequest } from '@server/shared/utils';
import { Avatar } from '@prisma/client';

export type UploadFileResponse = Avatar;

export const updateAvatar = createAction(async (request, _, context) => {
  const file = request.files?.[0] as UploadedFile | undefined;
  const user = getUserFromRequest(request);

  if (!file) {
    throw new FileNotProvidedError({ errors: ['File not provided!'], status: 400 });
  }

  const path = './uploads/' + file.name;

  file.mv(path);

  const createdFile = await context.prisma.avatar.create({
    data: {
      path,
      user: { connect: { id: user.id } },
    },
  });

  return createdFile;
});
