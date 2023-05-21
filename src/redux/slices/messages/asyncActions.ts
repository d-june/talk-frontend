import { MessagesType } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesApi, sendMessageDataType } from "../../../api/messages-api";

export const getMessageById = createAsyncThunk<MessagesType, string>(
  "messages/getMessages",
  async (dialogId) => {
    const data = await messagesApi.getMessageByDialogId(dialogId);
    return data;
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ text, dialogId, attachments }: sendMessageDataType) => {
    const data = await messagesApi.send({ text, dialogId, attachments });
    return data;
  }
);

export const removeMessage = createAsyncThunk(
  "messages/removeMessage",
  async (id: string) => {
    const data = await messagesApi.removeById(id);
    data._id = id;
    return data;
  }
);
