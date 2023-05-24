import { Button, Input, Upload, UploadFile, UploadProps } from "antd";
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { Data } from "emoji-mart";

// @ts-ignore
import { UploadField } from "@navjobs/upload";

// @ts-ignore
import styles from "./ChatInput.module.scss";
import { FC, HTMLInputTypeAttribute, useEffect, useState } from "react";
import { sendMessage } from "../../redux/slices/messages/asyncActions";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

import TextArea from "antd/es/input/TextArea";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { RcFile } from "antd/es/upload";
import { filesApi } from "../../api/files-api";
import { UploadFiles } from "../index";
import {
  removeAttachment,
  setAttachments,
} from "../../redux/slices/attachments/slice";
import socket from "../../socket/socket";

const ChatInput = () => {
  (window.navigator as any).getUserMedia =
    (window.navigator as any).getUserMedia ||
    (window.navigator as any).mozGetUserMedia ||
    (window.navigator as any).msGetUserMedia ||
    (window.navigator as any).webkitGetUserMedia;

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

  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleOutsideClick = (el: any, e: any) => {
    if (el && !el.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  const onRemove = (file: any) => {
    dispatch(removeAttachment(file));
  };

  const onSelectFiles = async (files: any) => {
    let uploaded: any = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: "uploading",
        },
      ];
      dispatch(setAttachments(uploaded));
      // eslint-disable-next-line no-loop-func
      await filesApi.upload(file).then(({ data }) => {
        uploaded = uploaded.map((item: any) => {
          if (item.uid === uid) {
            return {
              status: "done",
              uid: data.file._id,
              name: data.file.filename,
              url: data.file.url,
            };
          }
          return item;
        });
      });
    }
    dispatch(setAttachments(uploaded));
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
      (navigator as any).getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = (stream: any) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

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
  const addEmoji = (emoji: any) => {
    // const sym = e.unified.split("_");
    // const codeArray: any = [];
    // // sym.forEach((el: any) => codeArray.push("0x" + el));
    // let emoji = "";
    // // setValue((value + " " + id).trim());
    // console.log(
    //   reactStringReplace(e.id, /:(.+?):/g, (match, i) => (emoji = match))
    // );
    //
    // reactStringReplace(e.id, /:(.+?):/g, (match, i) => (emoji = match));
    console.log(emoji);
    setValue(value + emoji.native);
  };

  if (!currentDialogId) {
    return null;
  }

  return (
    <div className={styles.chatInput}>
      <div className={styles.chatInputMessage}>
        {emojiPickerVisible && (
          <div className={styles.chatInputEmojiPicker}>
            <Picker
              set="apple"
              sheetSize={64}
              theme="dark"
              showPreview={false}
              showSkinTones={false}
              data={data}
              onEmojiSelect={addEmoji}
            />
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
            placeholder="Введите текст сообщения"
            autoSize={{ minRows: 1, maxRows: 6 }}
          ></TextArea>
        )}

        <div className={styles.chatInputActions}>
          <UploadField
            onFiles={onSelectFiles}
            containerProps={{
              className: "chat-input__actions-upload-btn",
            }}
            uploadProps={{
              accept: ".jpg,.jpeg,.png,.gif,.bmp",
              multiple: "multiple",
            }}
            onRemove={(file: any) => onRemove(file)}
          >
            <Button type="link">
              <CameraOutlined />
              <UploadField></UploadField>
            </Button>
          </UploadField>
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
