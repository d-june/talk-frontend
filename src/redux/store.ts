import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import dialogsSlice from "./slices/dialogs/slice";
import messagesSlice from "./slices/messages/slice";
import meSlice from "./slices/me/slice";
import usersSlice from "./slices/users/slice";
import attachmentsSlice from "./slices/attachments/slice";
import profileSlice from "./slices/profile/slice";
import postsSlice from "./slices/posts/slice";

const store = configureStore({
  reducer: {
    dialogs: dialogsSlice,
    messages: messagesSlice,
    me: meSlice,
    users: usersSlice,
    attachments: attachmentsSlice,
    profile: profileSlice,
    posts: postsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
