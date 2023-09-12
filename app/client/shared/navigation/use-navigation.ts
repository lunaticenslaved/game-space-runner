import { useMemo } from 'react';
import { generatePath as path, useNavigate } from 'react-router';

import { routes } from '@client/shared/navigation';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      home: {
        toRoot: () => navigate(routes.home.path),
      },
      auth: {
        toSignIn: () => navigate(path(routes.auth.signIn.path)),
        toSignUp: () => navigate(path(routes.auth.signUp.path)),
      },
      error: {
        to404: () => navigate(path(routes.error.error404.path)),
        to500: () => navigate(path(routes.error.error500.path)),
      },
      forum: {
        toForm: () => navigate,
        toPost: ({ id }: { id: string }) => navigate(path(routes.forum.post.path, { postId: id })),
      },
      game: {
        toGame: ({ level }: { level: string }) =>
          navigate(path(routes.game.root.path), { state: { level } }),
        toGameStart: ({ level }: { level: string }) =>
          navigate(path(routes.game.start.path), { state: { level } }),
        toGameEnd: () => navigate(path(routes.game.end.path)),
      },
      profile: {
        toProfile: () => navigate(path(routes.profile.root.path)),
      },
    }),
    [navigate],
  );
};
