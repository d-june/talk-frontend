import { createSlice } from "@reduxjs/toolkit";
import { findUsers, getAllUsers } from "./asyncActions";

interface usersSliceType {
  _id: string;
  email: string;
  fullName: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  about: string;
  city: string;
  hobbies: string;
  birthday: string;
}

const initialState = {
  users: [] as Array<usersSliceType>,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(findUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
