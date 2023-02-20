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

  const dataToSend = sendData.question.map((item) => ({
    ...item,
    images: imagesUrls.map((item) => item.url),
  }));

  const response = await API.post('/questions/', {
    ...sendData,
    question: dataToSend,
  });

  return response.data;
});

export const getQuestionGame = createAsyncThunk('game/getQuestionGame', async (search) => {
  let response;

  if (search) {
    response = await API.get(`/questions/${search}`);
  } else {
    response = await API.get('/questions/');
  }

  console.log(response.data, 'resssss');

  return response.data;
});

export const deleteQuestion = createAsyncThunk(
  'game/deleteQuestion',
  async (id) => {
    const response = await API.delete(`/questions/${id}`);

    console.log(response, 'response');

    return id;
  },
);

const initialState = {
  questionGames: [],
  questionsLoading: true,
};

export const questionGameSlice = createSlice({
  name: 'questionGame',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getQuestionGame.pending, (state, action) => {
      state.questionsLoading = true;
    });
    builder.addCase(getQuestionGame.fulfilled, (state, action) => {
      console.log(action.payload, 'action.payload');
      state.questionGames = action.payload;
      state.questionsLoading = false;
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
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      successNotify();

      state.questionGames = state.questionGames.filter((item) => item.id !== action.payload);
    });
  },

});

export const addQuestionGameStatus = (state) => state.questionGame.loading;
export const questionsLoadingStatus = (state) => state.questionGame.questionsLoading;

export default questionGameSlice.reducer;
