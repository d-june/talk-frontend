import { createSlice } from "@reduxjs/toolkit";
import { DialogType } from "./types";
import { createDialog, findDialogId, getDialogs } from "./asyncActions";

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
    updateReaded(state, action) {
      state.items = state.items.map((dialog) => {
        if (dialog._id === action.payload.dialogId) {
          dialog.lastMessage.read = true;
        }

        return dialog;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDialogs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDialogs.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(findDialogId.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(findDialogId.fulfilled, (state, action) => {
      state.currentDialogId = action.payload[0]?._id;
      state.isLoading = false;
    });
    builder.addCase(createDialog.fulfilled, (state, action) => {});
  },
});
export const { setCurrentDialogId, updateReaded } = dialogsSlice.actions;
export default dialogsSlice.reducer;
