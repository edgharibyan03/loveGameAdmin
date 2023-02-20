import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import API from 'src/services/Api';

const initialState = {
  games: [],
  loading: true,
};

const successNotify = () => {
  toast.success('Success Notification !', {
    position: toast.POSITION.TOP_CENTER,
  });
};
const errorNotify = () => {
  toast.error('Error Notification !', {
    position: toast.POSITION.TOP_LEFT,
  });
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

    console.log(data, 'data');

    data.handleGetGames();

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
    builder.addCase(getKaraokeGames.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getKaraokeGames.fulfilled, (state, action) => {
      state.games = action.payload;
      state.loading = false;
    });

    builder.addCase(deleteKaraoke.fulfilled, (state, action) => {
      successNotify();
      state.games = state.games.filter((item) => item.id !== action.payload);
    });

    builder.addCase(editKaraoke.fulfilled, (state, action) => {
      state.games = state.games.filter((item) => {
        console.log(item.id, action.payload, 'payload');
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
