import { Dispatch, SetStateAction } from "react";
import { UserInfoType } from "../users/types";

export type DialogType = {
  _id: string;
  createdAt: string;
  partner: UserInfoType | null;
  author: UserInfoType;
  lastMessage: {
    text: string;
    createdAt: string;
    read: boolean;
    user: {
      _id: string;
    };
  };
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};
