export type UserInfoType = {
  _id: string;
  email: string;
  fullName: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  about: string;
  city: string;
  hobbies: string;
  birthday: string;
  avatar?: string;
  isOnline?: boolean;
  id?: string;
};

type UsersResponseType = {
  docs: Array<UserInfoType>;
  total: number;
  limit: number;
  page: number;
  pages: number;
};
