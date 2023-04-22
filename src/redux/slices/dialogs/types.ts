export type dialogType = {
  _id: string;
  text: string;
  isReaded: boolean;
  createdAt: string;
  unreaded: number;
  user: {
    _id: string;
    fullName: string;
    avatar: string | null;
    isOnline: boolean;
  };
  dialog: string;
};
