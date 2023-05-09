import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'src/services/Api';

const initialState = {
  rates: {
    list: [],
    status: 'loading',
  },
};

export const getRates = createAsyncThunk(
  'rate/getRates',
  async (search) => {
    console.log('request');
    const response = await API.get(`/RateType/all?${search}`);

    return response.data;
  },
);

export const rateSlice = createSlice({
  name: 'rate',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRates.pending, (state) => {
      state.rates.list.status = 'loading';
    });
    builder.addCase(getRates.fulfilled, (state, action) => {
      console.log(action.payload, 'rates');
      state.rates.status = 'loaded';
      state.rates.list = action.payload;
    });
  },
});

export const getRatesInfo = (state) => state.rates;

export default rateSlice.reducer;
