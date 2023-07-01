import { UserInfoType } from "../users/types";

export type postType = {
  _id: string;
  text: string;
  user: UserInfoType;
  likes: number;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
};
