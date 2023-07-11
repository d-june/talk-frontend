import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Time from "../Time";
import { Avatar, MessageAudio } from "../index";

import { removeMessage } from "../../redux/slices/messages/asyncActions";

import { MessageType } from "../../redux/slices/messages/types";

import { Modal } from "antd";
import IconReaded from "../IconReaded";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import classNames from "classnames";
import styles from "./Message.module.scss";
import { useAppDispatch } from "../../hooks/hooks";

type MessagePropsType = {
  _id?: string;
  isTyping?: boolean;
  isReaded?: boolean;
  attachments?: Array<{
    url?: string;
    filename?: string;
  }>;
  audio?: string;
};

const Message: FC<MessageType & MessagePropsType> = ({
  _id,
  text,
  user,
  createdAt,
  isReaded,
  attachments,
  audio,
  isTyping,
}) => {
  const [previewImage, setPreviewImage] = useState("");
  const { data } = useSelector((state: RootState) => state.me);
  let isMe = false;
  if (data) {
    isMe = user._id === data._id;
  }

  const dispatch = useAppDispatch();

  const onRemoveMessage = () => {
    if (window.confirm("Вы действительно хотите удалить сообщение?")) {
      if (_id != null) {
        dispatch(removeMessage(_id));
      }
    }
  };
  const renderAttachment = (item: any) => {
    if (item.ext !== "webm") {
      return (
        <div
          key={item._id}
          className={styles.messageAttachmentsItem}
          onClick={() => item.url && setPreviewImage(item.url)}
        >
          <div className={styles.messageAttachmentsItemOverlay}>
            <EyeOutlined />
          </div>
          <img src={item.url} alt={item.filename} />
        </div>
      );
    } else {
      return <MessageAudio key={item._id} audioSrc={item.url} />;
    }
  };

  return (
    <div
      className={classNames(
        styles.message,
        isMe ? styles.messageMe : "",
        isTyping ? styles.messageIsTyping : "",
        attachments?.length === 1 && text?.length === 1
          ? styles.messageImage
          : ""
      )}
    >
      <div className={styles.messageAvatar}>
        <Avatar user={user} />
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageBody}>
          {attachments && (
            <div className={styles.messageAttachments}>
              {attachments.map((item) => renderAttachment(item))}
            </div>
          )}
          {((text?.length && text?.length > 1) || isTyping) && (
            <div className={styles.messageBubble}>
              {text && <p className={styles.messageText}>{text}</p>}
              {isTyping && (
                <div className={styles.messageTyping}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              {audio && <MessageAudio audioSrc={audio} />}
            </div>
          )}
        </div>

        {createdAt && (
          <span className={styles.messageDate}>
            <Time date={createdAt} />
          </span>
        )}
      </div>
      <div className={styles.messageIcons}>
        {isMe && (
          <button onClick={onRemoveMessage}>
            <DeleteOutlined className={styles.messageIconsDelete} />
          </button>
        )}
        <IconReaded isMe={isMe} isReaded={isReaded} />
      </div>
      <Modal
        open={!!previewImage}
        onCancel={() => setPreviewImage("")}
        footer={null}
        className={styles.messagePhotoModal}
      >
        <img src={previewImage} alt="Preview" />
      </Modal>
    </div>
  );
};

export default Message;
