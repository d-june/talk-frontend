import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../../../api/users-api";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const data = await usersAPI.getAllUsers();
  return data;
});
export const findUsers = createAsyncThunk(
  "users/findUsers",
  async (name: string) => {
    const data = await usersAPI.findUsers(name);
    return data;
  }
);
