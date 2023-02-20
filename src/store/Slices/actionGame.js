import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import API from '../../services/Api';

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
  let response;
  if (search) {
    response = await API.get(`/action/${search}`);
  } else {
    response = await API.get('/action/');
  }
  console.log(response, 'response');
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
  actionGames: [],
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
      console.log(action.payload, 'action.payload');
      state.actionGames = action.payload;
      console.log(state, 'state');
      state.get_loading = false;
    });
    builder.addCase(addActionGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addActionGame.rejected, () => {
      errorNotify();
    });
    builder.addCase(addActionGame.fulfilled, (state, action) => {
      state.actionGames.push(action.payload);
      state.loading = false;
      successNotify();
    });
    builder.addCase(deleteActionGame.fulfilled, (state, action) => {
      const new_list = state.actionGames.filter((item) => (item.id !== action.payload));
      state.actionGames = new_list;
      state.loading = false;
      successNotify();
    });
    builder.addCase(deleteActionGame.pending, (state) => {
      state.delete_loading = true;
    });

    builder.addCase(editActionGame.fulfilled, (state, action) => {
      successNotify();

      state.actionGames = [
        ...state.actionGames.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    });
  },
});

export const getLoading = (state) => state.actionGame.get_loading;

export default actionGameSlice.reducer;
