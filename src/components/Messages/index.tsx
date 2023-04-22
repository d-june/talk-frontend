import { Message } from "../index";
import { Alert, Empty, Spin } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { getMessageById } from "../../redux/slices/messages/asyncActions";
import {
  selectLoading,
  selectMessagesData,
} from "../../redux/slices/messages/selectors";
import { divide } from "lodash";

const Messages = () => {
  const dispatch = useAppDispatch();
  const currentDialogId = useSelector(
    (state: RootState) => state.dialogs.currentDialogId
  );
  const messages = useSelector(selectMessagesData);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    currentDialogId && dispatch(getMessageById(currentDialogId));
  }, [currentDialogId]);

  return (
    <>
      {isLoading && !messages ? (
        <Spin tip="Загрузка..."></Spin>
      ) : messages ? (
        <div>
          {messages.map((item) => (
            <div>
              <Message {...item} />
            </div>
          ))}
        </div>
      ) : (
        <Empty description="Откройте диалог" />
      )}
    </>
  );
};

export default Messages;
