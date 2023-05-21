import { createSlice } from "@reduxjs/toolkit";
import { findUsers } from "./asyncActions";

interface usersSliceType {
  _id: string;
  fullName: string;
}

const initialState = {
  users: [] as Array<usersSliceType>,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
