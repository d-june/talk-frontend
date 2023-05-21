import { Empty, Message } from "../index";
import { Modal, Spin } from "antd";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import socket from "../../socket/socket";
import { getMessageById } from "../../redux/slices/messages/asyncActions";
import {
  selectLoading,
  selectMessagesData,
} from "../../redux/slices/messages/selectors";
// @ts-ignore
import styles from "./Messages.module.scss";
import classNames from "classnames";

// @ts-ignore
import emptyIcon from "../../assets/img/empty.svg";
import { addMessage } from "../../redux/slices/messages/slice";
const Messages = () => {
  const dispatch = useAppDispatch();
  const currentDialogId = useSelector(
    (state: RootState) => state.dialogs.currentDialogId
  );
  const messages = useSelector(selectMessagesData);
  const isLoading = useSelector(selectLoading);

  const messagesRef = useRef<HTMLDivElement>(null);

  const onNewMessage = (data: any) => {
    dispatch(addMessage({ currentDialogId, data }));
  };

  useEffect(() => {
    currentDialogId && dispatch(getMessageById(currentDialogId));
    socket.on("SERVER:NEW_MESSAGE", onNewMessage);
    return () => {
      socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
    };
  }, [currentDialogId]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, 9999);
    }
  }, [messages]);

  return (
    <div
      className={classNames(
        styles.messages,
        isLoading ? styles.messagesLoading : "",
        !messages || messages.length === 0 ? styles.messagesEmpty : ""
      )}
      ref={messagesRef}
    >
      {isLoading ? (
        <Spin size="large" tip="Загрузка..."></Spin>
      ) : !isLoading && messages ? (
        messages.length > 0 ? (
          <div className={styles.messagesContainer}>
            {messages.map((item) => (
              <Message {...item} />
            ))}
          </div>
        ) : (
          <Empty description="Откройте диалог" />
        )
      ) : (
        <Empty description="Диалога пока нет" />
      )}
    </div>
  );
};

export default Messages;
