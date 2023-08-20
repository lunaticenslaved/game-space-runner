import { AccessLevel } from '../types';

export const errorRoutes = {
  error404: { path: '*', access: AccessLevel.Common },
  error500: { path: '/error-500', access: AccessLevel.Common },
};
