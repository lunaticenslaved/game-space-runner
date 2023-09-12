import { User } from '@shared/models/user';

export type UpdateViewerInfoRequest = {
  login: string;
};

export type UpdateViewerInfoResponse = User;

export type UpdateViewerAvatarRequest = {
  file: File;
};

export type UpdateViewerAvatarResponse = User;

export type UpdateViewerPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateViewerPasswordResponse = {
  id: string;
  login: string;
};
