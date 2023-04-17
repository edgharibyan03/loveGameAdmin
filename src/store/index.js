import { configureStore } from '@reduxjs/toolkit';
import questionGame from './Slices/questionGame';
import karaokeGame from './Slices/karaokeGame';
import actionGame from './Slices/actionGame';
import choiceGame from './Slices/choiceGame';
import gifts from './Slices/gifts';
import giftsCotegories from './Slices/giftsCotegories';
import games from './Slices/games';
import users from './Slices/users';
import rate from './Slices/rate';

export const store = configureStore({
  reducer: {
    questionGame,
    karaokeGame,
    actionGame,
    gifts,
    giftsCotegories,
    games,
    choiceGame,
    users,
    rate,
  },
});

export const useAppDispatch = () => store.dispatch;
export const useAppSelector = () => store.subscribe;
