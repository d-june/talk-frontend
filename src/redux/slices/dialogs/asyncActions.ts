import { dialogType } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { dialogsAPI } from "../../../api/dialogs-api";

type createDialogProps = {
  selectedUserId: string;
  messageText: string;
};

export const getDialogs = createAsyncThunk(
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
    return data;
  }
);
