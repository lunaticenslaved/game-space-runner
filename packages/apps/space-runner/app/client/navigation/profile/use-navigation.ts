import { generatePath, useNavigate } from 'react-router-dom';

import { profileRoutes } from './routes';

export const useProfileNavigation = () => {
  const navigate = useNavigate();

  return {
    toProfile: () => navigate(generatePath(profileRoutes.root.path)),
  };
};
