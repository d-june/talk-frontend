import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Link } from "react-router-dom";

import socket from "../../../../socket/socket";
import classNames from "classnames";

import { useAppDispatch } from "../../../../hooks/hooks";
import { setCurrentDialogId } from "../../../../redux/slices/dialogs/slice";
import { DialogType } from "../../../../redux/slices/dialogs/types";
import { MessageType } from "../../../../redux/slices/messages/types";
import { selectDialogsData } from "../../../../redux/slices/dialogs/selectors";

import { Avatar, IconReaded } from "../../../index";

import { getPartner } from "../../../../utils/helpers/getPartner";
import { getTime } from "../../../../utils/helpers/getTime";

import styles from "./DialogItem.module.scss";

type PropsType = {
  isLoading: boolean;
  setFilteredItems: (value: DialogType[]) => void;
};
const DialogItem: FC<DialogType & PropsType> = ({
  _id,
  partner,
  author,
  lastMessage,
  setSidebarOpen,
}) => {
  const dispatch = useAppDispatch();

  const { data } = useSelector((state: RootState) => state.me);
  const isMe = lastMessage.user._id === data?._id;
  const { currentDialogId } = useSelector(selectDialogsData);
  const { items } = useSelector(selectDialogsData);

  partner = getPartner(items, data, author, partner);

  const onChangeCurrentDialogId = () => {
    socket.emit("DIALOGS:JOIN", _id);
    dispatch(setCurrentDialogId(_id));
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const renderLastMessage = (
    message: MessageType,
    userId: string | undefined
  ) => {
    let text = "";
    if (!message.text && message.attachments?.length) {
      text = "прикрепленный файл";
    } else if (message.text) {
      text = message.text;
    }

    return `${message.user._id === userId ? "Вы: " : ""}${text}`;
  };

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
              <span>{getTime(lastMessage.createdAt)}</span>
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
