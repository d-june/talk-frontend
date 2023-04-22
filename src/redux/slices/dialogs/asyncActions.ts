import { dialogType } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { dialogsAPI } from "../../../api/dialogs-api";

export const getDialogs = createAsyncThunk<dialogType[]>(
  "dialogs/getDialogs",
  async () => {
    const data = await dialogsAPI.getAllDialogs();
    return data;
  }
);
