import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/hooks";
import { removeMessage } from "../../../redux/slices/messages/asyncActions";
import { MessageType } from "../../../redux/slices/messages/types";
import { AttachmentsType } from "../../../redux/slices/attachments/types";

import Time from "../../Time";

import { Avatar, MessageAudio } from "../../index";
import IconReaded from "../../IconReaded";

import { Modal } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "./Message.module.scss";
import classNames from "classnames";

type MessagePropsType = {
  isTyping?: boolean;
  isReaded?: boolean;
};

const Message: FC<MessageType & MessagePropsType> = ({
  _id,
  text,
  user,
  createdAt,
  isReaded,
  attachments,
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
  const renderAttachment = (item: AttachmentsType) => {
    console.log(item);
    if (item.ext !== "webm" && item.ext !== "mp4") {
      return (
        <div
          key={item._id}
          className={
            attachments?.length === 1
              ? styles.messageAttachmentsItem +
                " " +
                styles.messageAttachmentsOne
              : styles.messageAttachmentsItem
          }
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
      {isMe ? (
        <div className={styles.messageAvatar}>
          <Avatar
            _id={user._id}
            fullName={user.fullName}
            avatar={user.avatar}
          />
        </div>
      ) : (
        <Link to={`/profile/${user._id}`} className={styles.messageAvatar}>
          <Avatar
            _id={user._id}
            fullName={user.fullName}
            avatar={user.avatar}
          />
        </Link>
      )}

      <div className={styles.messageContent}>
        <div className={styles.messageBody}>
          {attachments && (
            <div className={styles.messageAttachments}>
              {attachments.map((item: AttachmentsType) =>
                renderAttachment(item)
              )}
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
