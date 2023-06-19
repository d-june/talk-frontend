// @ts-ignore
import { UploadField } from "@navjobs/upload";
import { Button } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import {
  removeAttachment,
  setAttachments,
} from "../../../redux/slices/attachments/slice";
import { filesApi } from "../../../api/files-api";
import { useAppDispatch } from "../../../hooks/hooks";

const ChatUpload = () => {
  const dispatch = useAppDispatch();
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

  return (
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
  );
};

export default ChatUpload;
