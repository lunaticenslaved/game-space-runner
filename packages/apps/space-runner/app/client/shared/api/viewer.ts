import { api } from '.';

export type UpdateAvatarRequest = {};
export type UpdateAvatarResponse = {};

export type UpdateInfoRequest = {};
export type UpdateInfoResponse = {};

export type UpdatePasswordRequest = {};
export type UpdatePasswordResponse = {};

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    updateAvatar: build.mutation<UpdateAvatarResponse, UpdateAvatarRequest>({
      query: () => ({
        url: '/example',
      }),
    }),
    updateInfo: build.mutation<UpdateInfoResponse, UpdateInfoRequest>({
      query: () => ({
        url: '/example',
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
  authApi;
