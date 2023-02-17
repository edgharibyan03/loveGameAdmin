import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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

export const uploadQuestionImages = createAsyncThunk('game/uploadQuestionImages', (data) => {
  console.log(data, 'data');
});

export const addQuestionGame = createAsyncThunk('game/addQuestionGame', async (data) => {
  const { cb, ...sendData } = data;

  const imagesUrls = await Promise.all(Array.from(data.images).map(async (item) => {
    const formData = await new FormData();
    await formData.append('file', item);
    await formData.append('upload_preset', 'docs_upload_example_us_preset');
    const data = await axios.post('https://api.cloudinary.com/v1_1/demo/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  }));

  console.log(imagesUrls, 'urls');

  console.log(sendData, 'sendDatasendDatasendDatasendData');

  const dataToSend = sendData.question.map((item) => ({
    ...item,
    images: imagesUrls.map((item) => item.url),
  }));
  console.log(dataToSend, 'dataToSend');

  const response = await API.post('/questions/', {
    ...sendData,
    question: dataToSend,
  });
  console.log(response, 'response');
  // cb(response.data);
  return response.data;
});
export const getQuestionGame = createAsyncThunk('game/getQuestionGame', async (search) => {
  let response;
  if (search) {
    response = await API.get(`/questions/${search}`);
  } else {
    response = await API.get('/questions/');
  }
  console.log(response, 'response');
  return response.data;
});
const initialState = {
  questionGames: [],
};
export const questionGameSlice = createSlice({
  name: 'questionGame',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getQuestionGame.fulfilled, (state, action) => {
      console.log(action.payload, 'action.payload');
      state.questionGames = action.payload;
      console.log(state, 'state');
    });
    builder.addCase(addQuestionGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addQuestionGame.rejected, () => {
      errorNotify();
    });
    builder.addCase(addQuestionGame.fulfilled, (state, action) => {
      state.questionGames.push(action.payload);
      state.loading = false;
      successNotify();
    });
  },

});

export const addQuestionGameStatus = (state) => state.questionGame.loading;

export default questionGameSlice.reducer;
