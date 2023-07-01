import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import styles from "../Posts.module.scss";
import { useAppDispatch } from "../../../hooks/hooks";

import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { sendPost } from "../../../redux/slices/posts/asyncActions";
const PostsForm = () => {
  const dispatch = useAppDispatch();
  const [newPostText, setNewPostText] = useState("");
  const onSubmit = () => {
    if (!newPostText) {
      return;
    }
    dispatch(sendPost(newPostText));
    setNewPostText("");
  };

  const handleSendMessage = (e: any) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <>
      <Row justify="space-between" align="middle" className={styles.postsForm}>
        <Col span={23}>
          <TextArea
            size="small"
            onKeyUp={handleSendMessage}
            value={newPostText}
            onChange={(e) => setNewPostText(e.currentTarget.value)}
          ></TextArea>
        </Col>
        <Col>
          <Button
            onClick={onSubmit}
            size="small"
            className={styles.sendPostButton}
          >
            <SendOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PostsForm;
