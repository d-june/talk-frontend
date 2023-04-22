import { FC } from "react";
// @ts-ignore
import styles from "./Message.module.scss";
import classNames from "classnames";
import Time from "../Time";
import IconReaded from "../IconReaded";
import { Avatar, MessageAudio } from "../index";
import { MessageType } from "../../redux/slices/messages/types";

type MessagePropsType = {
  isMe?: boolean;
  isTyping?: boolean;
  isReaded?: boolean;
  attachments?: Array<{
    url?: string;
    filename?: string;
  }>;
  audio?: string;
};

const Message: FC<MessageType & MessagePropsType> = ({
  text,
  user,
  createdAt,
  isMe,
  isTyping,
  isReaded,
  attachments,
  audio,
}) => {
  return (
    <div
      className={classNames(
        styles.message,
        isMe ? styles.messageMe : "",
        isTyping ? styles.messageIsTyping : "",
        attachments?.length === 1 ? styles.messageImage : "",
        audio ? styles.messageAudio : ""
      )}
    >
      <div className={styles.messageAvatar}>
        <Avatar user={user} />
      </div>
      <div className={styles.messageContent}>
        {(audio || text || isTyping) && (
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

        {attachments && (
          <div className={styles.messageAttachments}>
            {attachments.map((item) => (
              <div className={styles.messageAttachmentsItem}>
                <img src={item.url} alt={item.filename} />
              </div>
            ))}
          </div>
        )}

        {createdAt && (
          <span className={styles.messageDate}>
            <Time date={createdAt} />
          </span>
        )}
      </div>
      <div className={styles.messageIconReaded}>
        <IconReaded isMe={isMe} isReaded={isReaded} />
      </div>
    </div>
  );
};

export default Message;
