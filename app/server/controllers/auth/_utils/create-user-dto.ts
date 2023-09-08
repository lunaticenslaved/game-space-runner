import { User } from '@prisma/client';

export const createUserDTO = (user: User) => {
  return {
    id: user.id,
    login: user.login,
  };
};
