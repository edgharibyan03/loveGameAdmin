import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import API from 'src/services/Api';

const initialState = {
  users: [],
  reports: {
    status: 'loading',
    list: [],
  },
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
    const response = await API.post('/user/money-transaction', data);

    return response.data;
  },
);

export const getReports = createAsyncThunk(
  'users/getReports',
  async (search) => {
    const response = await API.get(`/report${search}`);

    return response.data;
  },
);

export const setReportViewed = createAsyncThunk(
  '/users/setReportViewed',
  async ({ reportId, cb }) => {
    const response = await API.post('report/viewed', {
      reportId,
    });

    cb();

    return response.data;
  },
)

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(createTransaction.rejected, () => {
      toast.error('Money not added');
    });
    builder.addCase(createTransaction.fulfilled, () => {
      toast.success('Money was successfully added');
    });

    builder.addCase(setReportViewed.pending, (state) => {
      state.reports.status = 'loading';
    });
    builder.addCase(getReports.pending, (state) => {
      state.reports.status = 'loading'
    });
    builder.addCase(getReports.fulfilled, (state, action) => {
      state.reports.status = 'loaded';
      state.reports.list = action.payload
    });
  },
});

export const getUsersInfo = (state) => state.users.users;
export const getReportsInfo = (state) => state.users.reports;

export default usersSlice.reducer;
