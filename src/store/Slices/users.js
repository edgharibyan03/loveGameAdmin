import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import API from 'src/services/Api';

const initialState = {
  users: [],
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (search) => {
    const response = await API.get(`/user/all${search}`);

    return response.data;
  },
);

export const createTransaction = createAsyncThunk(
  'users/createTransaction',
  async (data) => {
    const response = await API.post('/user/mony-transaction', data);

    return response.data;
  },
);

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(createTransaction.rejected, () => {
      toast.success('Money not added');
    });
    builder.addCase(createTransaction.fulfilled, () => {
      toast.success('Money was successfully added');
    });
  },
});

export const getUsersInfo = (state) => state.users.users;

export default usersSlice.reducer;
