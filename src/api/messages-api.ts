import { instance } from "./api";
import { MessagesType } from "../redux/slices/messages/types";
export type sendMessageDataType = {
  text: string | null;
  dialogId: string | null;
  attachments: any;
};

export const messagesApi = {
  getMessageByDialogId(dialogId: string) {
    return instance
      .get<MessagesType>(`/messages?dialog=${dialogId}`)
      .then((res) => res.data);
  },
  send({ text, dialogId, attachments }: sendMessageDataType) {
    return instance
      .post("/messages", {
        text: text,
        dialog_id: dialogId,
        attachments: attachments,
      })
      .then((res) => res.data);
  },
  removeById(id: string) {
    return instance.delete("/messages?id=" + id).then((res) => res.data);
  },
};
