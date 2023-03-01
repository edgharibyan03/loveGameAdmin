import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'src/services/Api';

const initialState = {
  games: {
    karaokeList: [],
    count: 0,
  },
  loading: true,
};

export const addKaraokeGame = createAsyncThunk('game/addKaraokeGame', async (data) => {
  const { cb, ...sendData } = data;
  const response = await API.post('/karaoke/', {
    karaoke: {
      language: sendData.language,
      title: sendData.name,
    },
    link: sendData.link,
    visible: sendData.visible,
    category: sendData.category,
    ispremium: sendData.ispremium,
  });
  // cb(response.data)
  return response.data;
});

export const getKaraokeGames = createAsyncThunk(
  'game/getKaraokeGames',
  async (search) => {
    console.log(search, 'search');
    const response = await API.get(`/karaoke/all${search}`);
    return response.data;
  },
);

export const deleteKaraoke = createAsyncThunk(
  'game/deleteKaraoke',
  async (id) => {
    const response = await API.delete(`/karaoke/${id}`);

    console.log(response, 'response');

    return id;
  },
);

export const editKaraoke = createAsyncThunk(
  'game/editKaraoke',
  async (data) => {
    const response = await API.put(`/karaoke/${data.id}`, data);

    data.handleGetGames();

    return response.data;
  },
);

export const questionGameSlice = createSlice({
  name: 'questionGame',
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(addKaraokeGame.fulfilled, (state, action) => {
    //   state.games = action.payload;
    // });
    builder.addCase(getKaraokeGames.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getKaraokeGames.fulfilled, (state, action) => {
      state.games = action.payload;
      state.loading = false;
    });

    builder.addCase(deleteKaraoke.fulfilled, (state, action) => {
      state.games.karaokeList = state.games.karaokeList.filter((item) => item.id !== action.payload);
    });

    builder.addCase(editKaraoke.fulfilled, (state, action) => {
      state.games.karaokeList = state.games.karaokeList.filter((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }

        return item;
      });
    });
  },

});

export const karaokeLoading = (state) => state.karaokeGame.loading;

export default questionGameSlice.reducer;
