import { UpdateViewerInfoRequest, viewerApi } from '@shared/api';
import { createUserDTO } from '@server/controllers/auth/_utils';

import { createAction, validateRequest } from '../_utils';

export const updateInfo = createAction<UpdateViewerInfoRequest>(async (request, _, context) => {
  const user = request.user;

  if (!user) return;

  await validateRequest(viewerApi.updateInfo.validator, request.body);
  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: {
      login: {
        set: request.body.login,
      },
    },
  });

  return createUserDTO(updatedUser);
});
