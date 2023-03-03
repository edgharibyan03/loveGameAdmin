import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'src/services/Api';

const initialState = {
  gifts: {
    giftList: [],
    count: 0,
  },
  loading: true,
};

export const createGift = createAsyncThunk('game/addGift', async (data) => {
  const formData = await new FormData();
  await formData.append('file', data.image);
  await formData.append('upload_preset', 'love-game-images-upload');
  const imageUrl = await axios.post('https://api.cloudinary.com/v1_1/doo4q6xrk/image/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const response = await API.post('/gift/add', {
    ...data,
    path: imageUrl.data.url,
  });

  return response.data;
});

export const getGifts = createAsyncThunk(
  'game/getGifts',
  async (search) => {
    const response = await API.get(`/gift/all${search}`);

    return response.data;
  },
);

export const deleteGift = createAsyncThunk(
  'game/deleteGift',
  async (id) => {
    const response = await API.delete(`/gift/${id}`);

    return id;
  },
);

export const editGift = createAsyncThunk(
  'game/editGift',
  async (data) => {
    let { image } = data;
    if (typeof data.image === 'object') {
      const formData = await new FormData();
      await formData.append('file', data.image);
      await formData.append('upload_preset', 'love-game-images-upload');
      image = await axios.post('https://api.cloudinary.com/v1_1/doo4q6xrk/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      image = image.data.url;
    }

    const response = await API.put(`/gift/${data.id}`, {
      ...data,
      path: image,
    });

    return response.data;
  },
);

export const giftsSlice = createSlice({
  name: 'questionGame',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGifts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getGifts.fulfilled, (state, action) => {
      state.gifts = action.payload;
      state.loading = false;
    });

    builder.addCase(deleteGift.fulfilled, (state, action) => {
      state.gifts.giftList = state.gifts.giftList.filter((item) => item.id !== action.payload);
    });

    builder.addCase(editGift.fulfilled, (state, action) => {
      state.gifts = [
        ...state.gifts.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    });
  },
});

export const getLoading = (state) => state.gifts.loading;

export default giftsSlice.reducer;
