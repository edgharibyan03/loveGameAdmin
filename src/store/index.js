import { configureStore } from '@reduxjs/toolkit';
import questionGame from './Slices/questionGame';
import karaokeGame from './Slices/karaokeGame';
import actionGame from './Slices/actionGame';
import gifts from './Slices/gifts';

export const store = configureStore({
  reducer: {
    questionGame,
    karaokeGame,
    actionGame,
    gifts,
  },
});

export const useAppDispatch = () => store.dispatch;
export const useAppSelector = () => store.subscribe;
