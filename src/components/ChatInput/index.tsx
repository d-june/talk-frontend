import { Button, Input } from "antd";
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

// @ts-ignore
import { UploadField } from "@navjobs/upload";

// @ts-ignore
import styles from "./ChatInput.module.scss";
import { useState } from "react";

const ChatInput = () => {
  const [value, setValue] = useState("");
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  return (
    <div className={styles.chatInput}>
      {emojiPickerVisible && (
        <div className={styles.chatInputEmojiPicker}>
          <Picker theme="light" set="apple" onEmojiSelect={console.log} />
        </div>
      )}

      <Button type="link">
        <SmileOutlined onClick={toggleEmojiPicker} />
      </Button>
      <Input
        onChange={(e) => setValue(e.target.value)}
        size="large"
        placeholder="Введите текст сообщения"
      />
      <div className={styles.chatInputActions}>
        <UploadField
          onFiles={(files: any) => console.log(files)}
          containerProps={{
            className: styles.chatInputActionsUploadBtn,
          }}
          uploadProps={{
            accept: ".jpg, .jpeg, .png, .gif, .bmp",
            multiple: "multiple",
          }}
        >
          <Button type="link">
            <CameraOutlined />
            <UploadField></UploadField>
          </Button>
        </UploadField>

        {value ? (
          <Button type="link">
            <SendOutlined />
          </Button>
        ) : (
          <Button type="link">
            <AudioOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
