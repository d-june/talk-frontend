import { createAsyncThunk } from "@reduxjs/toolkit";
import { meApi } from "../../../api/me-api";
import { LoginType, RegistrationData } from "./types";

export const login = createAsyncThunk(
  "me/login",
  async (loginData: LoginType) => {
    const data = await meApi.login(loginData);
    return data;
  }
);

export const getMe = createAsyncThunk("me/getMe", async () => {
  const data = await meApi.getMe();
  return data;
});

export const register = createAsyncThunk(
  "me/register",
  async (registrationData: RegistrationData) => {
    const data = await meApi.registration(registrationData);
    return data;
  }
);

export const verifyHash = createAsyncThunk(
  "me/verifyHash",
  async (hash: string) => {
    const data = meApi.verifyHash(hash);
    return data;
  }
);
