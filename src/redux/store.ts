import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import dialogsSlice from "./slices/dialogs/slice";
import messagesSlice from "./slices/messages/slice";
import meSlice from "./slices/me/slice";

const store = configureStore({
  reducer: {
    dialogs: dialogsSlice,
    messages: messagesSlice,
    me: meSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
