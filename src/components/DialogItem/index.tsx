import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

import socket from "../../socket/socket";
import classNames from "classnames";
import { isToday, format } from "date-fns";

import { Avatar, IconReaded } from "../index";

import { getPartner } from "../../utils/helpers/getPartner";
import { setCurrentDialogId } from "../../redux/slices/dialogs/slice";

import { selectDialogsData } from "../../redux/slices/dialogs/selectors";

import styles from "./DialogItem.module.scss";
import { DialogType } from "../../redux/slices/dialogs/types";
import { useAppDispatch } from "../../hooks/hooks";
import SkeletonButton from "antd/es/skeleton/Button";

type PropsType = {
  isLoading: boolean;
};
const DialogItem: FC<DialogType & PropsType> = ({
  _id,
  unreaded,
  partner,
  author,
  lastMessage,
  setSidebarOpen,
  isLoading,
}) => {
  const dispatch = useAppDispatch();

  const { data } = useSelector((state: RootState) => state.me);
  const isMe = lastMessage.user._id === data?._id;
  const { currentDialogId } = useSelector(selectDialogsData);
  const { items } = useSelector(selectDialogsData);

  const getMessageTime = (createdAt: string) => {
    const createdAtDate = new Date(createdAt);
    if (isToday(createdAtDate)) {
      return format(createdAtDate, "HH:mm");
    } else {
      return format(createdAtDate, "dd.MM.yyyy");
    }
  };

  console.log(lastMessage);

  const onChangeCurrentDialogId = () => {
    socket.emit("DIALOGS:JOIN", _id);
    dispatch(setCurrentDialogId(_id));
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const renderLastMessage = (message: any, userId: string | undefined) => {
    let text = "";
    if (!message.text && message.attachments.length) {
      text = "прикрепленный файл";
    } else {
      text = message.text;
    }

    return `${message.user._id === userId ? "Вы: " : ""}${text}`;
  };

  partner = getPartner(items, data, author, partner);

  return (
    <>
      <Link to={`/dialogs/${_id}`}>
        <div
          className={classNames(
            styles.dialogItem,
            partner?.isOnline ? styles.dialogItemOnline : "",
            currentDialogId === _id ? styles.dialogItemSelected : ""
          )}
          onClick={onChangeCurrentDialogId}
        >
          <div className={styles.dialogItemAvatar}>
            {partner && (
              <Avatar
                _id={partner._id}
                fullName={partner.fullName}
                avatar={partner.avatar}
              />
            )}
          </div>

          <div className={styles.dialogItemInfo}>
            <div className={styles.dialogItemInfoTop}>
              <b>{partner?.fullName}</b>
              <span>{getMessageTime(lastMessage.createdAt)}</span>
            </div>
            <div className={styles.dialogItemInfoBottom}>
              <p>{renderLastMessage(lastMessage, data?._id)}</p>
              <div className={styles.messageIconReaded}>
                {isMe && <IconReaded isMe={isMe} isReaded={lastMessage.read} />}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DialogItem;
