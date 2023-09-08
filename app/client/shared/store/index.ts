import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { createStore } from './store';

export { createStore } from './store';
export { setViewer } from './state';

export type RootStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
