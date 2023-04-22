import { Button, Input } from "antd";
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";

// @ts-ignore
import styles from "./ChatInput.module.scss";
import { useState } from "react";

const ChatInput = () => {
  const [value, setValue] = useState("");

  return (
    <div className={styles.chatInput}>
      <Button type="link">
        <SmileOutlined />
      </Button>
      <Input
        onChange={(e) => setValue(e.target.value)}
        size="large"
        placeholder="Введите текст сообщения"
      />
      <div className={styles.chatInputActions}>
        <Button type="link">
          <CameraOutlined />
        </Button>
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
