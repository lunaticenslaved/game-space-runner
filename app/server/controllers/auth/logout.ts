import { createAction } from '../_utils';

export const logout = createAction(async (request, response, context) => {
  const user = request.user;
  const accessToken = request.cookies['accessToken'] as string;

  if (!user || !accessToken) return;

  await context.prisma.session.deleteMany({
    where: {
      user: { id: { equals: user.id } },
      accessToken: { equals: accessToken },
    },
  });

  response.cookie('accessToken', '', { expires: new Date() });
});
