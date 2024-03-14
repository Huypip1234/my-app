import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const counterReducer = createSlice({
  name: 'rootReducer',
  initialState: 0,
  // Phải viết theo kieu mutation (đã tích hợp sẵn immer bên trong)
  //name/reducers -> vd: rootReducer/INCREMENT
  //tu dong tao file action -> ko phai cau hinh file action nua
  reducers: {
    increment: (state, action) => {
      state = state + action.payload;
      return state;
    },
    decrement: (state, action) => {
      state = state - action.payload;
      return state;
    },
  },
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
});

const postReducer = createSlice({
  name: 'posts',
  initialState: '...',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return action.payload[0].title;
    });
  },
});

export { counterReducer, postReducer };
