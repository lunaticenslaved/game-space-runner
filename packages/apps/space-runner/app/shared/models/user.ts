export type User = {
  id: string;
  login: string;
  avatar?: Avatar;
};

export type Avatar = {
  id: string;
  path: string;
  userId: string;
};
