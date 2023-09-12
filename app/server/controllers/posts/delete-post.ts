import { createAction } from '@server/controllers/_utils';
import { getUserFromRequest } from '@server/shared/utils';
import { DeletePostRequest, DeletePostResponse } from '@shared/api';
import { AuthenticationError } from '@shared/errors';

export const deletePost = createAction<DeletePostRequest, DeletePostResponse>(
  async (request, _, context) => {
    const user = getUserFromRequest(request);

    const post = await context.prisma.post.findFirst({
      where: {
        id: request.body.id,
      },
    });

    if (user.id !== post?.authorId) {
      throw new AuthenticationError({
        errors: ['User is not the author!'],
        status: 403,
      });
    }

    const deletedPost = await context.prisma.post.delete({
      where: {
        id: request.body.id,
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
      ...deletedPost,
      createdAt: deletedPost.createdAt.toISOString(),
      updatedAt: deletedPost.updatedAt.toISOString(),
    };
  },
);
