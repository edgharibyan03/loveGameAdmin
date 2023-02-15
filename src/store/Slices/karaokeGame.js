import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const addKaraokeGame = createAsyncThunk('game/addKaraokeGame', async (data) => {
  // const {cb, ...sendData} = data;
  // const response: any = await API.post('/news-comment/', sendData)
  // cb(response.data)
  return data;
});
const initialState = [
  { name: "Ann", language: "ru", link: "https://www.youtube.com/watch?v=GLvohMXgcBo&list=RDMMDqw00lUfPsk&index=27" },
  { name: "Mary", language: "en", link: "https://www.youtube.com/watch?v=GLvohMXgcBo&list=RDMMDqw00lUfPsk&index=27" },
];
export const questionGameSlice = createSlice({
  name: 'questionGame',
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(addKaraokeGame.pending, (state, action) => {
    //   // state.loading = action.payload;
    //   state.status = 'loading';
    // });
    builder.addCase(addKaraokeGame.fulfilled, (state, action) => {
      state.questionGame = action.payload;
    });
  },

});

export default questionGameSlice.reducer;