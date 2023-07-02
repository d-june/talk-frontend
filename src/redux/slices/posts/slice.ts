import { createSlice } from "@reduxjs/toolkit";
import { postType } from "./types";
import { deletePost, getPosts, sendPost } from "./asyncActions";

const initialState = {
  posts: [] as Array<postType>,
};

const postsReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(sendPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    });
  },
});

export const {} = postsReducer.actions;

export default postsReducer.reducer;
