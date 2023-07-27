import { AttachmentsType } from "../attachments/types";

export type MessagesType = Array<MessageType>;

export type MessageType = {
  _id?: string;
  text?: string;
  createdAt?: string;
  user: {
    _id: string;
    fullName?: string;
    avatar?: string | null;
  };

  dialog?: string;
  attachments?: Array<AttachmentsType>;
  read?: boolean;
};
