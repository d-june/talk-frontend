import { RootState } from "../../store";

export const selectMessagesData = (state: RootState) => state.messages.messages;
export const selectLoading = (state: RootState) => state.messages.isLoading;
