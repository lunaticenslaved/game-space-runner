import { configureStore } from '@reduxjs/toolkit';

import { api } from '@client/shared/api';

export const createStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  });

export type RootState = {};

export type RootStore = ReturnType<typeof createStore>;
export type AppDispatch = RootStore['dispatch'];
