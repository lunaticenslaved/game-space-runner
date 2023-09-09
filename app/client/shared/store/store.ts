import { configureStore } from '@reduxjs/toolkit';

import { User } from '@shared/models/user';

import { reducer } from './state';

export const createStore = (viewer?: User) => {
  console.log('INITIAL USER', viewer);

  return configureStore({
    reducer: {
      state: reducer,
    },
    preloadedState: {
      state: {
        viewer,
      },
    },
  });
};
