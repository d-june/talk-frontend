import React, { useState, useEffect } from "react";

import { AttachmentsType } from "../../redux/slices/attachments/types";
import { useAppDispatch } from "../../hooks/hooks";
import { removeAttachment } from "../../redux/slices/attachments/slice";

import { Upload, Modal } from "antd";

import styles from "./UploadFiles.module.scss";

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

type UploadAttachmentsType = {
  attachments: Array<AttachmentsType>;
};

type fileListType = {
  fileList: Array<AttachmentsType>;
};

const UploadFiles = ({ attachments }: UploadAttachmentsType) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: attachments,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setState({
      ...state,
      fileList: attachments,
    });
  }, [attachments]);

  const handleCancel = () => setState({ ...state, previewVisible: false });

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  const handleChange = ({ fileList }: fileListType) => {
    setState({
      ...state,
      fileList,
    });
  };

  const onRemove = (file: AttachmentsType) => {
    dispatch(removeAttachment(file));
  };

  return (
    <div className="clearfix">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={state.fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={(file: AttachmentsType) => onRemove(file)}
      ></Upload>

      <Modal
        open={state.previewVisible}
        footer={null}
        onCancel={handleCancel}
        centered
        className={styles.imagePreview}
      >
        <img alt="example" src={state.previewImage} />
      </Modal>
    </div>
  );
};

export default UploadFiles;
