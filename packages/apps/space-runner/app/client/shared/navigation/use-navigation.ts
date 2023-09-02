import { useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router';

import { routes } from '@client/shared/navigation';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      home: {
        toRoot: () => navigate(routes.home.path),
      },
      auth: {
        toSignIn: () => navigate(generatePath(routes.auth.signIn.path)),
        toSignUp: () => navigate(generatePath(routes.auth.signUp.path)),
      },
      error: {
        to404: () => navigate(generatePath(routes.error.error404.path)),
        to500: () => navigate(generatePath(routes.error.error500.path)),
      },
      forum: {
        toForm: () => navigate,
        toTopic: ({ id }: { id: number }) =>
          navigate(generatePath(routes.forum.topic.path, { id })),
      },
      game: {
        toGame: ({ level }: { level: string }) =>
          navigate(generatePath(routes.game.root.path), { state: { level } }),
        toGameStart: ({ level }: { level: string }) =>
          navigate(generatePath(routes.game.start.path), { state: { level } }),
        toGameEnd: () => navigate(generatePath(routes.game.end.path)),
      },
      profile: {
        toProfile: () => navigate(generatePath(routes.profile.root.path)),
      },
    }),
    []
  );
};
