import { orderBy } from "lodash";
// @ts-ignore
import styles from "./Dialogs.module.scss";
import { DialogItem } from "../index";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type DialogsProps = {
  items: Array<{
    _id: string;
    text: string;
    isReaded: boolean;
    createdAt: string;
    unreaded: number;
    partner: {
      _id: string;
      fullName: string;
      avatar?: string | null;
      isOnline?: boolean;
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
  }>;
};

const Dialogs: FC<DialogsProps> = ({ items }) => {
  const { data } = useSelector((state: RootState) => state.me);
  return (
    <div className={styles.dialogs}>
      {orderBy(items, ["createdAt"], ["desc"]).map((item) => (
        <DialogItem
          key={item._id}
          {...item}
          isMe={data && item.author._id === data._id}
        />
      ))}
    </div>
  );
};

export default Dialogs;
