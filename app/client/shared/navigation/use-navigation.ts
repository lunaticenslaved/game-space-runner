import { useMemo } from 'react';
import { generatePath as path, useNavigate } from 'react-router';

import { routes } from '@client/shared/navigation';

type GameState = {
  level?: string;
  win?: boolean;
};

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
        toGame: (state?: GameState) => navigate(path(routes.game.root.path), { state }),
        toGameStart: (state?: GameState) => navigate(path(routes.game.start.path), { state }),
        toGameEnd: (state?: GameState) => navigate(path(routes.game.end.path), { state }),
      },
      profile: {
        toProfile: () => navigate(path(routes.profile.root.path)),
      },
    }),
    [navigate],
  );
};
