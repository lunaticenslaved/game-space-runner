import { generatePath, useNavigate } from 'react-router-dom';

import { forumRoutes } from './routes';

export const useForumNavigation = () => {
  const navigate = useNavigate();

  return {
    toForm: () => navigate,
    toTopic: ({ id }: { id: number }) => navigate(generatePath(forumRoutes.topic.path, { id })),
  };
};
