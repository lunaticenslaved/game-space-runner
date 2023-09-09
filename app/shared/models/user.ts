export type User = {
  id: string;
  login: string;
  avatars: Avatar[];
};

export type Avatar = {
  id: string;
  link: string;
  userId: string;
};
