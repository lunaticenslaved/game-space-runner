import { createAction } from '@server/controllers/_utils';
import { GetPlayersResponse } from '@shared/api';

export const getPlayers = createAction<void, GetPlayersResponse, unknown>(
  async (__, _, context) => {
    const players = await context.prisma.player.findMany({
      select: {
        id: true,
        score: true,
        user: {
          select: {
            id: true,
            login: true,
            avatars: true,
          },
        },
      },
    });

    return { players };
  },
);
