import { generatePath, useNavigate } from 'react-router-dom';

import { gameRoutes } from './routes';

export const useGameNavigation = () => {
  const navigate = useNavigate();

  return {
    toGame: ({ level }: { level: number }) =>
      navigate(generatePath(gameRoutes.root), { state: { level } }),
    toGameStart: ({ level }: { level: number }) =>
      navigate(generatePath(gameRoutes.start), { state: { level } }),
    toGameEnd: () => navigate(generatePath(gameRoutes.end)),
  };
};
