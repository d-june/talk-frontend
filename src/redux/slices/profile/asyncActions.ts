import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileApi } from "../../../api/profile-api";
import { UpdateProfileType } from "./types";
import avatar from "../../../components/Avatar";

export const getUserStatus = createAsyncThunk(
  "getUserStatus",
  async (userId: string) => {
    const data = await profileApi.getStatus(userId);
    return data;
  }
);

export const updateUserStatus = createAsyncThunk(
  "updateUserStatus",
  async (status: string) => {
    const data = await profileApi.setStatus(status);
    return data;
  }
);

export const getProfile = createAsyncThunk(
  "getProfile",
  async (userId: string) => {
    const data = await profileApi.getProfile(userId);
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ fullName, birthday, city, about, hobbies }: UpdateProfileType) => {
    const data = await profileApi.updateProfile(
      fullName,
      birthday,
      city,
      about,
      hobbies
    );
    return data;
  }
);

export const updateAvatar = createAsyncThunk(
  "profile/updateAvatar",
  async (avatar: File) => {
    const data = await profileApi.updateAvatar(avatar);
    return data;
  }
);
