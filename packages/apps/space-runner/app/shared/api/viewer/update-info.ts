import { authApi } from '@shared/api/auth';

export type UpdateViewerInfoRequest = {
  login: string;
};

export type UpdateViewerInfoResponse = {
  id: string;
  login: string;
};

export const updateInfo = {
  url: {
    raw: '/api/viewer/info',
    get: () => '/api/viewer/info',
  },
  validator: {
    login: authApi.signUp.validator.login,
  },
};
