import { createSlice } from "@reduxjs/toolkit";
import { dialogType } from "./types";
import { getDialogs } from "./asyncActions";

const initialState = {
  items: [] as Array<dialogType>,
  currentDialog: null,
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDialogs.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default dialogsSlice.reducer;
