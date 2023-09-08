import { UpdateViewerInfoRequest, API_VALIDATORS } from '@shared/api2';
import { createUserDTO } from '@server/controllers/auth/_utils';

import { createAction, validateRequest } from '../_utils';

export const updateInfo = createAction<UpdateViewerInfoRequest>(async (request, _, context) => {
  const user = request.user;

  if (!user) return;

  await validateRequest(API_VALIDATORS.viewer.updateInfo, request.body);
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
