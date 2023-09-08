import { createAction, customFetch } from '../_utils';
import {
  UpdateViewerAvatarRequest,
  UpdateViewerAvatarResponse,
  UpdateViewerInfoRequest,
  UpdateViewerInfoResponse,
  UpdateViewerPasswordRequest,
  UpdateViewerPasswordResponse,
} from './types';

export const viewerActions = {
  updateInfo: createAction<UpdateViewerInfoResponse, UpdateViewerInfoRequest>(async data => {
    return await customFetch('/api/viewer/info', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }),
  updateAvatar: createAction<UpdateViewerAvatarResponse, UpdateViewerAvatarRequest>(async data => {
    return await customFetch('/api/viewer/avatar', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }),
  updatePassword: createAction<UpdateViewerPasswordResponse, UpdateViewerPasswordRequest>(
    async data => {
      return await customFetch('/api/viewer/password', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }
  ),
};
