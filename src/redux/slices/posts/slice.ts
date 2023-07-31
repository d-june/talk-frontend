import { createSlice } from "@reduxjs/toolkit";
import { postType } from "./types";
import { deletePost, getPosts, sendPost } from "./asyncActions";

const initialState = {
  posts: [] as Array<postType>,
  isLoading: false,
};

const postsReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(sendPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
      state.isLoading = false;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.meta.arg);
      state.isLoading = false;
    });
  },
});

export const {} = postsReducer.actions;

export default postsReducer.reducer;
