import { createAction, validateObj } from '@server/controllers/_utils';
import { getUserFromRequest } from '@server/shared/utils';
import { API, CreatePostRequest, CreatePostResponse } from '@shared/api';

export const createPost = createAction<CreatePostRequest, CreatePostResponse>(
  async (request, _, context) => {
    await validateObj(API.posts.createPost.validators)(request.body);

    const user = getUserFromRequest(request);

    const createdPost = await context.prisma.post.create({
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
      ...createdPost,
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  },
);
