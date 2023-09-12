import { createAction } from '@server/controllers/_utils';
import { GetPostRequest, GetPostResponse } from '@shared/api';
import { NotFoundError } from '@shared/errors';

export const getPost = createAction<void, GetPostResponse, GetPostRequest>(
  async (request, _, context) => {
    const post = await context.prisma.post.findFirst({
      where: {
        id: request.params.id,
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

    if (!post) {
      throw new NotFoundError({
        errors: ['Post not found!'],
        status: 404,
      });
    }

    return {
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  },
);
