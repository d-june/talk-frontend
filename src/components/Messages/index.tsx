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
import { UserInfoType } from "../../redux/slices/users/types";
import avatar from "../Avatar";

const Messages = () => {
  const dispatch = useAppDispatch();
  const { currentDialogId, items } = useSelector(
    (state: RootState) => state.dialogs
  );
  const { _id } = useSelector((state: RootState) => state.me);
  const currentDialog = items.filter((item) => item._id === currentDialogId)[0];

  const messages = useSelector(selectMessagesData);
  const isLoading = useSelector(selectLoading);

  const [isTyping, setIsTyping] = useState(false);
  let typingTimeoutId: any = null;

  const messagesRef = useRef<HTMLDivElement>(null);

  let partner = {} as {
    fullName: string;
    _id: string;
    avatar: string | undefined | null;
  };
  const isPartner = () => {
    if (currentDialog) {
      if (_id === currentDialog.partner._id) {
        partner = currentDialog.author;
      } else {
        partner = currentDialog.partner;
      }
    }

    return partner;
  };

  isPartner();

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
              <Message {...item} key={item._id} />
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
            _id=""
            user={{
              fullName: partner.fullName,
              _id: partner._id,
              avatar: partner.avatar,
            }}
            key={partner._id}
            isTyping={isTyping}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
