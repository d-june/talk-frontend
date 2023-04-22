import { MessagesType } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesApi } from "../../../api/messages-api";

export const getMessageById = createAsyncThunk<MessagesType, string>(
  "messages/getMessages",
  async (dialogId) => {
    const data = await messagesApi.getMessageByDialogId(dialogId);
    return data;
  }
);
