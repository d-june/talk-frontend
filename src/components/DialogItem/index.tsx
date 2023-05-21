// @ts-ignore
import styles from "./DialogItem.module.scss";
import Time from "../Time";
import { Avatar, IconReaded } from "../index";
import classNames from "classnames";
import { FC } from "react";
import { isToday, format } from "date-fns";
import { setCurrentDialogId } from "../../redux/slices/dialogs/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectDialogsData } from "../../redux/slices/dialogs/selectors";
import { Link, useParams } from "react-router-dom";

type DialogItemProps = {
  _id: string;
  text: string;
  isReaded: boolean;
  createdAt: string;
  unreaded: number;
  author: {
    _id: string;
    fullName: string;
    avatar: string | null;
  };
  partner: {
    _id: string;
    fullName: string;
    avatar?: string | null;
    isOnline?: boolean;
  };
  dialog: string;
  lastMessage: {
    text: string;
    createdAt: string;
  };
};
const DialogItem: FC<DialogItemProps> = ({
  _id,
  partner,
  unreaded,
  author,
  text,
  dialog,
  lastMessage,
}) => {
  const dispatch = useAppDispatch();
  const { currentDialogId } = useSelector(selectDialogsData);
  let params = useParams();
  const { data } = useSelector((state: RootState) => state.me);
  const isMe = data && author._id === data._id;

  const getMessageTime = (createdAt: string) => {
    const createdAtDate = new Date(createdAt);
    if (isToday(createdAtDate)) {
      return format(createdAtDate, "HH:mm");
    } else {
      return format(createdAtDate, "dd.MM.yyyy");
    }
  };

  const onChangeCurrentDialogId = () => {
    dispatch(setCurrentDialogId(_id));
  };

  return (
    <Link to={`${_id}`}>
      <div
        className={classNames(
          styles.dialogItem,
          partner.isOnline ? styles.dialogItemOnline : "",
          currentDialogId === params.id ? styles.dialogItemSelected : ""
        )}
        onClick={onChangeCurrentDialogId}
      >
        <div className={styles.dialogItemAvatar}>
          <Avatar user={partner} />
        </div>

        <div className={styles.dialogItemInfo}>
          <div className={styles.dialogItemInfoTop}>
            <b>{partner.fullName}</b>
            <span>{getMessageTime(lastMessage.createdAt)}</span>
          </div>
          <div className={styles.dialogItemInfoBottom}>
            <p>{isMe ? `Вы: ${lastMessage?.text}` : lastMessage?.text}</p>
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
    </Link>
  );
};

export default DialogItem;
