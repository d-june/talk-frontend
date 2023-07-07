import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import socket from "../../socket/socket";

import { Empty, Message, SpinIcon } from "../index";
import { getMessageById } from "../../redux/slices/messages/asyncActions";
import {
  selectLoading,
  selectMessagesData,
} from "../../redux/slices/messages/selectors";

import styles from "./Messages.module.scss";
import classNames from "classnames";

import { addMessage } from "../../redux/slices/messages/slice";
import { useAppDispatch } from "../../hooks/hooks";

const Messages = () => {
  const dispatch = useAppDispatch();
  const currentDialogId = useSelector(
    (state: RootState) => state.dialogs.currentDialogId
  );
  const messages = useSelector(selectMessagesData);
  const isLoading = useSelector(selectLoading);

  const [isTyping, setIsTyping] = useState(false);
  let typingTimeoutId: any = null;

  const messagesRef = useRef<HTMLDivElement>(null);

  const onNewMessage = (data: any) => {
    dispatch(addMessage({ currentDialogId, data }));
  };

  const toggleIsTyping = () => {
    setIsTyping(true);
    clearInterval(typingTimeoutId);
    typingTimeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  useEffect(() => {
    socket.on("DIALOGS:TYPING", toggleIsTyping);
    return () => {
      socket.removeListener("DIALOGS:TYPING", toggleIsTyping);
    };
  }, []);

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
        <SpinIcon tip="Загружаю сообщения..." />
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
      <div>
        {isTyping && (
          <Message
            _id={"0"}
            user={{ fullName: "Amo", _id: "51561" }}
            isTyping={isTyping}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
