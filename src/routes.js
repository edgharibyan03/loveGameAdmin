import React from 'react';
import Rate from './views/games/rate/RateList';
// import AddGift from './views/games/gifts/AddGift';
// import Gifts from './views/games/gifts/GiftsList';

const Games = React.lazy(() => import('./views/games/Games'));
const Users = React.lazy(() => import('./views/users'));
const QuestionGame = React.lazy(() => import('./views/games/questionGame/GameList'));
const AddQuestionGame = React.lazy(() => import('./views/games/questionGame/AddGame'));
const KaraokeGame = React.lazy(() => import('./views/games/karaokeGame/GameList'));
const ActionGame = React.lazy(() => import('./views/games/actionGame/GameList'));
const AddKaraokeGame = React.lazy(() => import('./views/games/karaokeGame/AddGame'));
const AddActionGame = React.lazy(() => import('./views/games/actionGame/AddGame'));
const AddGift = React.lazy(() => import('./views/games/gifts/AddGift'));
const Gifts = React.lazy(() => import('./views/games/gifts/GiftsList'));
const AddChoiceGame = React.lazy(() => import('./views/games/choiceGame/AddGame'));
const ChoiceGame = React.lazy(() => import('./views/games/choiceGame/GameList'));
const AddGiftCategory = React.lazy(() => import('./views/games/giftCategories/AddGiftCategory'));
const GiftsCategories = React.lazy(() => import('./views/games/giftCategories/GiftsCategories'));
const routes = [
  {
    path: '/', exact: true, name: '', element: 'div',
    // path: '/', exact: true, name: '', element: Games,
  },
  {
    path: '/games', exact: true, name: 'Games', element: Games,
  },
  {
    path: '/users', exact: true, name: 'Users', element: Users,
  },
  { path: '/question-game', name: 'QuestionGame', element: QuestionGame },
  { path: '/action-game', name: 'ActionGame', element: ActionGame },
  { path: '/question-game/add-game', name: 'AddQuestionGame', element: AddQuestionGame },
  { path: '/karaoke-game', name: 'KaraokeGame', element: KaraokeGame },
  { path: '/karaoke-game/add-karaoke-game', name: 'AddKaraokeGame', element: AddKaraokeGame },
  { path: '/gifts', name: 'Gifts', element: Gifts },
  { path: '/gifts/add-gift', name: 'AddGift', element: AddGift },
  { path: '/action-game/add-action-game', name: 'AddActionGame', element: AddActionGame },
  { path: '/choice-game', name: 'Choice game', element: ChoiceGame },
  { path: '/choice-game/add-choice-game', name: 'AddChoiceGame', element: AddChoiceGame },
  { path: '/choice-game/add-choice-game', name: 'AddGiftCategory', element: AddGiftCategory },
  { path: '/gift-categories', name: 'GiftsCategories', element: GiftsCategories },
  { path: '/gift-categories/add-gift-category', name: 'AddGiftCategory', element: AddGiftCategory },
  { path: '/rates', name: 'Rates', element: Rate },
];

export default routes;
