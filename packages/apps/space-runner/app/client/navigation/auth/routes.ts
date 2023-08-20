import { AccessLevel } from '../types';

export const authRoutes = {
  signIn: { path: '/auth/sign-in', access: AccessLevel.Public },
  signUp: { path: '/auth/sign-up', access: AccessLevel.Public },
};
