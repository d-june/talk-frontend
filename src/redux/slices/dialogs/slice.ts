import { createSlice } from "@reduxjs/toolkit";
import { DialogType } from "./types";
import { findDialogId, getDialogs } from "./asyncActions";

const initialState = {
  items: [] as Array<DialogType>,
  currentDialogId: null as string | null,
  isLoading: false,
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setCurrentDialogId(state, action) {
      state.currentDialogId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDialogs.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(findDialogId.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(findDialogId.fulfilled, (state, action) => {
      state.currentDialogId = action.payload[0]?._id;
      state.isLoading = false;
    });
  },
});
export const { setCurrentDialogId } = dialogsSlice.actions;
export default dialogsSlice.reducer;
