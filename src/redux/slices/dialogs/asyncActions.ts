import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateDialogType, dialogsAPI } from "../../../api/dialogs-api";
import { DialogType } from "./types";

type createDialogProps = {
  selectedUserId: string;
  messageText: string;
};

export const getDialogs = createAsyncThunk<DialogType[], string>(
  "dialogs/getDialogs",
  async (token: string) => {
    const data = await dialogsAPI.getAllDialogs(token);
    return data;
  }
);

export const createDialog = createAsyncThunk(
  "dialogs/createDialog",
  async ({ selectedUserId, messageText }: createDialogProps) => {
    const data = await dialogsAPI.createDialog(selectedUserId, messageText);
    console.log(data);
    return data;
  }
);

export const findDialogId = createAsyncThunk<DialogType[], string>(
  "dialogs/findDialogId",
  async (userId: string) => {
    const data = await dialogsAPI.findDialogId(userId);
    return data;
  }
);
