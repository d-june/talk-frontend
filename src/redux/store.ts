import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import dialogsSlice from "./slices/dialogs/slice";

const store = configureStore({
  reducer: {
    dialogs: dialogsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
