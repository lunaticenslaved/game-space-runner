import { generatePath, useNavigate } from 'react-router-dom';

import { errorRoutes } from './routes';

export const useErrorNavigation = () => {
  const navigate = useNavigate();

  return {
    to404: () => navigate(generatePath(errorRoutes.error404.path)),
    to500: () => navigate(generatePath(errorRoutes.error500.path)),
  };
};
