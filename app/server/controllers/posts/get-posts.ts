import { createAction } from '@server/controllers/_utils';
import { GetPostsResponse } from '@shared/api';

export const getPosts = createAction<void, GetPostsResponse, unknown>(async (__, _, context) => {
  const posts = await context.prisma.post.findMany({
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
      _count: {
        select: {
          comments: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  return {
    posts: posts.map(({ _count, comments: [lastComment], ...post }) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      count: _count,
      lastComment: lastComment
        ? {
            createdAt: lastComment.createdAt.toISOString(),
          }
        : undefined,
    })),
  };
});
