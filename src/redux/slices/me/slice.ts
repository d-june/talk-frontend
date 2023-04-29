import { createSlice } from "@reduxjs/toolkit";
import { getMe, login, register, verifyHash } from "./asyncActions";
import { MeData } from "./types";

interface MeSliceType {
  data: null | MeData;
  token: string;
  isAuth: boolean;
  status: "" | "error" | "success";
  registrationSuccess?: boolean;
  accountVerified?: string;
}

const initialState: MeSliceType = {
  data: null,
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token,
  status: "",
  registrationSuccess: false,
  accountVerified: "",
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      window.localStorage.token = action.payload.token;
      state.token = window.localStorage.token;
      if (action.payload.status === "error") {
        state.status = "error";
      }
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registrationSuccess = true;
    });
    builder.addCase(verifyHash.fulfilled, (state, action) => {
      state.accountVerified = action.payload.status;
    });
  },
});

export default meSlice.reducer;
