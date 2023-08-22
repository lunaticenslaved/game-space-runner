import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useViewer } from '@client/features/auth';
import { RouteSetting, routes } from '@client/navigation';

export type RouteGuardProps = {
  route: RouteSetting;
  element: ReactNode;
};

export const RouteGuard = ({ route, element }: RouteGuardProps) => {
  const { access } = useViewer();

  if (!access.includes(route.access)) {
    return <Navigate to={routes.home.path} replace />;
  }

  return element;
};
