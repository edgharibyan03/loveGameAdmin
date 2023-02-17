import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'src/services/Api';

const initialState = {
  games: [],
};

export const addKaraokeGame = createAsyncThunk('game/addKaraokeGame', async (data) => {
  const { cb, ...sendData } = data;
  console.log(sendData, 'sendData');
  const response = await API.post('/karaoke/', {
    karaoke: {
      language: sendData.language,
      title: sendData.name,
    },
    link: sendData.link,
    visible: true,
    category: 1,
    isPremium: false,
  });
  // cb(response.data)
  console.log('data', 'ddddd');
  return response.data;
});

export const getKaraokeGames = createAsyncThunk(
  'game/getKaraokeGames',
  async () => {
    const response = await API.get('/karaoke/');

    return response.data;
  },
);

export const questionGameSlice = createSlice({
  name: 'questionGame',
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(addKaraokeGame.pending, (state, action) => {
    //   // state.loading = action.payload;
    //   state.status = 'loading';
    // });
    builder.addCase(addKaraokeGame.fulfilled, (state, action) => {
      state.questionGame = action.payload;
    });
    builder.addCase(getKaraokeGames.fulfilled, (state, action) => {
      console.log(action.payload, JSON.stringify(state), 'payload');
      state.games = action.payload;
    });
  },

});

export default questionGameSlice.reducer;
