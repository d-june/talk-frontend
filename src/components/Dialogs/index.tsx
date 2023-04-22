import { orderBy } from "lodash";
// @ts-ignore
import styles from "./Dialogs.module.scss";
import { DialogItem } from "../index";
import { FC, useState } from "react";

type DialogsProps = {
  userId: string;
  items: Array<{
    _id: string;
    text: string;
    isReaded: boolean;
    createdAt: string;
    unreaded: number;
    user: {
      _id: string;
      fullName: string;
      avatar?: string | null;
      isOnline?: boolean;
    };
  }>;
};

const Dialogs: FC<DialogsProps> = ({ items, userId }) => {
  return (
    <div className={styles.dialogs}>
      {orderBy(items, ["createdAt"], ["desc"]).map((item) => (
        <DialogItem key={item._id} {...item} isMe={item.user._id === userId} />
      ))}
    </div>
  );
};

export default Dialogs;
