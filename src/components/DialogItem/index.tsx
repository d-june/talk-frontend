// @ts-ignore
import styles from "./DialogItem.module.scss";
import Time from "../Time";
import { Avatar, IconReaded } from "../index";
import classNames from "classnames";
import { FC } from "react";
import { isToday, format } from "date-fns";

type DialogItemProps = {
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
  isMe: boolean;
};
const DialogItem: FC<DialogItemProps> = ({
  user,
  unreaded,
  createdAt,
  text,
  isMe,
}) => {
  const getMessageTime = (createdAt: string) => {
    const createdAtDate = new Date(createdAt);
    if (isToday(createdAtDate)) {
      return format(createdAtDate, "HH:mm");
    } else {
      return format(createdAtDate, "DD.MM.YYYY");
    }
  };

  return (
    <div
      className={classNames(
        styles.dialogItem,
        user.isOnline ? styles.dialogItemOnline : ""
      )}
    >
      <div className={styles.dialogItemAvatar}>
        <Avatar user={user} />
      </div>

      <div className={styles.dialogItemInfo}>
        <div className={styles.dialogItemInfoTop}>
          <b>{user.fullName}</b>
          <span>{getMessageTime(createdAt)}</span>
        </div>
        <div className={styles.dialogItemInfoBottom}>
          <p>{text}</p>
          <div className={styles.messageIconReaded}>
            {isMe && <IconReaded isMe={true} isReaded={false} />}
          </div>

          {unreaded > 0 && (
            <div className={styles.dialogItemCount}>
              {unreaded > 9 ? "+9" : unreaded}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
