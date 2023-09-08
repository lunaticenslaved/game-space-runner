export type UpdateViewerInfoRequest = {
  login: string;
};

export type UpdateViewerInfoResponse = {
  id: string;
  login: string;
};

export type UpdateViewerAvatarRequest = {
  file: File;
};

export type UpdateViewerAvatarResponse = {
  id: string;
  login: string;
};

export type UpdateViewerPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateViewerPasswordResponse = {
  id: string;
  login: string;
};
