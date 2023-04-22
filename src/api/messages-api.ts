import { instance } from "./api";
import { MessagesType } from "../redux/slices/messages/types";

export const messagesApi = {
  getMessageByDialogId(dialogId: string) {
    return instance
      .get<MessagesType>(`/messages?dialog=${dialogId}`)
      .then((res) => res.data);
  },
};
