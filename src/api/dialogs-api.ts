import { instance } from "./api";
import { dialogType } from "../redux/slices/dialogs/types";

export const dialogsAPI = {
  getAllDialogs() {
    return instance.get<dialogType[]>("/dialogs").then((res) => res.data);
  },
};
