import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { api } from '@client/shared/api';
import { User } from '@client/entities/user';

import { reducer } from './store';

export { setViewer } from './store';

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

export type RootStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
