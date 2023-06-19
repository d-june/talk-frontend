export type DialogType = {
  _id: string;
  text: string;
  isReaded: boolean;
  createdAt: string;
  unreaded: number;
  partner: {
    _id: string;
    fullName: string;
    avatar: string | null;
    isOnline: boolean;
  };
  author: {
    _id: string;
    fullName: string;
    avatar: string | null;
  };
  dialog: string;
  lastMessage: {
    text: string;
    createdAt: string;
  };
};
