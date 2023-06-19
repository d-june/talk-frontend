import { instance } from "./api";
import { DialogType } from "../redux/slices/dialogs/types";

export const dialogsAPI = {
  getAllDialogs(token: string) {
    return instance
      .get<DialogType[]>("/dialogs/" + token)
      .then((res) => res.data);
  },
  createDialog(partnerId: string, text: string) {
    return instance.post("/dialogs", { partner: partnerId, text: text });
  },
};
