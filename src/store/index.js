import { configureStore } from '@reduxjs/toolkit';
import questionGame from './Slices/questionGame';
import karaokeGame from './Slices/karaokeGame';
import actionGame from './Slices/actionGame';
export const store = configureStore({
  reducer: {
    questionGame,
    karaokeGame,
    actionGame
  },
});

export const useAppDispatch = () => store.dispatch;
