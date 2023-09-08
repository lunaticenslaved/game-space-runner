export type SignInRequest = {
  login: string;
  password: string;
};

export type SignInResponse = {
  id: string;
  login: string;
};

export type SignUpRequest = {
  login: string;
  password: string;
};

export type SignUpResponse = {
  id: string;
  login: string;
};
