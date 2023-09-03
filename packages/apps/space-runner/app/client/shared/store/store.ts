import { configureStore } from '@reduxjs/toolkit';

import { api } from '@client/shared/api';
import { User } from '@client/entities/user';

import { reducer } from './state';

export const createStore = (viewer?: User) => {
  console.log('INITIAL USER', viewer);

  return configureStore({
    reducer: {
      state: reducer,
      [api.reducerPath]: api.reducer,
    },
    preloadedState: {
      state: {
        viewer,
      },
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  });
};
