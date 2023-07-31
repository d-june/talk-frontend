import { createSlice } from "@reduxjs/toolkit";
import {
  getProfile,
  getUserStatus,
  updateAvatar,
  updateProfile,
  updateUserStatus,
} from "./asyncActions";

const initialState = {
  profile: {
    userId: "",
    fullName: "",
    birthday: 0 as Date | number,
    avatar: "",
    city: "",
    about: "",
    hobbies: "",
    status: "",
  },
  isLoadingStatus: false,
  isLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserStatus.pending, (state) => {
      state.isLoadingStatus = true;
    });
    builder.addCase(getUserStatus.fulfilled, (state, action) => {
      state.profile.status = action.payload;
      state.isLoadingStatus = false;
    });
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {
      state.profile.status = action.payload.status;
    });
    builder.addCase(getProfile.pending, (state) => {
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

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.profile.avatar = action.payload.avatar;
    });
  },
});

export default profileSlice.reducer;
