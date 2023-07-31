import { instance } from "./api";
import { DialogType } from "../redux/slices/dialogs/types";

export type CreateDialogType = {
  data: {
    dialogObj: DialogType;
  };
  status: number;
};

export const dialogsAPI = {
  getAllDialogs(token: string) {
    return instance
      .get<DialogType[]>("/dialogs/" + token)
      .then((res) => res.data);
  },
  findDialogId(userId: string) {
    return instance
      .get<DialogType[]>("/dialogs/find/" + userId)
      .then((res) => res.data);
  },
  createDialog(partnerId: string, text: string) {
    return instance.post<CreateDialogType>("/dialogs", {
      partner: partnerId,
      text: text,
    });
  },
};
