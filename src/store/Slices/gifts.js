import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from 'src/services/Api';

const initialState = {
  gifts: [],
};

export const createGift = createAsyncThunk('game/addGift', async (data) => {
  console.log(data, 'data');

  const formData = await new FormData();
  await formData.append('file', data.image);
  await formData.append('upload_preset', 'docs_upload_example_us_preset');
  const imageUrl = await axios.post('https://api.cloudinary.com/v1_1/demo/image/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(imageUrl, 'imageUrl');

  const response = await API.post('/gift', {
    ...data,
    path: imageUrl.data.url,
  });

  return response.data;
});

export const getGifts = createAsyncThunk(
  'game/getGifts',
  async () => {
    const response = await API.get('/gift/');

    return response.data;
  },
);

export const giftsSlice = createSlice({
  name: 'questionGame',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGifts.fulfilled, (state, action) => {
      state.gifts = action.payload;
    });
    builder.addCase(createGift.fulfilled, (state, action) => {
      toast.success('The Gift is created');
    });
  },

});

export default giftsSlice.reducer;
