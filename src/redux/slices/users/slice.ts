import { createSlice } from "@reduxjs/toolkit";
import { findUsers, getAllUsers } from "./asyncActions";
import { UserInfoType } from "./types";

const initialState = {
  users: [] as Array<UserInfoType>,
  isLoading: false,
  page: 1,
  total: 1,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload.docs;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.isLoading = false;
    });
    builder.addCase(findUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
