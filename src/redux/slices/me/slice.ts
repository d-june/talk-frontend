import { createSlice } from "@reduxjs/toolkit";
import { getMe, login, register, verifyHash } from "./asyncActions";
import { UserInfoType } from "../users/types";

interface MeSliceType {
  _id: null | string;
  data: null | UserInfoType;
  token: string;
  isAuth: boolean;
  status: "" | "error" | "success";
  registrationSuccess?: boolean;
  accountVerified?: string;
  isLoading: boolean;
  isLoadingMeData: boolean;
}

const initialState: MeSliceType = {
  _id: null,
  data: null,
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token,
  status: "",
  registrationSuccess: false,
  accountVerified: "",
  isLoading: false,
  isLoadingMeData: false,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
      state.isLoading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      window.localStorage.token = action.payload.token;
      state.token = window.localStorage.token;
      if (action.payload.status === "error") {
        state.status = "error";
      }
      state.isLoading = false;
    });
    builder.addCase(getMe.pending, (state, action) => {
      state.isLoadingMeData = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoadingMeData = false;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isAuth = false;
      delete window.localStorage.token;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registrationSuccess = true;
    });
    builder.addCase(verifyHash.fulfilled, (state, action) => {
      state.accountVerified = action.payload.status;
    });
  },
});

export const { logout } = meSlice.actions;

export default meSlice.reducer;
