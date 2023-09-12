import { createAction } from '@server/controllers/_utils';
import { getUserFromRequest } from '@server/shared/utils';
import { UpdatePostRequest, UpdatePostResponse } from '@shared/api';

export const updatePost = createAction<UpdatePostRequest, UpdatePostResponse>(
  async (request, _, context) => {
    const user = getUserFromRequest(request);

    const updatedPost = await context.prisma.post.update({
      where: {
        id: request.body.id,
      },
      data: {
        title: request.body.title,
        content: request.body.content,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            id: true,
            login: true,
            avatars: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...updatedPost,
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    };
  },
);
