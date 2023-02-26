import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../services/Api';

export const addActionGame = createAsyncThunk('game/addActionGame', async (data) => {
  const { cb, ...sendData } = data;
  console.log(sendData, 'sendDatasendDatasendDatasendData');
  const response = await API.post('/action/', sendData);
  console.log(response, 'response');
  // cb(response.data);
  return response.data;
});

export const deleteActionGame = createAsyncThunk('game/deleteActionGame', async (id) => {
  const response = await API.delete(`/action/${id}`);
  console.log(response, 'response');
  // cb(response.data);
  return id;
});

export const getActionGame = createAsyncThunk('game/getActionGame', async (search) => {
  const response = await API.get(`/action/all${search}&category=1&ispremium=false&visible=false`);

  return response.data;
});

export const editActionGame = createAsyncThunk(
  'game/editActionGame',
  async (data) => {
    const response = await API.put(`/action/${data.id}`, data);

    return response.data;
  },
);

const initialState = {
  actionGames: {
    actionList: [],
    count: 0,
  },
  loading: false,
  delete_loading: false,
  get_loading: true,
};

export const actionGameSlice = createSlice({
  name: 'actionGame',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getActionGame.pending, (state, action) => {
      state.get_loading = true;
    });
    builder.addCase(getActionGame.fulfilled, (state, action) => {
      state.actionGames = action.payload;
      state.get_loading = false;
    });
    builder.addCase(addActionGame.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addActionGame.fulfilled, (state, action) => {
      state.actionGames.actionList.push(action.payload);
      state.loading = false;
    });
    builder.addCase(deleteActionGame.fulfilled, (state, action) => {
      const new_list = state.actionGames.actionList.filter((item) => (item.id !== action.payload));
      state.actionGames.actionList = new_list;
      state.loading = false;
    });
    builder.addCase(deleteActionGame.pending, (state) => {
      state.delete_loading = true;
    });

    builder.addCase(editActionGame.fulfilled, (state, action) => {
      state.actionGames.actionList = [
        ...state.actionGames.actionList.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    });
  },
});

export const getLoading = (state) => state.actionGame.get_loading;

export default actionGameSlice.reducer;
