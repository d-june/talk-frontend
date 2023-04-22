import { createSlice } from "@reduxjs/toolkit";
import { getMessageById } from "./asyncActions";
import { MessagesType } from "./types";

const initialState = {
  messages: null as MessagesType | null,
  isLoading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessageById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMessageById.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
    });
  },
});

export default messagesSlice.reducer;
