import { createAction } from '@server/controllers/_utils';
import { getUserFromRequest } from '@server/shared/utils';
import { SavePlayerResponse, SavePlayerRequest } from '@shared/api';

export const savePlayers = createAction<SavePlayerRequest, SavePlayerResponse>(
  async (request, _, context) => {
    const user = getUserFromRequest(request);

    await context.prisma.player.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        score: request.body.score,
      },
      update: {
        score: request.body.score,
      },
    });
  },
);
