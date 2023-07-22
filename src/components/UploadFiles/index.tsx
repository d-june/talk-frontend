import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";

import { useAppDispatch } from "../../hooks/hooks";
import {
  removeAttachment,
  setAttachments,
} from "../../redux/slices/attachments/slice";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UploadFiles = ({ attachments }: any) => {
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
  const handleChange = ({ fileList }: any) => {
    setState({
      ...state,
      fileList,
    });
  };

  const onRemove = (file: any) => {
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
        onRemove={(file) => onRemove(file)}
      ></Upload>

      <Modal
        visible={state.previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={state.previewImage} />
      </Modal>
    </div>
  );
};

export default UploadFiles;
