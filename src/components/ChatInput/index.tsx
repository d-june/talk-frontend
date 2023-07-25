import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../socket/socket";

import EmojiPicker from "emoji-picker-react";

import { useAppDispatch } from "../../hooks/hooks";
import { setAttachments } from "../../redux/slices/attachments/slice";
import { RootState } from "../../redux/store";
import { sendMessage } from "../../redux/slices/messages/asyncActions";

import { filesApi } from "../../api/files-api";

import { ChatUpload, UploadFiles } from "../index";

import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  AudioOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import styles from "./ChatInput.module.scss";

const ChatInput: FC = () => {
  (navigator as any).getUserMedia =
    (navigator as any).getUserMedia ||
    (navigator as any).mozGetUserMedia ||
    (navigator as any).msGetUserMedia ||
    (navigator as any).webkitGetUserMedia;

  const [value, setValue] = useState("");
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
  const dispatch = useAppDispatch();
  const { currentDialogId } = useSelector((state: RootState) => state.dialogs);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const { attachments } = useSelector((state: RootState) => state.attachments);
  const { data } = useSelector((state: RootState) => state.me);
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const handleOutsideClick = (el: any, e: any) => {
    if (el && !el.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    const el = document.querySelector(".ant-btn-link");

    document.addEventListener("click", handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener("click", handleOutsideClick.bind(this, el));
    };
  }, []);

  const onRecord = () => {
    if ((navigator as any).getUserMedia) {
      (navigator as any).mediaDevices
        .getUserMedia({ audio: true })
        .then((stream: any) => {
          onRecording(stream);
          console.log("work");
        })
        .catch((err: any) => {
          onError(err);
          alert(err);
        });
    }
  };

  const onRecording = (stream: any) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    alert("record");
    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = (e) => {
      const file = new File([e.data], "audio.webm");
      setLoading(true);
      filesApi.upload(file).then(({ data }) => {
        sendAudio(data.file._id).then(() => {
          setLoading(false);
        });
      });
    };
  };

  const onError = (err: any) => {
    console.log("The following error occured: " + err);
  };

  const sendAudio = (audioId: any) => {
    setIsRecording(false);
    return dispatch(
      sendMessage({
        text: null,
        dialogId: currentDialogId,
        attachments: [audioId],
      })
    );
  };

  const onSendMessage = () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else if (value || attachments.length) {
      dispatch(
        sendMessage({
          text: value,
          dialogId: currentDialogId,
          attachments: attachments.map((file: any) => file.uid),
        })
      );

      setValue("");
      dispatch(setAttachments([]));
    }
  };

  const handleSendMessage = (e: any) => {
    socket.emit("DIALOGS:TYPING", { dialogId: currentDialogId, data });
    if (e.keyCode === 13) {
      onSendMessage();
    }
  };

  const onHideRecording = () => {
    setIsRecording(false);
  };
  const addEmoji = (emojiData: any) => {
    setValue(value + " " + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  if (!currentDialogId) {
    return null;
  }

  return (
    <div className={styles.chatInput}>
      <div className={styles.chatInputMessage}>
        {emojiPickerVisible && (
          <div className={styles.chatInputEmojiPicker}>
            <EmojiPicker onEmojiClick={addEmoji} />
          </div>
        )}
        <Button type="link">
          <SmileOutlined onClick={toggleEmojiPicker} />
        </Button>

        {isRecording ? (
          <div className={styles.chatRecord}>
            <span className={styles.chatRecordBubble}></span>
            <p>Идет запись...</p>
            <CloseCircleOutlined onClick={onHideRecording} />
          </div>
        ) : (
          <TextArea
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={handleSendMessage}
            value={value}
            size="large"
            placeholder="Текст сообщения..."
            autoSize={{ minRows: 1, maxRows: 6 }}
          ></TextArea>
        )}

        <div className={styles.chatInputActions}>
          <ChatUpload />
          {isLoading ? (
            <Button>
              <LoadingOutlined />
            </Button>
          ) : value || isRecording || attachments.length ? (
            <Button type="link" onClick={onSendMessage}>
              <SendOutlined />
            </Button>
          ) : (
            <Button type="link" onClick={onRecord}>
              <AudioOutlined />
            </Button>
          )}
        </div>
      </div>
      {attachments.length > 0 && (
        <div className={styles.chatInputUpload}>
          <UploadFiles attachments={attachments} />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
