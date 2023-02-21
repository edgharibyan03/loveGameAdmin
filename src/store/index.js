import { configureStore } from '@reduxjs/toolkit';
import questionGame from './Slices/questionGame';
import karaokeGame from './Slices/karaokeGame';
import actionGame from './Slices/actionGame';
import gifts from './Slices/gifts';
import games from './Slices/games'

export const store = configureStore({
  reducer: {
    questionGame,
    karaokeGame,
    actionGame,
    gifts,
    games,
  },
});

export const useAppDispatch = () => store.dispatch;
export const useAppSelector = () => store.subscribe;
