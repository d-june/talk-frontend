import { instance } from "./api";
import { dialogType } from "../redux/slices/dialogs/types";

export const dialogsAPI = {
  getAllDialogs(token: string) {
    return instance
      .get<dialogType[]>("/dialogs/" + token)
      .then((res) => res.data);
  },
  createDialog(partnerId: string, text: string) {
    return instance.post("/dialogs", { partner: partnerId, text: text });
  },
};
