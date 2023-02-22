/* eslint-disable no-plusplus */
import API from 'src/services/Api';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  choices: {
    choiceList: [],
    count: 0,
  },
  loading: true,
};

export const getChoiceGames = createAsyncThunk(
  'game/getChoiceGame',
  async (search) => {
    const response = await API.get(`/chouse/all${search}`);

    return response.data;
  },
);

export const deleteChoiceGame = createAsyncThunk(
  'game/deleteChoiceGame',
  async (id) => {
    const response = await API.delete(`/chouse/${id}`);

    return id;
  },
);

export const addChoiceGame = createAsyncThunk(
  'game/addChoiceGame',
  async (data) => {
    const response = await API.post('/chouse/', data);

    return response.data;
  },
);

export const editChoiceGame = createAsyncThunk(
  'game/editChoiceGame',
  async (data) => {
    const response = await API.put(`/chouse/${data.id}`, data);

    return response.data;
  },
);

const choiceGame = createSlice({
  name: 'choiceGame',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getChoiceGames.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChoiceGames.fulfilled, (state, action) => {
      state.choices = action.payload;
      state.loading = false;
    });

    builder.addCase(deleteChoiceGame.fulfilled, (state, action) => {
      console.log(JSON.stringify(state.choices), '32132132121');
      state.choices.choiceList = state.choices.choiceList.filter((item) => item.id !== action.payload);
      state.choices.count -= 1;
    });

    builder.addCase(editChoiceGame.fulfilled, (state, action) => {
      state.choices.choiceList = [
        ...state.choices.choiceList.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    });
  },
});

export const getChoiceGamesData = (state) => state.choiceGame.choices;
export const getChoiceGamesLoading = (state) => state.choiceGame.loading;

export default choiceGame.reducer;
