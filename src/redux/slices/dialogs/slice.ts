import { createSlice } from "@reduxjs/toolkit";
import { dialogType } from "./types";
import { getDialogs } from "./asyncActions";

const initialState = {
  items: [] as Array<dialogType>,
  currentDialogId: null as string | null,
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
  },
});
export const { setCurrentDialogId } = dialogsSlice.actions;
export default dialogsSlice.reducer;
