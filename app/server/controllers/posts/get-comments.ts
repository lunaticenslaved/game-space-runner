import { createAction } from '@server/controllers/_utils';
import { GetCommentsRequest, GetCommentsResponse } from '@shared/api';

export const getComments = createAction<GetCommentsRequest, GetCommentsResponse>(
  async (request, _, context) => {
    const comments = await context.prisma.comment.findMany({
      where: {
        postId: {
          equals: request.body.postId,
        },
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
      comments: comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
      })),
    };
  },
);
