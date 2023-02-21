import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paginationIndex: 0,
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    changePaginationIndex: (state, action) => {
      state.paginationIndex = action.payload;
    },
  },
});

export const { changePaginationIndex } = gamesSlice.actions;

export const getPaginationIndex = (state) => state.games.paginationIndex;

export default gamesSlice.reducer;
