import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User } from '@shared/models/user';

export interface State {
  viewer?: User;
}

const initialState: State = {};

const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setViewer(state, action: PayloadAction<User | undefined>) {
      state.viewer = action.payload;
    },
  },
});

export const { setViewer } = slice.actions;
export const reducer = slice.reducer;
