import { User } from '@shared/models/user';

export type SignInRequest = {
  login: string;
  password: string;
};

export type SignInResponse = User;

export type SignUpRequest = {
  login: string;
  password: string;
};

export type SignUpResponse = User;
