import { Empty, Message } from "../index";
import { Spin } from "antd";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
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
const Messages = () => {
  const dispatch = useAppDispatch();
  const currentDialogId = useSelector(
    (state: RootState) => state.dialogs.currentDialogId
  );
  const messages = useSelector(selectMessagesData);
  const isLoading = useSelector(selectLoading);

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentDialogId && dispatch(getMessageById(currentDialogId));
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
          <div>
            {messages.map((item) => (
              <div>
                <Message {...item} />
              </div>
            ))}
          </div>
        ) : (
          <Empty description="Диалога пока нет" />
        )
      ) : (
        <Empty description="Откройте диалог" />
      )}
    </div>
  );
};

export default Messages;
