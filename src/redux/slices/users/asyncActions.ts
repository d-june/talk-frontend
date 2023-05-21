import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../../../api/users-api";

export const findUsers = createAsyncThunk(
  "users/findUsers",
  async (name: string) => {
    const data = await usersAPI.findUsers(name);
    return data;
  }
);
