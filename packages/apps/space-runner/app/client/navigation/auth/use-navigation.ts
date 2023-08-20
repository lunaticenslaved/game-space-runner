import { generatePath, useNavigate } from 'react-router-dom';

import { authRoutes } from './routes';

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  return {
    toSignIn: () => navigate(generatePath(authRoutes.signIn.path)),
    toSignUp: () => navigate(generatePath(authRoutes.signUp.path)),
  };
};
