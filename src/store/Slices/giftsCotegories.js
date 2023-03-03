import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'src/services/Api';

const initialState = {
  giftCategory: {
    giftCategoryList: [],
    count: 0,
  },
  loading: true,
};

export const createGiftCategory = createAsyncThunk('gift/giftCategoryAdd', async (data) => {
  const response = await API.post('/gift-category', data);
  return response.data;
});

export const getGiftsCategories = createAsyncThunk(
  'gift/giftCategory',
  async (search) => {
    const response = await API.get(`gift-category/all${search}&query=`);
    return response.data;
  },
);

export const deleteGiftCategory = createAsyncThunk(
  'gift/deleteGiftCategory',
  async (id) => {
    const response = await API.delete(`/gift-category/${id}`);

    return id;
  },
);

export const editGiftCategory = createAsyncThunk(
  'gift/editGiftCategory',
  async (data) => {
    console.log(data, 'data');
    const { id, title } = data;
    const response = await API.put(`/gift-category/${id}`, {
      title,
    });
    return response.data;
  },
);

export const giftsSlice = createSlice({
  name: 'giftCategory',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createGiftCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createGiftCategory.fulfilled, (state, action) => {
      state.giftCategory = action.payload;
      state.loading = false;
    });
    builder.addCase(getGiftsCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getGiftsCategories.fulfilled, (state, action) => {
      console.log(action.payload, 'action.payload');
      state.giftCategory = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteGiftCategory.fulfilled, (state, action) => {
      state.giftCategory.giftCategoryList = state.giftCategory.giftCategoryList.filter((item) => item.id !== action.payload);
    });

    builder.addCase(editGiftCategory.fulfilled, (state, action) => {
      try {
        state.giftCategory.giftCategoryList = state.giftCategory.giftCategoryList.filter((item) => item.id !== action.payload.id);
      } catch (error) {
        console.log(error);
      }
    });
  },
});

export const getLoading = (state) => state.giftsCotegories.loading;

export default giftsSlice.reducer;
