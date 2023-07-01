import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsApi } from "../../../api/posts-api";

export const getPosts = createAsyncThunk("getPosts", async (userId: string) => {
  const data = await postsApi.getPosts(userId);
  return data;
});

export const sendPost = createAsyncThunk("sendPost", async (text: string) => {
  const data = await postsApi.sendPost(text);
  return data;
});

export const setLikesCount = createAsyncThunk(
  "setLikesCount",
  async ({
    postId,
    likesCount,
    liked,
  }: {
    postId: string;
    likesCount: number;
    liked: boolean;
  }) => {
    const data = await postsApi.setLikesCount(postId, likesCount, liked);
    return data;
  }
);
export const deletePost = createAsyncThunk("deletePost", async (id: string) => {
  const data = await postsApi.removeById(id);
  return data;
});
