import { UpdateViewerInfoRequest, UpdateViewerInfoResponse } from '@shared/api/viewer/update-info';
import { viewerApi as viewerApiBase } from '@shared/api';

import { api } from '.';

export type UpdateAvatarRequest = object;
export type UpdateAvatarResponse = object;

export type UpdatePasswordRequest = object;
export type UpdatePasswordResponse = object;

export const viewerApi = api.injectEndpoints({
  endpoints: build => ({
    updateAvatar: build.mutation<UpdateAvatarResponse, UpdateAvatarRequest>({
      query: () => ({
        url: '/example',
      }),
    }),
    updateInfo: build.mutation<UpdateViewerInfoResponse, UpdateViewerInfoRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: viewerApiBase.updateInfo.url.get(),
      }),
    }),
    updatePassword: build.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
      query: () => ({
        url: '/example',
      }),
    }),
  }),
});

export const { useUpdateAvatarMutation, useUpdateInfoMutation, useUpdatePasswordMutation } =
  viewerApi;
