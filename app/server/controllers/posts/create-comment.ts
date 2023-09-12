import { createAction } from '@server/controllers/_utils';
import { getUserFromRequest } from '@server/shared/utils';
import { CreateCommentRequest, CreateCommentResponse } from '@shared/api';

export const createComment = createAction<CreateCommentRequest, CreateCommentResponse>(
  async (request, _, context) => {
    const user = getUserFromRequest(request);

    const comment = await context.prisma.comment.create({
      data: {
        text: request.body.text,
        postId: request.body.postId,
        authorId: user.id,
      },
      select: {
        id: true,
        text: true,
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
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    };
  },
);
