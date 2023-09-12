import { createAction, customFetch } from '../_utils';
import {
  UpdateViewerAvatarRequest,
  UpdateViewerAvatarResponse,
  UpdateViewerInfoRequest,
  UpdateViewerInfoResponse,
  UpdateViewerPasswordRequest,
  UpdateViewerPasswordResponse,
} from './types';
import { validationRules } from '@libs/validate';
import { validators } from '@shared/validators';

export const viewerActions = {
  updateInfo: {
    action: createAction<UpdateViewerInfoResponse, UpdateViewerInfoRequest>(async data => {
      return await customFetch('/api/viewer/info', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      login: validators.login('new'),
    },
  },
  updateAvatar: {
    action: createAction<UpdateViewerAvatarResponse, UpdateViewerAvatarRequest>(async data => {
      const formData = new FormData();
      formData.append('file', data.file);

      return await customFetch('/api/viewer/avatar', {
        method: 'PUT',
        body: formData,
      });
    }),
    validators: {
      file: validationRules.required(),
    },
  },
  updatePassword: {
    action: createAction<UpdateViewerPasswordResponse, UpdateViewerPasswordRequest>(async data => {
      return await customFetch('/api/viewer/password', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      newPassword: validators.password('new'),
      oldPassword: validators.password('required'),
    },
  },
};
