import { FC } from "react";
// @ts-ignore
import styles from "./Message.module.scss";
import classNames from "classnames";
import Time from "../Time";
import IconReaded from "../IconReaded";
import { MessageAudio } from "../index";

type MessageType = {
  avatar?: string | null;
  text?: string;
  date?: Date;
  isMe?: boolean;
  isReaded?: boolean;
  isTyping?: boolean;
  attachments?: Array<{ filename: string; url: string }>;
  audio?: string;
};

const Message: FC<MessageType> = ({
  avatar,
  text,
  date,
  isMe,
  isReaded,
  isTyping,
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
        {avatar && <img src={avatar} alt="аватар" />}
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

        {date && (
          <span className={styles.messageDate}>
            <Time date={date} />
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
