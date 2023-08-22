import { api } from '.';

export type UpdateAvatarRequest = {};
export type UpdateAvatarResponse = {};

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    updateAvatar: build.mutation<UpdateAvatarResponse, UpdateAvatarRequest>({
      query: () => ({
        url: '/example',
      }),
    }),
  }),
});

export const { useUpdateAvatarMutation } = authApi;
