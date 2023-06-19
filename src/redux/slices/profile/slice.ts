import { createSlice } from "@reduxjs/toolkit";
import {
  getProfile,
  getUserStatus,
  updateProfile,
  updateUserStatus,
} from "./asyncActions";

const initialState = {
  profile: {
    userId: "" as string,
    fullName: "" as string,
    birthday: 0 as Date | number,
    city: "" as string,
    about: "" as string,
    hobbies: "" as string,
    status: "",
  },
  isLoading: false,
  isLoadingStatus: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserStatus.pending, (state, action) => {
      state.isLoadingStatus = true;
    });
    builder.addCase(getUserStatus.fulfilled, (state, action) => {
      state.profile.status = action.payload;
      state.isLoadingStatus = false;
    });
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {
      state.profile.status = action.payload.status;
    });
    builder.addCase(getProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile.fullName = action.payload.fullName;
      state.profile.birthday = action.payload.birthday;
      state.profile.city = action.payload.city;
      state.profile.about = action.payload.about;
      state.profile.hobbies = action.payload.hobbies;
    });
  },
});

export default profileSlice.reducer;
