import { createSlice } from "@reduxjs/toolkit";
import { getMessageById, removeMessage } from "./asyncActions";
import { MessagesType } from "./types";

const initialState = {
  messages: [] as MessagesType,
  isLoading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      if (action.payload.currentDialogId === action.payload.data.dialog._id) {
        state.messages = [...state.messages, action.payload.data];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessageById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMessageById.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
    });
    builder.addCase(removeMessage.fulfilled, (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload._id
      );
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
