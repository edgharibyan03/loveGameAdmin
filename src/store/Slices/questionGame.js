import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../services/Api';

export const addQuestionGame = createAsyncThunk('game/addQuestionGame', async (data) => {
  const { cb, ...sendData } = data;

  const imagesUrls = await Promise.all(Array.from(data.images).map(async (item) => {
    const formData = await new FormData();
    await formData.append('file', item);
    await formData.append('upload_preset', 'love-game-images-upload');
    const data = await axios.post('https://api.cloudinary.com/v1_1/doo4q6xrk/image/upload', formData, {
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
  const response = await API.get(`/questions/all${search}`);

  return response.data;
});

export const deleteQuestion = createAsyncThunk(
  'game/deleteQuestion',
  async (id) => {
    const response = await API.delete(`/questions/${id}`);

    return id;
  },
);

export const editQuestion = createAsyncThunk(
  'game/editQuestion',
  async (data) => {
    let imagesUrls;
    let dataToSend;
    if (data.files.length !== 0) {
      imagesUrls = await Promise.all(Array.from(data.files).map(async (item) => {
        const formData = await new FormData();
        await formData.append('file', item);
        await formData.append('upload_preset', 'love-game-images-upload');
        const data = await axios.post('https://api.cloudinary.com/v1_1/doo4q6xrk/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data.data;
      }));
    }

    if (imagesUrls) {
      dataToSend = data.question.map((item) => ({
        ...item,
        images: imagesUrls.map((item) => item.url),
      }));
    }

    const response = await API.put(`/questions/${data.id}`, {
      ...data,
      question: dataToSend || data.question,
    });

    return response.data;
  },
)

const initialState = {
  questionGames: {
    questionList: [],
    count: 0,
  },
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
      state.questionGames = action.payload;
      state.questionsLoading = false;
    });
    builder.addCase(addQuestionGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addQuestionGame.fulfilled, (state, action) => {
      state.questionGames.questionList.push(action.payload);
      state.loading = false;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.questionGames.questionList = state.questionGames.questionList.filter((item) => item.id !== action.payload);
    });

    builder.addCase(editQuestion.fulfilled, (state, action) => {
      state.questionGames.questionList = [
        ...state.questionGames.questionList.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    })
  },

});

export const addQuestionGameStatus = (state) => state.questionGame.loading;
export const questionsLoadingStatus = (state) => state.questionGame.questionsLoading;

export default questionGameSlice.reducer;
