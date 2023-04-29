import { dialogType } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { dialogsAPI } from "../../../api/dialogs-api";

export const getDialogs = createAsyncThunk(
  "dialogs/getDialogs",
  async (token: string) => {
    const data = await dialogsAPI.getAllDialogs(token);
    return data;
  }
);
